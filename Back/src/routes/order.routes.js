import { Router } from 'express';
import { getOrder, createOrder, deleteOrder, updateStateOrder } from '../controllers/order.controller.js';

const router = Router();

router.get('/login/order/:idOrden', getOrder);

router.post('/login/order', createOrder);

router.patch('/login/order/state/:idOrden', updateStateOrder);

router.delete('/login/order/:idOrden', deleteOrder);

export default router;
