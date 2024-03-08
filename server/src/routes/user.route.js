import express from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import { Register, Login, Logout, refreshAccessToken } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/register").post(upload.single("avatar"),Register);
router.route("/login").post(Login);
router.route("/logout").get(verifyJWT,Logout);
router.route("/refresh-token").get(refreshAccessToken);

export default router;
