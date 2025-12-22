import { BaseRepository, prisma } from "./base.repositorie.ts";
import dayjs from "dayjs";

export class DashboardRepository extends BaseRepository<"dashboard"> {
  constructor() {
    super("dashboard");
  }

  async findById(schoolId: string, signal?: AbortSignal) {
    try {
      const now = dayjs();
      const today = now.startOf("day");
      const tomorrow = today.add(1, "day");
      const startOfYear = now.startOf("year");
      const endOfYear = now.endOf("year");

      const branches = await prisma.branch.findMany({
        where: { school_id: schoolId },
        select: { id: true },
      });
      const branchIds = branches.map((b) => b.id);

      // Fetch all dashboard data in parallel
      const [
        maleStudents,
        femaleStudents,
        teachers,
        attendanceToday,
        expenses,
        fees,
      ] = await Promise.all([
        prisma.student.count({
          where: { branch: { school_id: schoolId }, sex: "Male" },
        }),
        prisma.student.count({
          where: { branch: { school_id: schoolId }, sex: "Female" },
        }),
        prisma.teacher.count({ where: { branch: { school_id: schoolId } } }),
        prisma.attendance.count({
          where: {
            date: { gte: today.toDate(), lt: tomorrow.toDate() },
            academicyear: {
              branch: {
                school_id: schoolId,
              },
            },
          },
        }),
        prisma.expense.findMany({
          where: {
            academicyear: {
              branch_id: { in: branchIds },
            },
            date: { gte: startOfYear.toDate(), lte: endOfYear.toDate() },
          },
          select: { amount: true, date: true },
        }),
        prisma.fee.findMany({
          where: {
            status: "Paid",
            created_at: { gte: startOfYear.toDate(), lte: endOfYear.toDate() },
            enrollment: {
              student: {
                branch: {
                  school_id: schoolId,
                },
              },
            },
          },
          select: { amount: true, created_at: true },
        }),
        signal,
      ]);

      const expenseData = Array(12).fill(0);
      const feeData = Array(12).fill(0);

      expenses.forEach((e) => {
        if (e.date) {
          const month = dayjs(e.date).month();
          expenseData[month] += Number(e.amount);
        }
      });

      fees.forEach((f) => {
        if (f.created_at) {
          const month = dayjs(f.created_at).month();
          feeData[month] += Number(f.amount);
        }
      });

      return {
        maleStudents,
        femaleStudents,
        teachers,
        attendanceToday,
        expenseData,
        feeData,
      };
    } catch (error) {
      this.handleError(error);
    }
  }
}
