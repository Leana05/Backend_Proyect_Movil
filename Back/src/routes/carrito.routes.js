import { Router } from 'express';
import { deleteCarrito, postDetCarrito } from '../controllers/carrito.controller.js';

const router = Router();

router.delete('/DeleteC/:cedula', deleteCarrito);
router.post('/Add/carrito', postDetCarrito);


export default router;