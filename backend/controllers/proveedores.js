//importamos la estructura que esta en models
import proveedores from "../models/proveedores.js";

//creamos la funcion
const registerProveedores = async (req, res) => {
  //aqui validamos si los datos vienen vacios o no solo para datos obligatorios
  if (!req.body.name || !req.body.address)
    return res.status(400).send("incomplete data");
  //validamos que el proveedor existe o no
  const existingProveedores = await proveedores.findOne({
    name: req.body.name,
  });
  if (existingProveedores)
    return res.status(400).send("the proveedor already exist");

  const proveedoresSchema = new proveedores({
    //aqui mandamos los datos
    name: req.body.name,
    address: req.body.address,
  });
  //aqui guardamos la informacion
  const result = await proveedoresSchema.save();
  //si esto no funciona muestra este mensaje
  if (!result) return res.status(400).sed("Failed to register proveedor");
  // si funciona mostramos el result
  return res.status(200).send({ result });
};

// funcion para  listar  GET
const listproveedores = async (req, res) => {
  //aqui va a ir a mongo y traera todo lo que hay en la coleccion
  const proveedoresSchema = await proveedores.find();
  //si la consulta viene vacio o null  nos mostrara este mensaje que el rol esta vacio el .lengt nos valida si el array esta vacio
  if (!proveedoresSchema || proveedoresSchema.length == 0)
    //el mensaje se puede enviar como un objeto tambien ({error "Empty proveedores list"})
    return res.status(400).send("Empty proveedores list");
  //si encuentra datos muestre este mensaje con los datos
  return res.status(200).send({ proveedoresSchema });
};

//funcion para editar proveedor
const updateProveedores = async (req, res) => {
  if (!req.body.name || !req.body.address)
    return res.status(400).send("Icomplete data");
  //validamos que el proveedor existe o no
  const existingProveedores = await proveedores.findOne({
    name: req.body.name,
    address: req.body.address,
  });
  if (existingProveedores)
    return res.status(400).send("the proveedor already exist");
    //busco el id que esta en el json que esta mostrando los datos y tambien se colocal entre {los datos que se editaran}
  const proveedoresUpdate = await proveedores.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    address: req.body.address,
  });
  //usamos operador ternario
  return !proveedoresUpdate
    ? res.status(400).send("Error editing proveedor")
    : res.status(200).send(proveedoresUpdate);
};

//funcion para eliminar proveedor
const deleteProveedores = async (req, res) => {
//utilizamos el findByIdAndDelete porque este lo elimina de una y el remove puede dejar espacio en memoria
  const proveedoresDelete = await proveedores.findByIdAndDelete({
    _id: req.params["_id"],
  });
//si se cumple o no nos mostrara uno de estos mensajes
  return !proveedoresDelete
    ? res.status(400).send("proveedor no found")
    : res.status(200).send("proveedor delete");
};

//cuando es una funcion lo exportamos con las llaves{}
export default {
  registerProveedores,
  listproveedores,
  updateProveedores,
  deleteProveedores,
};
