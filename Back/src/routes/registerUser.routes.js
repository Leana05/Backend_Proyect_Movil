import { Router } from "express";
import {
  createNewUser,
  getUsers,
  getUser,
  updateInfoUser,
  deleteUser,
} from '../controllers/registerUser.controller.js';

const router = Router();

router.get('/login/users', getUsers);

router.get('/login/user/:id', getUser);

router.post('/login/register', createNewUser)

router.patch('/login/user/:id', updateInfoUser)

router.delete('/login/user/:id', deleteUser)

export default router;