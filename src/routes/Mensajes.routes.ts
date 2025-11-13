import { Response, Request, Router } from "express";
import { createMensajeController } from "../utils/factories/ClassFactory.js";
import { validateMensajes } from "../middleware/middleware_mensajes.js";
import { trace } from "@opentelemetry/api";

const router = Router();
const mensajesController = createMensajeController();
const tracer = trace.getTracer("route-lib");

// ✅ Crear mensaje (con validación)
router.post("/create", validateMensajes, (req: Request, res: Response) => {
  /*  #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/mensajeSchema'
                },
                example: {
                    contenido: "Estoy de acuerdo con este post",
                    id_autor: 1,
                    id_post: 2,
                    id_mensaje: null
                }
            }
        }
    }
  */
  mensajesController.create(req, res);
});

router.get("/findAllInPost/:id", (req: Request, res: Response) => {
  mensajesController.findAllInPost(req, res);
});

router.get("/findById/:id", (req: Request, res: Response) => {
  mensajesController.findById(req, res);
});

// ✅ Actualizar mensaje (con validación)
router.put("/update/:id", validateMensajes, (req: Request, res: Response) => {
  /*  #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
                schema: {
                    $ref: '#/components/schemas/mensajeSchema'
                },
                example: {
                    contenido: "Estoy de acuerdo con este post",
                    id_mensaje: null
                }
            }
        }
    }
  */
  mensajesController.update(req, res);
});

router.patch("/activateOrDeactivate/:id", (req: Request, res: Response) => {
  mensajesController.activateOrDeactivate(req, res);
});

router.delete("/delete/:id", (req: Request, res: Response) => {
  mensajesController.delete(req, res);
});

export default router;
