import express from "express";
import admin from "../controllers/admin.js";

import admint from "../middlewares/admin.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

//ruta para registrar
router.post("/registerAdmin", admin.registerAdmin);

//ruta para listar
router.get("/listAdmin", auth, admint, admin.listAdmin);

//ruta para login
router.post("/login", admin.login);

export default router;
