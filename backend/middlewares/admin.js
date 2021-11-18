import admin from "../models/admin.js";

const admint = async (req, res, next) => {
  const admintRole = await admin.findById(req.user._id);
  if (!admintRole) return res.status(400).send({ message: "admin no found" });
  return admintRole.name === "admin"
    ? next()
    : res.status({ message: "Unauthorized user" });
};

export default admint;
