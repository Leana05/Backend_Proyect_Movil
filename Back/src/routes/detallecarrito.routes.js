import { Router } from 'express';
import { getDetCarrito, updateDetCarrito, deleteDetCarrito } from '../controllers/detallecarrito.controller.js';

const router = Router();

router.get('/login/det/:idDetCarrito', getDetCarrito);

router.patch('/login/det/:idDetCarrito', updateDetCarrito);

router.delete('/login/det/:idDetCarrito', deleteDetCarrito);

export default router;
