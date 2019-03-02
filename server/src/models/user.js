const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Create a schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  wins: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 1000
  },
  rank: {
    type: String,
    default: "New"
  }
});

userSchema.set("toJSON", { getters: true });
userSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  delete obj.password;
  return obj;
};

userSchema.pre("save", async function(next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Create a model
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;
