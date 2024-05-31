import { Router } from 'express';
import { createNewMascota, getMascotas, updateMascota } from '../controllers/mascota.controller.js';

const router = Router();

router.get('/mascotas', getMascotas);
router.post('/mascota', createNewMascota);
router.patch('/mascota/:id', updateMascota);

export default router;
