const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;
mongoose.set("useFindAndModify", false);
const itemSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  text: String,
  date:
});
itemSchema.plugin(mongoosePaginate);
const itemModel = mongoose.model("clients+requests", itemSchema);
module.exports = itemModel;
