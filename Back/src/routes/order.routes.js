import { Router } from 'express';
import { getOrder, createOrder } from '../controllers/order.controller.js';

const router = Router();

router.get('/login/order/:idOrden', getOrder);

router.post('/login/order', createOrder);

export default router;
