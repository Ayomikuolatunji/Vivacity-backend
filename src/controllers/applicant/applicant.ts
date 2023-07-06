import { Request, Response } from "express";
import prisma from "../../database/database";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { throwError } from "../../middleware/requestErrorHandler";
import { v4 as uuidv4 } from "uuid";

class ControllerUtils {
  public static createApplicant = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throwError("Validation error", StatusCodes.BAD_REQUEST, true);
    }
    const { firstName, lastName, email, phone } = req.body;
    const createdApplicant = await prisma.applicant.create({
      data: { id: uuidv4(), firstName, lastName, email, phone },
    });
    res.status(StatusCodes.CREATED).json(createdApplicant);
  };

  public static getApplicant = async (req: Request, res: Response) => {
    const { applicantId } = req.params;
    const applicant = await prisma.applicant.findUnique({
      where: { id: applicantId },
    });
    if (!applicant) {
      throwError("Applicant not found", StatusCodes.NOT_FOUND);
      return;
    }
    res.status(StatusCodes.OK).json(applicant);
  };

  public static updateApplicant = async (req: Request, res: Response) => {
    const { applicantId } = req.params;
    const { firstName, lastName, email, phone } = req.body;
    const updatedApplicant = await prisma.applicant.update({
      where: { id: applicantId },
      data: { firstName, lastName, email, phone },
    });

    res.status(StatusCodes.OK).json(updatedApplicant);
  };

  public static deleteApplicant = async (req: Request, res: Response) => {
    const { applicantId } = req.params;
    await prisma.applicant.delete({
      where: { id: applicantId },
    });
    res
      .status(StatusCodes.OK)
      .json({ message: "Applicant deleted successfully" });
  };
}

export default ControllerUtils;
