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

router.patch('/producto/:idProducto', updateProducto);

router.delete('/delProd/:idProducto', deleteMascota);

export default router;