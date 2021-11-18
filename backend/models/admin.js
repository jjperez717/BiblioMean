import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  registerDate: { type: Date, default: Date.now },
  dbStatus: Boolean,
});
//aqui mandamos a guardar
const user = mongoose.model("admins", adminSchema);
//exportamos el modelo
export default user;
