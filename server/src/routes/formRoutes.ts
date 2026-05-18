import { Router, type Request, type Response } from "express";
import prisma from "../db/db.js";
import { QuestionType } from "@prisma/client";
import {
  createForm,
  deleteForm,
  getAllForms,
  getFormById,
} from "../controllers/formController.js";

export const formRouter = Router();

formRouter.get("/", getAllForms);
formRouter.post("/", createForm);
formRouter.get("/:id", getFormById);
formRouter.delete("/:id", deleteForm);
