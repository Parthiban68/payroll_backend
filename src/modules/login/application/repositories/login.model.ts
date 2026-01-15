import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  mobile_number: { type: Number, require: true },
  password: { type: String, require: true },
  role : {type : String, require : true},
  country: { type: String, require: true },
  state: { type: String, require: true },
  city: { type: String, require: true },
  pincode: { type: Number, require: true },
});

export const LoginModel  = model("login", userSchema);
