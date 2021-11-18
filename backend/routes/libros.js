//importamos el servidor express y el controlador
import express from "express";
import libros from "../controllers/libros.js";
import auth from "../middlewares/auth.js";
import admint from "../middlewares/admin.js";

const router = express.Router();
//post para registrar
//http://localhost:3001/api/libros/registerLibros
router.post("/registerLibros", auth, admint,libros.registerLibros);

//ruta para get
//http://localhost:3001/api/libros/listLibros
router.get("/listLibros", auth, admint, libros.listLibros);

//ruta para editar
//http://localhost:3001/api/libros/updateLibros
router.put("/updateLibros", auth, admint, libros.updateLibros);

//ruta para eliminar
//http://localhost:3001/api/libros/deleteLibros/id del libro a eliminar
router.delete("/deleteLibros/:_id", auth, admint, libros.deleteLibros);

//buscar por id
router.get("/findLibros/:_id", auth, libros.findLibros);
export default router;
