import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import { admin } from "better-auth/plugins";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "surafelhabte1@gmail.com",
    pass: "ocnuqcsrjaquukhz",
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      // Send verification email to user
      await transporter.sendMail({
        from: '"My App" <surafelhabte1@gmail.com>',
        to: user?.email,
        subject: "Verify your email",
        html: `<p>Please verify your email by clicking <a href="${url}">here</a></p>`,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600,
  },
  plugins: [admin()],
});
