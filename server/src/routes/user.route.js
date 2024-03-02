import express from 'express';
import { Register,Login } from '../controllers/user.controller.js';
const router = express.Router();

router.route('/register').post(Register);
router.route('/login').post(Login);

export default router;