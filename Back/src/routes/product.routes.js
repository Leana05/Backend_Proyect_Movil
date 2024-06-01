import { Router } from 'express';
import {
    getProductos,
    getProducto,
    createNewProducto,
    updateProducto,
    deleteMascota,
} from '../controllers/product.controller.js';

const router = Router();

router.get('/productos', getProductos);

router.get('/productos/:id', getProducto);

router.post('/newproducto', createNewProducto);

router.patch('/producto/:IdProducto', updateProducto);

router.delete('/delProd/:IdProducto', deleteMascota);

export default router;