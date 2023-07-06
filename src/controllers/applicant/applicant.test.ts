import {
  MockContext,
  Context,
  createMockContext,
} from "../../helpers/tests_utils/context";
import { Applicant } from "@prisma/client";
import { ApplicantConTextTest } from "../../helpers/tests_utils/functions-with-context";

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

const applicantId = "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d";

const applicant: Applicant = {
  id: applicantId,
  firstName: "Rich",
  lastName: "John",
  email: "hello@prisma.io",
  phone: "09025252653",
};

test("should create new user ", async () => {
  mockCtx.prisma.applicant.create.mockResolvedValue(applicant);
  await expect(
    ApplicantConTextTest.createApplicant(applicant, ctx)
  ).resolves.toEqual({
    id: applicantId,
    firstName: "Rich",
    lastName: "John",
    email: "hello@prisma.io",
    phone: "09025252653",
  });
});


test("should get applicant by ID", async () => {
  mockCtx.prisma.applicant.findUnique.mockResolvedValue(applicant);
  await expect(
    ApplicantConTextTest.getApplicant(applicantId, ctx)
  ).resolves.toEqual(applicant);
});

test("should update applicant", async () => {
  const updatedApplicant: Applicant = {
    ...applicant,
    firstName: "Updated",
  };
  mockCtx.prisma.applicant.update.mockResolvedValue(updatedApplicant);
  await expect(
    ApplicantConTextTest.updateApplicant(applicant, ctx)
  ).resolves.toEqual(updatedApplicant);
});

test("should delete applicant by ID", async () => {
  mockCtx.prisma.applicant.delete.mockResolvedValue(1 as any)
  const result = await ApplicantConTextTest.deleteApplicant(applicantId, ctx);
  expect(result).toBe(1);
});
