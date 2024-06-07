import { Router } from 'express';
import {
    getProductos
} from '../controllers/product.controller.js';

const router = Router();

router.get('/productos', getProductos);

export default router;