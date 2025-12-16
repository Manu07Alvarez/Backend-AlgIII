import { Request, Router, Response } from "express";
import { createCurriculumController } from "../utils/factories/ClassFactory.js";

const router = Router();
const curriculumController = createCurriculumController();

router.post("/create", async (req: Request, res: Response) => {
  await curriculumController.create(req, res);
});

router.get("/findByName/:name", async (req: Request, res: Response) => {
  await curriculumController.findByName(req, res);
});

router.get("/user/:userId", async (req: Request, res: Response) => {
  await curriculumController.findByUserId(req, res);
});

router.put("/update/:id", async (req: Request, res: Response) => {
  await curriculumController.update(req, res);
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  await curriculumController.delete(req, res);
});

export default router;
