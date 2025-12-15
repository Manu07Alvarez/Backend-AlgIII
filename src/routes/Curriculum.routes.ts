import { Request, Router, Response } from "express";
import { createCurriculumController } from "../utils/factories/ClassFactory.js";

const router = Router();
const curriculumController = createCurriculumController();

/**
 * Crear curriculum
 */
router.post("/create", async (req: Request, res: Response) => {
  /* #swagger.tags = ['Curriculum']
     #swagger.summary = 'Crear curriculum'
     #swagger.description = 'Crea un nuevo curriculum'
     #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/curriculumSchema"
            }
          }
        }
     }
     #swagger.responses[201] = {
        description: 'Curriculum creado correctamente'
     }
     #swagger.responses[400] = {
        description: 'Datos inválidos'
     }
  */
  await curriculumController.create(req, res);
});

/**
 * Buscar curriculum por nombre
 */
router.get("/findByName/:name", async (req: Request, res: Response) => {
  /* #swagger.tags = ['Curriculum']
     #swagger.summary = 'Buscar curriculum por nombre'
     #swagger.parameters['name'] = {
        in: 'path',
        required: true,
        type: 'string'
     }
     #swagger.responses[200] = {
        description: 'Listado de curriculums',
        content: {
          "application/json": {
            schema: {
              type: 'array',
              items: {
                $ref: "#/components/schemas/curriculumSchema"
              }
            }
          }
        }
     }
  */
  await curriculumController.findByName(req, res);
});

/**
 * Obtener curriculums por usuario
 */
router.get("/user/:userId", async (req: Request, res: Response) => {
  /* #swagger.tags = ['Curriculum']
     #swagger.summary = 'Obtener curriculums por usuario'
     #swagger.parameters['userId'] = {
        in: 'path',
        required: true,
        type: 'number'
     }
     #swagger.responses[200] = {
        description: 'Curriculums del usuario',
        content: {
          "application/json": {
            schema: {
              type: 'array',
              items: {
                $ref: "#/components/schemas/curriculumSchema"
              }
            }
          }
        }
     }
  */
  await curriculumController.findByUserId(req, res);
});

/**
 * Actualizar curriculum
 */
router.put("/update/:id", async (req: Request, res: Response) => {
  /* #swagger.tags = ['Curriculum']
     #swagger.summary = 'Actualizar curriculum'
     #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'number'
     }
     #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/curriculumSchema"
            }
          }
        }
     }
     #swagger.responses[200] = {
        description: 'Curriculum actualizado'
     }
  */
  await curriculumController.update(req, res);
});

/**
 * Eliminar curriculum
 */
router.delete("/delete/:id", async (req: Request, res: Response) => {
  /* #swagger.tags = ['Curriculum']
     #swagger.summary = 'Eliminar curriculum'
     #swagger.parameters['id'] = {
        in: 'path',
        required: true,
        type: 'number'
     }
     #swagger.responses[200] = {
        description: 'Curriculum eliminado'
     }
  */
  await curriculumController.delete(req, res);
});

export default router;
