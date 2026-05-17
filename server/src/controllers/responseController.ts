import type { Request, Response } from "express";
import prisma from "../db/db.js";
import createHttpError from "http-errors";

export const getFormResponses = async (req: Request, res: Response) => {
  const { id } = req.params;

  const formExists = await prisma.form.findUnique({
    where: { id },
  });

  if (!formExists) {
    throw createHttpError(404, "Form not found.");
  }

  const responses = await prisma.response.findMany({
    where: { formId: id },
    include: { answers: true },
    orderBy: { submittedAt: "desc" },
  });

  res.status(200).json(responses);
};

interface IncomingAnswer {
  question_id: string;
  value: string;
}

export const submitFormResponses = async (req: Request, res: Response) => {
  const formId = req.params.id;
  const { answers } = req.body as { answers: IncomingAnswer[] };

  const formExists = await prisma.form.findUnique({
    where: { id: formId },
  });

  if (!formExists) {
    throw createHttpError(404, "Cannot submit response. Form not found.");
  }

  const newResponse = await prisma.response.create({
    data: {
      formId,
      answers: {
        create: answers.map((ans: IncomingAnswer) => ({
          questionId: ans.question_id,
          value: ans.value,
        })),
      },
    },

    include: { answers: true },
  });

  res.status(201).json(newResponse);
};
