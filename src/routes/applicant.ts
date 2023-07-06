import { Router } from "express";
import ControllerUtils from "../controllers/applicant/applicant";
import { ValidationRules } from "../helpers/ValidationRules";

class ApplicantRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initRoutes();
  }
  private initRoutes(): void {
    this.router.post(
      "/awesome/applicant",
      ValidationRules.createApplicant,
      ControllerUtils.createApplicant
    );
    this.router.get(
      "/awesome/applicant/:applicantId",
      ValidationRules.applicantIdParam,
      ControllerUtils.getApplicant
    );

    this.router.patch(
      "/awesome/applicant/:applicantId",
      ValidationRules.applicantIdParam,
      ControllerUtils.updateApplicant
    );

    this.router.delete(
      "/awesome/applicant/:applicantId",
      ValidationRules.applicantIdParam,
      ControllerUtils.deleteApplicant
    );
  }
}

export default new ApplicantRoutes().router;
