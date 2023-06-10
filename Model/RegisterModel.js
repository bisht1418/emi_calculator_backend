const { Schema, model } = require("mongoose");
const registerSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

const registerModel = model("register", registerSchema);

module.exports = { registerModel };
