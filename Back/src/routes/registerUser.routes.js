import { Router } from "express";
import { createNewUser, getUsers } from "../controllers/registerUser.controller.js";

const router = Router();

router.get('/login/users', getUsers);

router.post('/login/register', createNewUser)

export default router;