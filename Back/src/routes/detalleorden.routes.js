import { Router } from 'express';
import {
    getDetalleOrden,
} from '../controllers/detalleorden.controller.js';

const router = Router();

router.get('/DetalleOrden/:cedula', getDetalleOrden);

export default router;