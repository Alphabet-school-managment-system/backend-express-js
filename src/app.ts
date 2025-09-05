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
import parentStudentsRoutes from "./routes/parent_students.route";
import schoolRoutes from "./routes/school.route";
import staffRoutes from "./routes/staff.route";
import studentRoutes from "./routes/student.route";
import studentMarkSummaryRoutes from "./routes/student_mark_summary.route";
import teacherRoutes from "./routes/teacher.route";
import termRoutes from "./routes/term.route";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API running..."));

app.use("/api/academic-years", academicYearRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/attendances", attendanceRoutes);
app.use("/api/behaviors", behaviorRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/class-sections", classSectionRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/finance-summaries", financeSummaryRoutes);
app.use("/api/leave-requests", leaveRequestRoutes);
app.use("/api/library-books", libraryBookRoutes);
app.use("/api/library-transactions", libraryTransactionRoutes);
app.use("/api/marks", markRoutes);
app.use("/api/parents", parentRoutes);
app.use("/api/parent-students", parentStudentsRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/student-mark-summaries", studentMarkSummaryRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/terms", termRoutes);

export default app;
