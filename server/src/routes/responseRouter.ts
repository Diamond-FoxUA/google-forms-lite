import { Router } from "express";
import {
  getFormResponses,
  submitFormResponses,
} from "../controllers/responseController.js";

export const responseRouter = Router();

responseRouter.get("/forms/:id/responses", getFormResponses);
responseRouter.post("/forms/:id/responses", submitFormResponses);
