import { Router } from "express";
import { createNewUser, getUsers, updateInfoUser } from '../controllers/registerUser.controller.js';

const router = Router();

router.get('/login/users', getUsers);

router.post('/login/register', createNewUser)

router.patch('/login/user/:id', updateInfoUser)

export default router;