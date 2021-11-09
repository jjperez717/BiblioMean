//importamos el servidor express y el controlador
import express from "express";
import proveedores from "../controllers/proveedores.js";

const router = express.Router()
//post para registrar
//http://localhost:3001/api/proveedores/registerProveedores
router.post("/registerProveedores", proveedores.registerProveedores);

//ruta para get
//http://localhost:3001/api/proveedores/listproveedores
router.get("/listProveedores", proveedores.listproveedores);

//ruta para editar
//http://localhost:3001/api/proveedores/updateProveedores
router.put("/updateProveedores", proveedores.updateProveedores);

//ruta para eliminar
//http://localhost:3001/api/proveedores/deleteProveedores/el id del proveedor a eliminar
router.delete("/deleteProveedores/:_id", proveedores.deleteProveedores);

export default router;