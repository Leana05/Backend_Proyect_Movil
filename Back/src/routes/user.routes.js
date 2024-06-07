import { Router } from "express";
import {
  createNewUser,
  getUsers,
  getUser,
  updateInfoUser,
  deleteUser,
} from '../controllers/user.controller.js';

const router = Router();

router.get('/login/users', getUsers);

router.get('/login/user/:cedula', getUser);

router.post('/login/register', createNewUser)

router.patch('/login/user/:cedula', updateInfoUser)

router.delete('/login/user/:cedula', deleteUser)

export default router;