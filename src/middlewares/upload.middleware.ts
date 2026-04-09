import multer from "multer";
import { Request, Response, NextFunction } from "express";

const MAX_LEARNING_MATERIAL_FILE_SIZE_BYTES = 200 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_LEARNING_MATERIAL_FILE_SIZE_BYTES,
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = ["application/pdf", "video/mp4"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(new Error("Only PDF and MP4 files are allowed."));
  },
});

export function learningMaterialUpload(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  upload.single("material_file")(req, res, (error: any) => {
    if (!error) {
      next();
      return;
    }

    if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File size must be 200 MB or less.",
      });
    }

    return res.status(400).json({
      message: error?.message || "File upload failed.",
    });
  });
}
