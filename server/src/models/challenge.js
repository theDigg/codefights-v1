const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  body: { type: String, required: true },
  funcName: { type: String, required: true },
  params: { type: String, required: true },
  tests: { type: Array, required: true },
  testDescriptions: { type: Array, required: true }
});

challengeSchema.set("toJSON", { getters: true, virtuals: true });
challengeSchema.options.toJSON.transform = (doc, ret) => {
  const obj = { ...ret };
  delete obj._id;
  delete obj.__v;
  return obj;
};

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;
