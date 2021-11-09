//importamos la estructura que esta en models
import libros from "../models/libros.js";

//creamos la funcion
const registerLibros = async (req, res) => {
  //aqui validamos si los datos vienen vacios o no solo para datos obligatorios
  if (
    !req.body.name ||
    !req.body.author ||
    !req.body.yearPublication ||
    !req.body.pages ||
    !req.body.gender ||
    !req.body.price
  )
    return res.status(400).send("incomplete data");
  //validamos que el libro existe
  const existingLibros = await libros.findOne({ name: req.body.name });
  if (existingLibros) return res.status(400).send("the book already exist");

  const librosSchema = new libros({
    //aqui mandamos los datos
    name: req.body.name,
    author: req.body.author,
    yearPublication: req.body.yearPublication,
    pages: req.body.yearPublication,
    gender: req.body.gender,
    price: req.body.price,
  });
  //aqui guardamos la informacion
  const result = await librosSchema.save();
  //si esto no funciona muestra este mensaje
  if (!result) return res.status(400).sed("Failed to register book");
  // si funciona mostramos el result
  return res.status(200).send({ result });
};

// funcion para  listar  GET
const listLibros = async (req, res) => {
  //aqui va a ir a mongo y traera todo lo que hay en la coleccion
  const librosSchema = await libros.find();
  //si la consulta viene vacio o null  nos mostrara este mensaje que el rol esta vacio el .lengt nos valida si el array esta vacio
  if (!librosSchema || librosSchema.length == 0)
    //el mensaje se puede enviar como un objeto tambien ({error "Empty book list"})
    return res.status(400).send("Empty book list");
  //si encuentra datos muestre este mensaje con los datos
  return res.status(200).send({ librosSchema });
};

//funcion para editar libros
const updateLibros = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.author ||
    !req.body.yearPublication ||
    !req.body.pages ||
    !req.body.gender ||
    !req.body.price
  )
    return res.status(400).send("Icomplete data");
  //aqui valida que si son iguales dice que ya existe pero si uno es diferente lo deja cambiar utilizamos el findOne porque sera un solo json
  const existinglibros = await libros.findOne({
    name: req.body.name,
    author: req.body.author,
  });
  if (existinglibros) return res.status(400).send("the book already exist");
  //busco el id que esta en el json que esta mostrando los datos y tambien se colocal entre {los datos que se editaran}
  const librosUpdate = await libros.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    author: req.body.author,
  });
  //usamos operador ternario
  return !librosUpdate
    ? res.status(400).send("Error editing book")
    : res.status(200).send(librosUpdate);
};

//funcion para eliminar libros
const deleteLibros = async (req, res) => {
  //utilizamos el findByIdAndDelete porque este lo elimina de una y el remove puede dejar espacio en memoria
  const librosDelete = await libros.findOneAndDelete({
    _id: req.params["_id"],
  });

  return !librosDelete
    ? res.status(400).send("book no found")
    : res.status(200).send("book delete");
};
//cuando es una funcion lo exportamos con las llaves{}
export default { registerLibros, listLibros, updateLibros, deleteLibros };
