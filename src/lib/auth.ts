import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient, User } from "@prisma/client";
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
    resetPasswordTokenExpiresIn: 3600,
    sendResetPassword: async ({
      user,
      url,
      token,
    }: {
      user: { email: string };
      url: string;
      token: string;
    }) => {
      // Send reset password email with the URL
      await transporter.sendMail({
        from: '"My App" <surafelhabte1@gmail.com>',
        to: user?.email,
        subject: "Reset your password",
        html: `<p>Please reset your password by clicking <a href="${url}">here</a></p>`,
      });
    },
  },
  onPasswordChange: async ({ user }: { user: User }) => {
    console.log("%csrc/lib/auth.ts:45 user", "color: #007acc;", user);
    await transporter.sendMail({
      from: '"My App" <surafelhabte1@gmail.com>',
      to: user.email,
      subject: "Your password was changed",
      html: `<p>Hello ${
        user.name || ""
      }, your password was successfully changed. If this wasn’t you, please reset your password immediately.</p>`,
    });
  },
  changePassword: {
    requireCurrentPassword: true,
    autoSignIn: false,
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
  trustedOrigins: ["http://localhost:3000"],
});
