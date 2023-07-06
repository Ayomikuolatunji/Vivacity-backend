import { body, param, ValidationChain } from "express-validator";

export class ValidationRules {
  public static createApplicant: ValidationChain[] = [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("phone").notEmpty().withMessage("Phone number is required"),
  ];
  public static applicantIdParam: ValidationChain = param("applicantId")
    .notEmpty()
    .withMessage("Applicant ID is required");
}
