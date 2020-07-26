const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;
mongoose.set("useFindAndModify", false);
const itemSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  text: String,
});
itemSchema.plugin(mongoosePaginate);
const itemModel = mongoose.model("clients+Requests", itemSchema);
module.exports = itemModel;
