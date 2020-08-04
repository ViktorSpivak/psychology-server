const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;
mongoose.set("useFindAndModify", false);
const itemSchemaPost = new Schema({
  email: String,
  name: String,
  phone: String,
  text: String,
});
itemSchemaPost.plugin(mongoosePaginate);
exports.itemModelPost = mongoose.model("clients+requests", itemSchemaPost);

const itemSchemaAdmin = new Schema({
  email: String,
  name: String,
  password: String,
  token: String,
  otpCode: String,
  registered: { type: Boolean, default: false },
});
exports.itemModelAdmin = mongoose.model("adminUsers", itemSchemaAdmin);
