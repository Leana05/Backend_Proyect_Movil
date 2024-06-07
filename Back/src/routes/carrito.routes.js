import { Router } from 'express';
import { getCarritos, deleteCarrito } from '../controllers/carrito.controller.js';

const router = Router();

router.get('/Carritos/:cedula', getCarritos);

router.delete('/DeleteC/:cedula', deleteCarrito);

export default router;