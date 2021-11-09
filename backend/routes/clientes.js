//importamos el servidor express y el controlador
import express from "express";
import clientes from "../controllers/clientes.js";

const router = express.Router()
//post para registrar
//http://localhost:3001/api/clientes/registerClientes
router.post("/registerClientes", clientes.registerClientes);

//ruta para get
//http://localhost:3001/api/clientes/listClientes
router.get("/listClientes", clientes.listClientes);

//ruta para editar
//http://localhost:3001/api/clientes/updateClientes
router.put("/updateClientes", clientes.updateClientes);

//ruta para eliminar
//http://localhost:3001/api/clientes/deleteClientes/id del cliente a eliminar
router.delete("/deleteClientes/:_id", clientes.deleteClientes);
export default router;