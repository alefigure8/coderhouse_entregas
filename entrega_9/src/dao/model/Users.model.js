import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  cartId: {
    type : mongoose.Schema.Types.ObjectId,
    ref: "Carts",
  },
  role: {
    type: String,
    require: true,
    default: "user",
  },
});

export const usersModels = mongoose.model("Users", userSchema);
