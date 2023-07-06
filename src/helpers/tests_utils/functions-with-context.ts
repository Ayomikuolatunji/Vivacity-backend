import { Applicant } from "@prisma/client";
import { Context } from "./context";

export class ApplicantConTextTest {
  public static async createApplicant(applicant: Applicant, ctx: Context) {
    if (applicant.email) {
      return await ctx.prisma.applicant.create({
        data: applicant,
      });
    } else {
      return new Error("Applicant created");
    }
  }

  public static async updateApplicant(applicant: Applicant, ctx: Context) {
    return await ctx.prisma.applicant.update({
      where: { id: applicant.id },
      data: applicant,
    });
  }

  public static async getApplicant(applicantId: string, ctx: Context) {
    return await ctx.prisma.applicant.findUnique({
      where: { id: applicantId },
    });
  }

  public static async deleteApplicant(applicantId: string, ctx: Context) {
    return await ctx.prisma.applicant.delete({
      where: { id: applicantId },
    });
  }
}