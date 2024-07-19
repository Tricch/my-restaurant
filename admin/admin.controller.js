import express from "express";
import Admin from "./admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// * register admin
router.post("/admin/register", async (req, res) => {
  // extract new admin from req.body
  const newAdmin = req.body;

  // check if admin with provided email already exist
  const admin = await Admin.findOne({ email: newAdmin.email });

  // if admin already exists, throw error
  if (admin) {
    return res.status(400).json({ message: "Email already exists." });
  }

  // hash password
  const plainPassword = newAdmin.password;
  const saltRound = 10; // to add randomness
  const hashedPassword = await bcrypt.hash(plainPassword, saltRound);

  // replace plainPassword with hashedPassword
  newAdmin.password = hashedPassword;

  // insert admin
  await Admin.create(newAdmin);

  // send res
  return res.status(200).send("Admin is registered successfully.");
});

// * login admin
router.post("/admin/login", async (req, res) => {
  // extract login credentials from req.body
  const loginCredentials = req.body;

  // find admin using email from login Credential
  const requiredAdmin = await Admin.findOne({ email: loginCredentials.email });

  // if not admin, throw error
  if (!requiredAdmin) {
    return res.status(404).send({ message: "Invalid Credentials." });
  }

  // check for password match
  const plainPassword = loginCredentials.password;
  const hashedPassword = requiredAdmin.password;
  const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);

  // if not password match, throw error
  if (!isPasswordMatch) {
    return res.status(404).send({ message: "Invalid Credentials." });
  }

  // generate token
  const payload = { email: requiredAdmin.email };
  const secretKey = "aLDSfkja;ldskgja;lskdjf";
  const token = jwt.sign(payload, secretKey);

  // hide password
  requiredAdmin.password = undefined;

  // send res
  return res
    .status(400)
    .send({
      message: "success",
      accessToken: token,
      adminDetails: requiredAdmin,
    });
});

export default router;
