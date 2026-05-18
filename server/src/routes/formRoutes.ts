import { Router } from "express";
import {
  createForm,
  deleteForm,
  getAllForms,
  getFormById,
} from "../controllers/formController.js";
import { validate } from "../middleware/validate.js";
import { createFormSchema } from "../validations/formValidation.js";
import { responseRouter } from "./responseRouter.js";

export const formRouter = Router();

formRouter.get("/", getAllForms);
formRouter.post("/", validate(createFormSchema), createForm);
formRouter.get("/:id", getFormById);
formRouter.delete("/:id", deleteForm);

formRouter.use("/:id/responses", responseRouter);
