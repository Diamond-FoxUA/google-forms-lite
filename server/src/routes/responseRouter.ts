import { Router } from "express";
import {
  getFormResponses,
  submitFormResponses,
} from "../controllers/responseController.js";
import { validate } from "../middleware/validate.js";
import { submitResponseSchema } from "../validations/formValidation.js";

export const responseRouter = Router();

responseRouter.get("/:id", getFormResponses);
responseRouter.post("/:id", validate(submitResponseSchema), submitFormResponses);
