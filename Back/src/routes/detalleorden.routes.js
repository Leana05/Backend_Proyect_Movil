import { Router } from 'express';
import {
    getDetalleOrden,
    getDetOrden,
} from '../controllers/detalleorden.controller.js';

const router = Router();

router.get('/DetalleOrden/:Cedula', getDetalleOrden);

router.get('/DetOrden/:IdDetOrden', getDetOrden);

export default router;