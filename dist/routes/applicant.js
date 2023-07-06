"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const applicant_1 = __importDefault(require("../controllers/applicant/applicant"));
const ValidationRules_1 = require("../helpers/ValidationRules");
class ApplicantRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.post("/awesome/applicant", ValidationRules_1.ValidationRules.createApplicant, applicant_1.default.createApplicant);
        this.router.get("/awesome/applicant/:applicantId", ValidationRules_1.ValidationRules.applicantIdParam, applicant_1.default.getApplicant);
        this.router.patch("/awesome/applicant/:applicantId", ValidationRules_1.ValidationRules.applicantIdParam, applicant_1.default.updateApplicant);
        this.router.delete("/awesome/applicant/:applicantId", ValidationRules_1.ValidationRules.applicantIdParam, applicant_1.default.deleteApplicant);
    }
}
exports.default = new ApplicantRoutes().router;
