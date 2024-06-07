import { Router } from 'express';
import { createOrder, getOrden } from '../controllers/order.controller.js';

const router = Router();

router.post('/newOrder', createOrder);

router.get('/order/:cedula', getOrden);

export default router;