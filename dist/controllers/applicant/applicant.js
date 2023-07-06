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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database/database"));
const express_validator_1 = require("express-validator");
const http_status_codes_1 = require("http-status-codes");
const requestErrorHandler_1 = require("../../middleware/requestErrorHandler");
const uuid_1 = require("uuid");
class ControllerUtils {
}
_a = ControllerUtils;
ControllerUtils.createApplicant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        (0, requestErrorHandler_1.throwError)("Validation error", http_status_codes_1.StatusCodes.BAD_REQUEST, true);
    }
    const { firstName, lastName, email, phone } = req.body;
    const createdApplicant = yield database_1.default.applicant.create({
        data: { id: (0, uuid_1.v4)(), firstName, lastName, email, phone },
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json(createdApplicant);
});
ControllerUtils.getApplicant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { applicantId } = req.params;
    const applicant = yield database_1.default.applicant.findUnique({
        where: { id: applicantId },
    });
    if (!applicant) {
        (0, requestErrorHandler_1.throwError)("Applicant not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        return;
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(applicant);
});
ControllerUtils.updateApplicant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { applicantId } = req.params;
    const { firstName, lastName, email, phone } = req.body;
    const updatedApplicant = yield database_1.default.applicant.update({
        where: { id: applicantId },
        data: { firstName, lastName, email, phone },
    });
    res.status(http_status_codes_1.StatusCodes.OK).json(updatedApplicant);
});
ControllerUtils.deleteApplicant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { applicantId } = req.params;
    yield database_1.default.applicant.delete({
        where: { id: applicantId },
    });
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ message: "Applicant deleted successfully" });
});
exports.default = ControllerUtils;
