import { Request, Response, Router } from "express";
import { createTemaController } from "../utils/factories/ClassFactory.js";
import { trace } from "@opentelemetry/api";
import { validateTema } from "../middleware/middleware_temas.js"; 

const router = Router();
const temaController = createTemaController();
const tracer = trace.getTracer("route-lib");

// 🔹 Crear tema (con validación)
router.post("/create", validateTema, (req: Request, res: Response) => {
  /*  #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/temaSchema'
            },
            example: {
              nombre: "Reglamento",
              titulo: "Normas del foro",
              contenido: "Por favor leer antes de participar.",
              id_creador: 1,
              id_carrera: 2,
              fijado: false,
              cerrado: false
            }
          }
        }
      }
  */
  temaController.create(req, res);
});

// 🔹 Obtener todos los temas
router.get("/findAll", (req: Request, res: Response) => {
  temaController.findAll(req, res);
});

// 🔹 Buscar por nombre
router.get("/findByName/:name", (req: Request, res: Response) => {
  temaController.findByName(req, res);
});

// 🔹 Buscar por ID
router.get("/findById/:id", (req: Request, res: Response) => {
  temaController.findById(req, res);
});

// 🔹 Actualizar tema (con validación)
router.put("/update/:id", validateTema, (req: Request, res: Response) => {
  /*  #swagger.requestBody = {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/temaSchema'
            },
            example: {
              nombre: "Reglamento",
              titulo: "Normas del foro actualizadas",
              contenido: "Por favor leer antes de participar.",
              fijado: false,
              cerrado: false
            }
          }
        }
      }
  */
  temaController.update(req, res);
});

// 🔹 Activar o desactivar
router.put("/activateOrDeactivate/:id", (req: Request, res: Response) => {
  temaController.activateOrDeactivate(req, res);
});

// 🔹 Eliminar
router.delete("/delete/:id", (req: Request, res: Response) => {
  temaController.delete(req, res);
});

export default router;
