import { Router } from 'express';
import { ping } from '../controllers/index.controller.js';

const router = Router();

router.get('/home', ping);


export default router;