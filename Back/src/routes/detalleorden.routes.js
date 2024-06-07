import { Router } from 'express';
import {
    getDetalleOrden,
    getDetOrden,
} from '../controllers/detalleorden.controller.js';

const router = Router();

router.get('/DetalleOrden/:cedula', getDetalleOrden);

router.get('/DetOrden/:idDetOrden', getDetOrden);

export default router;