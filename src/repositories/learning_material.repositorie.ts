import { del, put, getDownloadUrl } from "@vercel/blob";
import { randomUUID } from "node:crypto";
import { extname } from "node:path";
import { BaseRepository } from "./base.repositorie.js";
import { LearningMaterialType, UploadedMaterialFile } from "../models/index.js";
import { LearningMaterialInput } from "../validators/zod.schema.js";

export class learningMaterialRepo extends BaseRepository<"learningmaterial"> {
  constructor() {
    super("learningmaterial");
  }

  private defaultContentType(materialType: LearningMaterialType) {
    return materialType === "document" ? "application/pdf" : "video/mp4";
  }

  private pathnameForFile(
    file: UploadedMaterialFile,
    materialType: LearningMaterialType,
    baseUrl: string,
    directoryName: string,
  ) {
    let extension: string;

    const originalExtension = extname(file.originalname)
      .replace(".", "")
      .toLowerCase();
    const normalizedMimeType = file.mimetype.toLowerCase();

    if (
      originalExtension === "pdf" ||
      normalizedMimeType.includes("pdf") ||
      materialType === "document"
    ) {
      extension = "pdf";
      return `${baseUrl}/${directoryName}/${randomUUID()}-${Date.now()}.${extension}`;
    }

    if (
      originalExtension === "mp4" ||
      normalizedMimeType.includes("mp4") ||
      materialType === "video"
    ) {
      extension = "mp4";
      return `${baseUrl}/${directoryName}/${randomUUID()}-${Date.now()}.${extension}`;
    }
  }

  private PutFileInBlob = async (
    pathname: string,
    uploadedFile: any,
    contentType: string,
  ) => {
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (!blobToken) {
      throw new Error("Missing BLOB_READ_WRITE_TOKEN. ");
    }

    if (!uploadedFile?.buffer?.length) {
      throw new Error("Uploaded files must include file content.");
    }

    return await put(pathname, uploadedFile.buffer, {
      access: "private",
      addRandomSuffix: false,
      contentType: contentType,
      token: blobToken,
    });
  };

  async findById(id: string, signal?: AbortSignal) {
    try {
      const item = await this.model.findUnique({
        where: { id },
        include: {
          teacher: {
            select : {
              id: true,
              first_name: true,
              middle_name: true,
            }
          },
        },
        signal,
      });

      if (!item) {
        return item;
      }

      if (item.material_source === "file" && item.material_url) {
        return {
          ...item,
          teacher: item.teacher,
          downloadUrl: getDownloadUrl(item.material_url),
        };
      }

      return item;
    } catch (error) {
      this.handleError(error);
    }
  }

  async create(data: LearningMaterialInput, res: any, signal?: AbortSignal) {
    try {
      const payload = { ...data };

      if (payload.material_source === "file") {
        const uploadedFile = payload.material_file;

        const pathname = await this.pathnameForFile(
          uploadedFile,
          payload.material_type,
          `${payload.school_id}/${payload.branch_id}`,
          "learning-materials",
        );

        if (pathname) {
          const blob: any = await this.PutFileInBlob(
            pathname,
            uploadedFile,
            uploadedFile.mimetype ||
              this.defaultContentType(payload.material_type),
          );

          payload.material_url = blob?.url;
          payload.material_size = uploadedFile.size ?? payload.material_size;
        }
      }
      delete payload.material_file;
      delete payload.school_id;

      return await this.model.create({ data: payload, signal });
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, data: LearningMaterialInput, signal?: AbortSignal) {
    try {
      const current = await this.findById(id, signal);

      if (!current) {
        throw new Error("Learning material not found.");
      }

      const payload = { ...data } as any;

      const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

      const currentWasFile = current.material_source === "file";
      const currentUrl = current.material_url;
      const currentMaterialSize =
        (current as any).material_size ?? (current as any).file_size;
      const hasReplacementFile = !!payload.material_file?.buffer?.length;

      let shouldDeleteCurrentBlob = false;

      if (payload.material_source === "file" && hasReplacementFile) {
        const uploadedFile = payload.material_file;

        const pathname = await this.pathnameForFile(
          uploadedFile,
          payload.material_type,
          `${payload.school_id}/${payload.branch_id}`,
          "learning-materials",
        );

        if (pathname) {
          const blob: any = await this.PutFileInBlob(
            pathname,
            uploadedFile,
            uploadedFile.mimetype ||
              this.defaultContentType(payload.material_type),
          );

          payload.material_url = blob?.url;
          payload.material_size = uploadedFile.size ?? payload.material_size;
        }

        shouldDeleteCurrentBlob = currentWasFile && !!currentUrl;
      } else if (payload.material_source === "link") {
        shouldDeleteCurrentBlob = currentWasFile && !!currentUrl;
      } else if (payload.material_source === "file" && !hasReplacementFile) {
        if (!payload.material_url && currentUrl) {
          payload.material_url = currentUrl;
        }

        if (
          (typeof payload.material_size === "undefined" ||
            payload.material_size === null ||
            Number.isNaN(Number(payload.material_size))) &&
          typeof currentMaterialSize !== "undefined"
        ) {
          payload.material_size = currentMaterialSize;
        }
      }

      delete payload.material_file;
      delete payload.school_id;

      const updated = await this.model.update({
        where: { id },
        data: payload,
        signal,
      });

      if (
        shouldDeleteCurrentBlob &&
        currentUrl &&
        currentUrl !== updated.material_url
      ) {
        try {
          if (!blobToken) {
            throw new Error("Missing BLOB_READ_WRITE_TOKEN.");
          }

          await del(currentUrl, { token: blobToken });
        } catch (cleanupError) {
          console.warn(
            "Learning material updated, but old blob cleanup failed:",
            cleanupError,
          );
        }
      }

      return updated;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(id: string, signal?: AbortSignal) {
    try {
      const current = await this.findById(id, signal);

      if (!current) {
        throw new Error("Learning material not found.");
      }

      const deleted = await this.model.delete({
        where: { id },
        signal,
      });

      if (current.material_source === "file" && current.material_url) {
        const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

        if (!blobToken) {
          console.warn(
            "Learning material deleted, but BLOB_READ_WRITE_TOKEN is missing so the file could not be removed.",
          );
          return deleted;
        }

        try {
          await del(current.material_url, { token: blobToken });
        } catch (cleanupError) {
          console.warn(
            "Learning material deleted, but blob cleanup failed:",
            cleanupError,
          );
        }
      }

      return deleted;
    } catch (error) {
      this.handleError(error);
    }
  }
}
