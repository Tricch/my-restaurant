import mongoose from "mongoose";

// set schema/structure
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    maxlength: 60,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 60,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 60,
    trim: true,
  },
});

// create table/model/structure
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
