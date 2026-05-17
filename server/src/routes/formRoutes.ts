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

formRouter.get("/forms", getAllForms);
formRouter.get("/form/:id", getFormById);
formRouter.post("/forms", createForm);
formRouter.delete("/form/:id", deleteForm);
