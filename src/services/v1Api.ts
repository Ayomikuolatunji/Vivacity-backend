import express from "express";
import applicantRoutes from "../routes/applicant";


const v1Api = express();

v1Api.use("/v1", applicantRoutes);

export default v1Api;
