//importamos mongoose
import mongoose from "mongoose";

//creamos la funcion que conecta con mongodb
//agregamos el async y el await para que nuestro proyecto sea asincrono
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //mandamos un mensaje confirmando que se conecto a mongodb
    console.log("Connection with MongoDB: ok");
  } catch (e) {
    console.log("Error connectiong to MongoDB \n" + e);
  }
};
//exportamos esta funcion
export default {dbConnection};