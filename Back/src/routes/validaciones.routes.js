import { Router } from 'express';
import {
  getValUser,
  getCartProducts
} from '../controllers/validaciones.controller.js';

const router = Router();

router.get('/login/valiUser', getValUser);

router.get('/cart/:cedula', getCartProducts);

router.get('/updateStock')

export default router;