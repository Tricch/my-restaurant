import mongoose from "mongoose";

// set schema/structure
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  price: Number,
  ingredients: [String],
  servingSize: String,
  description: String,
});

// create tabel/model
const Food = mongoose.model("Food", foodSchema);

export default Food;
