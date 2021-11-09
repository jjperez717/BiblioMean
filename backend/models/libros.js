//importamos mongoose
import mongoose from "mongoose";

const libroSchema = new mongoose.Schema({
  name: String,
  author: String,
  yearPublication: String,
  registerDate: { type: Date, default: Date.now },
  pages: String,
  gender: String,
  price: Number,
});
//aqui mandamos a guardar
const libros = mongoose.model("libros", libroSchema);


//exportamos la funcion
export default libros;