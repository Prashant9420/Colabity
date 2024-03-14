import express from "express";
import {verifyJWT} from "../middlewares/auth.middleware.js";
import { saveDoc,getAllDocs,deleteDoc } from "../controllers/doc.controller.js";

const router = express.Router();

router.route("/save-doc").post(verifyJWT,saveDoc)
router.route("/get-docs").get(verifyJWT,getAllDocs)
router.route("/delete-doc").post(verifyJWT,deleteDoc)

export default router;
