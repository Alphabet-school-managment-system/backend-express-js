import express from "express";
import cors from "cors";

// Import routes
import academicYearRoutes from "./routes/academic_year.route.js";
import assessmentRoutes from "./routes/assessment.route.js";
import attendanceRoutes from "./routes/attendance.route.js";
import behaviorRoutes from "./routes/behavior.route.js";
import branchRoutes from "./routes/branch.route.js";
import enrollmentRoutes from "./routes/enrollment.route.js";
import expenseRoutes from "./routes/expense.route.js";
import feeRoutes from "./routes/fee.route.js";
import financeSummaryRoutes from "./routes/finance_summary.route.js";
import leaveRequestRoutes from "./routes/leave_request.route.js";
import libraryItemRoutes from "./routes/library_item.route.js";
import libraryItemLoanRoutes from "./routes/library_item_loan.route.js";
import markRoutes from "./routes/mark.route.js";
import parentRoutes from "./routes/parent.route.js";
import parentStudentsRoutes from "./routes/parent_student.route.js";
import schoolRoutes from "./routes/school.route.js";
import staffRoutes from "./routes/staff.route.js";
import studentRoutes from "./routes/student.route.js";
import studentMarkSummaryRoutes from "./routes/student_mark_summary.route.js";
import teacherRoutes from "./routes/teacher.route.js";
import settingRoutes from "./routes/setting.route.js";
import authRoutes from "./routes/auth.route.js";
import dashboardRoutes from "./routes/dashboard.route.js";

import jwt from "jsonwebtoken";

import { toNodeHandler } from "better-auth/node";
import { auth_client } from "./lib/auth.js";

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://alphabet-sms.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());

app.all("/api/auth/{*any}", toNodeHandler(auth_client({}).auth));

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
  (req as any).prismaSignal = controller.signal;

  req.on("close", () => {
    controller.abort();
  });

  next();
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/academic-year", academicYearRoutes);
app.use("/api/v1/assessment", assessmentRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1/behavior", behaviorRoutes);
app.use("/api/v1/branch", branchRoutes);
app.use("/api/v1/enrollment", enrollmentRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/fee", feeRoutes);
app.use("/api/v1/finance-summarie", financeSummaryRoutes);
app.use("/api/v1/leave-request", leaveRequestRoutes);
app.use("/api/v1/library-item", libraryItemRoutes);
app.use("/api/v1/library-item-loan", libraryItemLoanRoutes);
app.use("/api/v1/mark", markRoutes);
app.use("/api/v1/parent", parentRoutes);
app.use("/api/v1/parent-student", parentStudentsRoutes);
app.use("/api/v1/school", schoolRoutes);
app.use("/api/v1/staff", staffRoutes);
app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/student-mark-summarie", studentMarkSummaryRoutes);
app.use("/api/v1/teacher", teacherRoutes);
app.use("/api/v1/setting", settingRoutes);

export default app;
