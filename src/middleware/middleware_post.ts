import { Request, Response, NextFunction } from "express";
import { PostSchema } from "../schemas/Post.schemas.js";
import { post_validator } from "../utils/Validation.js";
import { validateSchema } from "../utils/validate.js";
import ValidateError from "../Errors/ValidateError.js";

export async function validatePost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    
    await validateSchema(post_validator as any, PostSchema as any, req.body);
    next();
  } catch (err) {
    if (err instanceof ValidateError) {
      console.error("Errores de validación:", err.details);
      res.status(400).json({
        mensaje: "Datos de post no válidos",
        errores: err.details,
      });
      return; 
    }

    next(err);
  }
}
