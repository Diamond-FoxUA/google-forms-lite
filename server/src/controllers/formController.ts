import type { Request, Response } from "express";
import prisma from "../db/db.js";
import { QuestionType } from "@prisma/client";
import createHttpError from "http-errors";

export const getAllForms = async (req: Request, res: Response) => {
  const forms = await prisma.form.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.status(200).json(forms);
};

export const getFormById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const form = await prisma.form.findUnique({
    where: { id },
    include: { questions: true },
  });

  if (!form) {
    throw createHttpError(404, "Form not found.");
  }

  res.status(200).json(form);
};

interface IncomingQuestion {
  text: string;
  type: QuestionType;
  options?: string[];
}

export const createForm = async (req: Request, res: Response) => {
  const { title, description, questions } = req.body as {
    title: string;
    description: string;
    questions: IncomingQuestion[];
  };

  const newForm = await prisma.form.create({
    data: {
      title,
      description,
      questions: {
        create: questions.map((q: IncomingQuestion) => ({
          type: q.type as QuestionType,
          text: q.text,
          options: q.options || [],
        })),
      },
    },

    include: { questions: true },
  });

  res.status(201).json(newForm);
};

export const deleteForm = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.form.delete({
    where: { id },
  });

  res.status(204).send();
};
