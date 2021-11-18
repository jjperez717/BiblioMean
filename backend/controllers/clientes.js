//importamos la estructura que esta en models
import clientes from "../models/clientes.js";
//importamos la libreria para encriptar
import bcrypt from "bcrypt";
//importamos el jsonwebtoken
import jwt from "jsonwebtoken";
import moment from "moment";

//creamos la funcion
const registerClientes = async (req, res) => {
  //aqui validamos si los datos vienen vacios o no solo para datos obligatorios
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("incomplete data");
  //validamos que el cliente existe o no
  const existingCliente = await clientes.findOne({ email: req.body.email });
  if (existingCliente) return res.status(400).send("the cliente already exist");

  //aqui encriptamos la clave
  const hash = await bcrypt.hash(req.body.password, 10);
//aqui creamos la estructura de como se va a guardar
  const Register = new clientes({
    //aqui mandamos los datos
    name: req.body.name,
    email: req.body.email,
    password: hash,
    dbStatus: true,
  });
  const result = await Register.save();
  try {
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: result._id,
          name: result.name,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(400).send({ message: "Register error" });
  }
};
// funcion para  listar  GET
const listClientes = async (req, res) => {
  //aqui va a ir a mongo y traera todo lo que hay en la coleccion
  const clientesSchema = await clientes.find();
  //si la consulta viene vacio o null  nos mostrara este mensaje que el rol esta vacio el .lengt nos valida si el array esta vacio
  if (!clientesSchema || clientesSchema.length == 0)
    //el mensaje se puede enviar como un objeto tambien ({error "Empty cliente list"})
    return res.status(400).send("Empty cliente list");
  //si encuentra datos muestre este mensaje con los datos
  return res.status(200).send({ clientesSchema });
};

//funcion para editar clientes
const updateClientes = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send("Icomplete data");
  //aqui valida que si son iguales dice que ya existe pero si uno es diferente lo deja cambiar utilizamos el findOne porque sera un solo json
  const existingClientes = await clientes.findOne({
    name: req.body.name,
    email: req.body.email,
  });
  if (existingClientes)
    return res.status(400).send("the cliente already exist");
  //busco el id que esta en el json que esta mostrando los datos y tambien se colocal entre {los datos que se editaran}
  const clientesUpdate = await clientes.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    email: req.body.email,
  });
  //usamos operador ternario
  return !clientesUpdate
    ? res.status(400).send("Error editing cliente")
    : res.status(200).send(clientesUpdate);
};

//funcion para eliminar clientes
const deleteClientes = async (req, res) => {
  //utilizamos el findByIdAndDelete porque este lo elimina de una y el remove puede dejar espacio en memoria
  const clientesDelete = await clientes.findByIdAndDelete({
    _id: req.params["_id"],
  });
  return !clientesDelete
    ? res.status(400).send("cliente no found")
    : res.status(200).send("cliente delete");
};
//login
const login = async (req, res) => {
  if (!req.body.email || !req.body.password)
    return re.status(400).send({ message: "Incomplete data" });
  //validemos que exista el email si existe trae ese json y lopone dentro de email
  const clienteLogin = await clientes.findOne({ email: req.body.email });
  if (!clienteLogin)
    return res.status(400).send({ message: "Wrong email or password" });

  //valida que el password del json o base de datos sea igual al del body que ingresaron
  const hash = await bcrypt.compare(req.body.password, clienteLogin.password);
  if (!hash)
    return res.status(400).send({ message: "Wrong email or password" });
  //se compara las contraseñas

  try {
    //aqui vamos a general el jsonwebtoken
    return res.status(200).json({
      token: jwt.sign(
        {
          _id: clienteLogin._id,
          name: clienteLogin.name,
          roleId: clienteLogin.roleId,
          iat: moment().unix(),
        },
        process.env.SK_JWT
      ),
    });
  } catch (e) {
    return res.status(400).send({ message: "Login error" });
  }
};

//cuando es una funcion lo exportamos con las llaves{}
//exportar tambien la funcion de get listCliente
export default { registerClientes, listClientes, updateClientes, deleteClientes, login };
