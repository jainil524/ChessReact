const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
  name: String,
  email: {type: String, required: true, unique: true },
  password: {type: String, required: true}
});

const UserSchema = mongoose.model("users",UserModelSchema);

module.exports = UserSchema;