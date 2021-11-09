//importamos mongoose
import mongoose from "mongoose";

const proveedoresSchema = new mongoose.Schema({
  name: String,
  address: String,
  registerDate: { type: Date, default: Date.now },
});
//aqui lo mandamos a guardar la coleccion  que se llamara  proveedores
const proveedores = mongoose.model("proveedores", proveedoresSchema);
//exportamos la funcion
export default proveedores;
