import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is requiered"],
  },

  email: {
    type: String,
    required: [true, "Email is requiered"],
    unique: true,
  },

  emailValidated: {
    type: Boolean,
    default: false,
  },

  password: {
    type: String,
    required: [true, "Password is requiered"],
  },
  img: { type: String },
  role: {
    type: [String],
    default: ["USER_ROLE"],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete ret._id;
    delete ret.password;
  },
});

export const UserModel = model("User", userSchema);
