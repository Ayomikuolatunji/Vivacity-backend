"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const applicant_1 = __importDefault(require("../routes/applicant"));
const v1Api = (0, express_1.default)();
v1Api.use("/v1", applicant_1.default);
exports.default = v1Api;
