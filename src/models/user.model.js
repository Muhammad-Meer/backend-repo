const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
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
      required: [true, "Name is required for creating a user"],
    },
    password: {
      type: String,
      required: [true, "Password is required for creating a user"],
      minlength: [6, "Password should contain at least 6 characters"],
      select: false, // important, so password is not returned by default
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  console.log("Saving user, password before hash:", this.password);

  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);

  console.log("Password after hash:", this.password);

  // next();
});

// Method to compare password for login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;