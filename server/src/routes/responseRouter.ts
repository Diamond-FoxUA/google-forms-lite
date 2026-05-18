import { Router } from "express";
import {
  getFormResponses,
  submitFormResponses,
} from "../controllers/responseController.js";

export const responseRouter = Router();

responseRouter.get("/:id", getFormResponses);
responseRouter.post("/:id", submitFormResponses);
