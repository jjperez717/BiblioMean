import admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

//funcion para registrar
const registerAdmin = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    return res.status(400).send({ message: "Incomplete data" });

  const existingAdmin = await admin.findOne({ email: req.body.email });
  if (existingAdmin) return res.status(400).send({ message: "the admin already exist" });
  //aqui encryptamos la contraseña
  const passHash = await bcrypt.hash(req.body.password, 10);
  //estructura para guardar
  const Register = new admin({
    name: req.body.name,
    email: req.body.email,
    password: passHash,
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

//listar
const listAdmin = async (req, res) => {
  const adminSchema = await admin.find();
  if (!adminSchema || adminSchema.length == 0)
    return res.status(400).send({ message: "Empty cliente list" });
  return res.status(200).send({ adminSchema });
};

//login
const login = async (req, res) => {
    if (!req.body.email || !req.body.password)
      return re.status(400).send({ message: "Incomplete data" });
    //validemos que exista el email si existe trae ese json y lopone dentro de email
    const adminLogin = await admin.findOne({ email: req.body.email });
    if (!adminLogin)
      return res.status(400).send({ message: "Wrong email or password" });
  
    //valida que el password del json o base de datos sea igual al del body que ingresaron
    const hash = await bcrypt.compare(req.body.password, adminLogin.password);
    if (!hash)
      return res.status(400).send({ message: "Wrong email or password" });
    //se compara las contraseñas
  
    try {
      //aqui vamos a general el jsonwebtoken
      return res.status(200).json({
        token: jwt.sign(
          {
            _id: adminLogin._id,
            name: adminLogin.name,
            roleId: adminLogin.roleId,
            iat: moment().unix(),
          },
          process.env.SK_JWT
        ),
      });
    } catch (e) {
      return res.status(400).send({ message: "Login error" });
    }
  };
export default {registerAdmin, listAdmin, login};
