const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userscheema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "email is required for creating a user"],
    },

    password: {
      type: String,
      required: [true, "email is required for creating a user"],
      minlength: [6, "password should contain more than 6 charector"],
      // select: false,
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

  const hashpassword = await bcrypt.hash(this.password, 10);
  this.password = hashpassword;
});

userscheema.methods.comparepassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const usermmodel = mongoose.model("user", userscheema);

module.exports = usermmodel;
