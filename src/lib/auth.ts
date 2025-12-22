import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient, User } from "@prisma/client";
import nodemailer from "nodemailer";
import { admin, emailOTP } from "better-auth/plugins";

const prisma = new PrismaClient();
const app: {
  url: string;
  name: string;
  fromEmail: string;
} = {
  url: "http://localhost:3000",
  name: "Alphabet",
  fromEmail: "surafelhabte1@gmail.com",
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "surafelhabte1@gmail.com",
    pass: "ocnuqcsrjaquukhz",
  },
});

export const auth_client = ({
  password,
}: {
  password?: string | undefined;
}) => {
  const auth = betterAuth({
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
          from: `"${app?.name}" <${app?.fromEmail}>`,
          to: user?.email,
          subject: "Reset your password",
          html: `<p>Please reset your password by clicking <a href="${url}">here</a></p>`,
        });
      },
    },
    onPasswordChange: async ({ user }: { user: User }) => {
      await transporter.sendMail({
        from: `"${app?.name}" <${app?.fromEmail}>`,
        to: user.email,
        subject: "Your password was changed",
        html: `<p>Hello ${
          user.name || ""
        }, your password was successfully changed. If this wasn't you, please reset your password immediately.</p>`,
      });
    },
    changePassword: {
      requireCurrentPassword: true,
      autoSignIn: false,
    },
    emailVerification: {
      sendVerificationEmail: async ({ user, url, token }) => {
        await transporter.sendMail({
          from: `"${app?.name}" <${app?.fromEmail}>`,
          to: user?.email,
          subject: "Welcome to Alphabet School MGT System 🎉",
          html: `
          <h2>Welcome, ${user.name}!</h2>
          <p>Click <a href="${
            app?.url
          }/auth/verify-email/?token=${token}&email=${
            user.email
          }">here</a> to verify your email and start using your account.</p>
           ${
             password ? `<p>Your password is <b><u>${password}</u></b></p>` : ""
           } 
        `,
        });
      },
      sendOnSignUp: true,
      autoSignInAfterVerification: false,
      expiresIn: 3600,
      afterEmailVerification: async (user) => {
        await transporter.sendMail({
          from: `"${app?.name}" <${app?.fromEmail}>`,
          to: user?.email,
          subject: "Email Verified Successfully 🎉",
          html: `
            <h2>Congratulations, ${user.name}!</h2>
            <p>Your email has been successfully verified. You can now start using your account.</p>
            <p>Click <a href="${app?.url}/auth/login">here</a> to go to the app dashboard.</p>
          `,
        });
      },
    },
    plugins: [
      admin(),
      emailOTP({
        async sendVerificationOTP({ email, otp, type }) {
          if (type === "sign-in") {
            // Send the OTP for sign in
          } else if (type === "email-verification") {
            // Send the OTP for email verification
          } else {
            // Send the OTP for password reset
            await transporter.sendMail({
              from: `"${app?.name}" <${app?.fromEmail}>`,
              to: email,
              subject: "Password Reset OTP",
              html: `
                <p>You requested to reset your password.</p>
                <p>Your OTP code is:</p>
                <h3 style="letter-spacing: 2px;">${otp}</h3>
                 <p>
                  Click
                  <a href="${app?.url}/auth/reset-password?email=${email}">
                    here
                  </a>
                  to reset your password.
                </p>
                <p>This OTP will expire in 10 minutes and 5 attempts only.</p>
                <p>If you did not request this, please ignore this email.</p>
                <br/>
                <p>— ${app?.name} Team</p>
              `,
            });
          }
        },
        otpLength: 6,
        expiresIn: 600,
        allowedAttempts: 5,
      }),
    ],
    trustedOrigins: [app?.url],
  });

  return { auth };
};
