//importamos el servidor express y el controlador
import express from "express";
import libros from "../controllers/libros.js";

const router = express.Router()
//post para registrar
//http://localhost:3001/api/libros/registerLibros
router.post("/registerLibros", libros.registerLibros);

//ruta para get
//http://localhost:3001/api/libros/listLibros
router.get("/listLibros", libros.listLibros);

//ruta para editar
//http://localhost:3001/api/libros/updateLibros
router.put("/updateLibros", libros.updateLibros);

//ruta para eliminar
//http://localhost:3001/api/libros/deleteLibros/id del libro a eliminar
router.delete("/deleteLibros/:_id", libros.deleteLibros);

export default router;