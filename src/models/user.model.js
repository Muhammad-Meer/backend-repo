const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userscheema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email is required for creating a user"],
      trim: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9._%+-]+$/, ""],
      unique: [true, "email is already exist"],
    },

    name: {
      type: String,
      required: [true, "email is required for creating a user"],
    },

    name: {
      type: String,
      required: [true, "email is required for creating a user"],
      minlenght: [6, "password should contain more than 6 charector"],
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userscheema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const hashpassword = bcrypt.hash(this.password, 10)
});
