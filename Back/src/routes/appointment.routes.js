import { Router } from 'express';
import { getAppointment, createAppointment, deleteAppointment} from '../controllers/appointment.controller.js';

const router = Router();

router.get('/login/cita/:idCita', getAppointment);

router.post('/login/cita', createAppointment);

router.delete('/login/cita/:idCita', deleteAppointment);

export default router;