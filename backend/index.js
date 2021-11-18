//Importamos las librerias
import express from "express";
import cors from "cors";
// la conexion a la base de datos
import db from "./db/db.js";

import dotenv from "dotenv";
//importamos la ruta
import libros from "./routes/libros.js";
import clientes from "./routes/clientes.js";
import proveedores from "./routes/proveedores.js";
import admin from "./routes/admin.js";


//esta linea cuando se ejecute el servidor nos inicializa las variable
dotenv.config();
//aqui ya nuestro backend  app es un servidor
const app = express();
//aqui estamos diciendo que solo vamos a recibir archivos json
app.use(express.json());
//aqui ya estamos usando las reglas de coneccion
app.use(cors());
// esta es toda la ruta que seguimos http://localhost:3001/api/libros/
app.use("/api/libros", libros)
// esta es toda la ruta que seguimos http://localhost:3001/api/clientes/
app.use("/api/clientes", clientes)
// esta es toda la ruta que seguimos http://localhost:3001/api/proveedores/
app.use("/api/proveedores", proveedores)

// esta es toda la ruta que seguimos http://localhost:3001/api/admin/
app.use("/api/admin", admin);

//aqui estamos conectandonos al puerto que declaramos en .env
app.listen(process.env.PORT, () =>{
  console.log("Backend server running on port: " + process.env.PORT)
});

//aqui ya nos conectamos a la base de datos
db.dbConnection();