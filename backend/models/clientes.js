//importamos mongoose
import mongoose from "mongoose";

const clientesSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  registerDate: { type: Date, default: Date.now },
  dbStatus: Boolean,
});
//aqui mandamos a guardar
const clientes = mongoose.model("clientes", clientesSchema);

//exportamos la funcion
export default clientes;
