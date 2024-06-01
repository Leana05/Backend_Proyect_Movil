import { Router } from 'express';
import {
    getCarritos,
    createNewProducto,
    deleteCarrito
} from '../controllers/carrito.controller.js';

const router = Router();

router.get('/Carritos/:Cedula', getCarritos);

router.post('/Carritos', createNewProducto);

router.delete('/DeleteC/:Cedula', deleteCarrito);

export default router;