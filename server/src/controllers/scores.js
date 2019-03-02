const User = require("../models/user");

exports.list = async (req, res) => {
  const users = await User.find().sort("-rating");
  res.json(users);
};
