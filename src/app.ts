import express from "express";
import cors from "cors";

// Import routes
import academicYearRoutes from "./routes/academic_year.route.ts";
import assessmentRoutes from "./routes/assessment.route.ts";
import attendanceRoutes from "./routes/attendance.route.ts";
import behaviorRoutes from "./routes/behavior.route.ts";
import branchRoutes from "./routes/branch.route.ts";
import classSectionRoutes from "./routes/class_section.route.ts";
import enrollmentRoutes from "./routes/enrollment.route.ts";
import expenseRoutes from "./routes/expense.route.ts";
import feeRoutes from "./routes/fee.route.ts";
import financeSummaryRoutes from "./routes/finance_summary.route.ts";
import leaveRequestRoutes from "./routes/leave_request.route.ts";
import libraryBookRoutes from "./routes/library_book.route.ts";
import libraryTransactionRoutes from "./routes/library_transaction.route.ts";
import markRoutes from "./routes/mark.route.ts";
import parentRoutes from "./routes/parent.route.ts";
import parentStudentsRoutes from "./routes/parent_student.route.ts";
import schoolRoutes from "./routes/school.route.ts";
import staffRoutes from "./routes/staff.route.ts";
import studentRoutes from "./routes/student.route.ts";
import studentMarkSummaryRoutes from "./routes/student_mark_summary.route.ts";
import teacherRoutes from "./routes/teacher.route.ts";
import termRoutes from "./routes/term.route.ts";
import settingRoutes from "./routes/setting.route.ts";
import authRoutes from "./routes/auth.route.ts";

import jwt from "jsonwebtoken";

import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.ts";

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.all("/api/auth/{*any}", toNodeHandler(auth));

const JWT_SECRET = process.env.JWT_SECRET;

app.get("/", (req, res) => res.send("API running..."));

app.get("/get-token", (req, res) => {
  if (!JWT_SECRET) {
    return res.status(500).json({ message: "JWT secret is not configured" });
  }
  const token: string = jwt.sign({ user: "test" }, JWT_SECRET, {
    algorithm: "HS256",
  });
  return res.json({ token });
});

// Middleware to attach AbortController signal to request
app.use((req, res, next) => {
  const controller = new AbortController();
  (req as any).prismaSignal = controller.signal; // must be a real signal

  req.on("close", () => {
    controller.abort();
  });

  next();
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/academic-year", academicYearRoutes);
app.use("/api/v1/assessment", assessmentRoutes);
app.use("/api/v1/attendance", attendanceRoutes);authRoutes
app.use("/api/v1/behavior", behaviorRoutes);
app.use("/api/v1/branch", branchRoutes);
app.use("/api/v1/class-section", classSectionRoutes);
app.use("/api/v1/enrollment", enrollmentRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/fee", feeRoutes);
app.use("/api/v1/finance-summarie", financeSummaryRoutes);
app.use("/api/v1/leave-request", leaveRequestRoutes);
app.use("/api/v1/library-book", libraryBookRoutes);
app.use("/api/v1/library-transaction", libraryTransactionRoutes);
app.use("/api/v1/mark", markRoutes);
app.use("/api/v1/parent", parentRoutes);
app.use("/api/v1/parent-student", parentStudentsRoutes);
app.use("/api/v1/school", schoolRoutes);
app.use("/api/v1/staff", staffRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/student-mark-summarie", studentMarkSummaryRoutes);
app.use("/api/v1/teacher", teacherRoutes);
app.use("/api/v1/term", termRoutes);
app.use("/api/v1/setting", settingRoutes);

export default app;
