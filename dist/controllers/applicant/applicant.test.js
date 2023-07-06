"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("../../helpers/tests_utils/context");
const functions_with_context_1 = require("../../helpers/tests_utils/functions-with-context");
let mockCtx;
let ctx;
beforeEach(() => {
    mockCtx = (0, context_1.createMockContext)();
    ctx = mockCtx;
});
const applicantId = "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d";
const applicant = {
    id: applicantId,
    firstName: "Rich",
    lastName: "John",
    email: "hello@prisma.io",
    phone: "09025252653",
};
test("should create new user ", () => __awaiter(void 0, void 0, void 0, function* () {
    mockCtx.prisma.applicant.create.mockResolvedValue(applicant);
    yield expect(functions_with_context_1.ApplicantConTextTest.createApplicant(applicant, ctx)).resolves.toEqual({
        id: applicantId,
        firstName: "Rich",
        lastName: "John",
        email: "hello@prisma.io",
        phone: "09025252653",
    });
}));
test("should get applicant by ID", () => __awaiter(void 0, void 0, void 0, function* () {
    mockCtx.prisma.applicant.findUnique.mockResolvedValue(applicant);
    yield expect(functions_with_context_1.ApplicantConTextTest.getApplicant(applicantId, ctx)).resolves.toEqual(applicant);
}));
test("should update applicant", () => __awaiter(void 0, void 0, void 0, function* () {
    const updatedApplicant = Object.assign(Object.assign({}, applicant), { firstName: "Updated" });
    mockCtx.prisma.applicant.update.mockResolvedValue(updatedApplicant);
    yield expect(functions_with_context_1.ApplicantConTextTest.updateApplicant(applicant, ctx)).resolves.toEqual(updatedApplicant);
}));
test("should delete applicant by ID", () => __awaiter(void 0, void 0, void 0, function* () {
    mockCtx.prisma.applicant.delete.mockResolvedValue(1);
    const result = yield functions_with_context_1.ApplicantConTextTest.deleteApplicant(applicantId, ctx);
    expect(result).toBe(1);
}));
