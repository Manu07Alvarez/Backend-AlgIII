import { Response, Request, Router } from "express";
import { createPostController } from "../utils/factories/ClassFactory.js";
import { trace } from "@opentelemetry/api";
import { validatePost } from "../middleware/middleware_post.js"; 

const router = Router();
const postController = createPostController();
const tracer = trace.getTracer("route-lib");

// 🔹 Crear post (con validación)
router.post("/create", validatePost, (req: Request, res: Response) => {
  /*  #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
            schema: {
                $ref: '#/components/schemas/postSchema'
            },
            example: {
                titulo: "Primer post",
                contenido: "Hola mundo en el foro",
                published: true,
                id_autor: 1,
                id_tema: 2
            }
            }
        }
    }
  */
  postController.create(req, res);
});

// 🔹 Obtener posts paginados
router.get("/getPagination", (req: Request, res: Response) => {
  postController.getPagination(req, res);
});

// 🔹 Obtener todos los posts
router.get("/findAll", (req: Request, res: Response) => {
  postController.findAll(req, res);
});

// 🔹 Buscar por ID
router.get("/findById/:id", (req: Request, res: Response) => {
  postController.findById(req, res);
});

// 🔹 Buscar por título
router.get("/findByTitle/:title", (req: Request, res: Response) => {
  postController.findByTitle(req, res);
});

// 🔹 Actualizar post (con validación)
router.put("/update/:id", validatePost, (req: Request, res: Response) => {
  /*  #swagger.requestBody = {
        required: true,
        content: {
            'application/json': {
            schema: {
                $ref: '#/components/schemas/postSchema'
            },
            example: {
                titulo: "Primer post",
                contenido: "Hola mundo en el foro actualizado",
                published: false
            }
            }
        }
    }
  */
  postController.update(req, res);
});

// 🔹 Activar o desactivar
router.patch("/activateOrDeactivate/:id", (req: Request, res: Response) => {
  postController.activateOrDeactivate(req, res);
});

// 🔹 Eliminar post
router.delete("/delete/:id", (req: Request, res: Response) => {
  postController.delete(req, res);
});

export default router;
