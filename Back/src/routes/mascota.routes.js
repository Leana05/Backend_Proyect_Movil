import { Router } from 'express';
import {
  createNewMascota,
  getMascotas,
  getMascota,
  updateMascota,
  deleteMascota,
} from '../controllers/mascota.controller.js';

const router = Router();

router.get('/mascotas', getMascotas);

router.get('/mascota/:id', getMascota);

router.post('/mascota', createNewMascota);

router.patch('/mascota/:id', updateMascota);

router.delete('/delete/mascota/:id/:idMascota', deleteMascota);

export default router;
