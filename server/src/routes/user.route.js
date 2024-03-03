import express from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import { Register, Login, Logout } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").post(verifyJWT, Logout);

export default router;
