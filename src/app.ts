import express from "express";
import cors from "cors";

// Import routes
import academicYearRoutes from "./routes/academic_year.route";
import assessmentRoutes from "./routes/assessment.route";
import attendanceRoutes from "./routes/attendance.route";
import behaviorRoutes from "./routes/behavior.route";
import branchRoutes from "./routes/branch.route";
import classSectionRoutes from "./routes/class_section.route";
import enrollmentRoutes from "./routes/enrollment.route";
import expenseRoutes from "./routes/expense.route";
import feeRoutes from "./routes/fee.route";
import financeSummaryRoutes from "./routes/finance_summary.route";
import leaveRequestRoutes from "./routes/leave_request.route";
import libraryBookRoutes from "./routes/library_book.route";
import libraryTransactionRoutes from "./routes/library_transaction.route";
import markRoutes from "./routes/mark.route";
import parentRoutes from "./routes/parent.route";
import parentStudentsRoutes from "./routes/parent_student.route";
import schoolRoutes from "./routes/school.route";
import staffRoutes from "./routes/staff.route";
import studentRoutes from "./routes/student.route";
import studentMarkSummaryRoutes from "./routes/student_mark_summary.route";
import teacherRoutes from "./routes/teacher.route";
import termRoutes from "./routes/term.route";
import jwt from "jsonwebtoken";

const app = express();

app.use(cors());
app.use(express.json());

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

app.use("/api/v1/academic-years", academicYearRoutes);
app.use("/api/v1/assessments", assessmentRoutes);
app.use("/api/v1/attendances", attendanceRoutes);
app.use("/api/v1/behaviors", behaviorRoutes);
app.use("/api/v1/branches", branchRoutes);
app.use("/api/v1/class-sections", classSectionRoutes);
app.use("/api/v1/enrollments", enrollmentRoutes);
app.use("/api/v1/expenses", expenseRoutes);
app.use("/api/v1/fees", feeRoutes);
app.use("/api/v1/finance-summaries", financeSummaryRoutes);
app.use("/api/v1/leave-requests", leaveRequestRoutes);
app.use("/api/v1/library-books", libraryBookRoutes);
app.use("/api/v1/library-transactions", libraryTransactionRoutes);
app.use("/api/v1/marks", markRoutes);
app.use("/api/v1/parents", parentRoutes);
app.use("/api/v1/parent-student", parentStudentsRoutes);
app.use("/api/v1/schools", schoolRoutes);
app.use("/api/v1/staff", staffRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/v1/student-mark-summaries", studentMarkSummaryRoutes);
app.use("/api/v1/teachers", teacherRoutes);
app.use("/api/v1/terms", termRoutes);

export default app;
