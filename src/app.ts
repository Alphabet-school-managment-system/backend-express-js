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

app.use("/v1/api/academic-years", academicYearRoutes);
app.use("/v1/api/assessments", assessmentRoutes);
app.use("/v1/api/attendances", attendanceRoutes);
app.use("/v1/api/behaviors", behaviorRoutes);
app.use("/v1/api/branches", branchRoutes);
app.use("/v1/api/class-sections", classSectionRoutes);
app.use("/v1/api/enrollments", enrollmentRoutes);
app.use("/v1/api/expenses", expenseRoutes);
app.use("/v1/api/fees", feeRoutes);
app.use("/v1/api/finance-summaries", financeSummaryRoutes);
app.use("/v1/api/leave-requests", leaveRequestRoutes);
app.use("/v1/api/library-books", libraryBookRoutes);
app.use("/v1/api/library-transactions", libraryTransactionRoutes);
app.use("/v1/api/marks", markRoutes);
app.use("/v1/api/parents", parentRoutes);
app.use("/v1/api/parent-students", parentStudentsRoutes);
app.use("/v1/api/schools", schoolRoutes);
app.use("/v1/api/staff", staffRoutes);
app.use("/v1/api/students", studentRoutes);
app.use("/v1/api/student-mark-summaries", studentMarkSummaryRoutes);
app.use("/v1/api/teachers", teacherRoutes);
app.use("/v1/api/terms", termRoutes);

export default app;
