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
// module.exports = itemModelPost;

const itemSchemaAdmin = new Schema({
  email: String,
  name: String,
  password: String,
  // subscription: {
  //   type: String,
  //   enum: ["free", "pro", "premium"],
  //   default: "free",
  // },
  token: String,
  otpCode: String,
  registered: { type: Boolean, default: false },
});
exports.itemModelAdmin = mongoose.model("adminUsers", itemSchemaAdmin);
