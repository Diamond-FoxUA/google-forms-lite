import type { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import { z, ZodError } from "zod";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Error Moddleware: ", err);

  if (err instanceof ZodError) {
    const flattened = z.flattenError(err);

    return res.status(400).json({
      status: "fail",
      message: "Validation Error",
      errors: flattened.fieldErrors,
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  const isProd = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: isProd
      ? "Something went wrong. Please try again later."
      : err.message,
  });
};
