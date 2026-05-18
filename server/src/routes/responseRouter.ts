import { Router } from "express";
import {
  getFormResponses,
  submitFormResponses,
} from "../controllers/responseController.js";
import { validate } from "../middleware/validate.js";
import { submitResponseSchema } from "../validations/formValidation.js";

export const responseRouter = Router({ mergeParams: true });

responseRouter.get("/", getFormResponses);
responseRouter.post("/", validate(submitResponseSchema), submitFormResponses);
