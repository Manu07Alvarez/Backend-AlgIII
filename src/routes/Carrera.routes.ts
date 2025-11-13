/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Router, Response } from 'express';
import { createCarreraController } from '../utils/factories/ClassFactory.js';
import { validateCarrera } from '../middleware/middleware_carrera.js'; 

const router = Router();
const carreraController = createCarreraController();

import { trace } from '@opentelemetry/api';
import { Carrera } from '../schemas/Carreras.schemas.js'; // 🔧 corregido el import (faltaba "../")

const tracer = trace.getTracer('route-lib');

// ✅ Crear carrera con validación previa
router.post('/create', validateCarrera, (req: Request, res: Response) => {
  carreraController.create(req, res);
});

// Obtener todas las carreras
router.get('/', (req: Request, res: Response) => {
  carreraController.findAll(req, res);
});

// Buscar carrera por nombre
router.route('/:name').get((req: Request, res: Response) => {
  carreraController.findByName(req, res);
});

// Buscar, actualizar o activar/desactivar por ID
router
  .route('/:id')
  .get((req: Request, res: Response) => {
    carreraController.findById(req, res);
  })
  .patch((req: Request, res: Response) => {
    carreraController.activateOrDeactivate(req, res);
  })
  // ✅ Validar también en update
  .put(validateCarrera, (req: Request, res: Response) => {
    carreraController.update(req, res);
  });

export default router;
