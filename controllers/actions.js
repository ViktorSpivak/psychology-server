const itemModel = require("../models/model");

class Controller {
  // findEmail = (value) => itemModel.findOne({ email: value });
  writeUser = (email, name, phone, text) =>
    itemModel.create({
      email,
      name,
      phone,
      text,
    });

  findAll = (page, limit, sort) => {
    const options = limit && { page, limit, sort };
    return itemModel.paginate({}, options);
  };

  // findAndUpdate = (id, newProperties) =>
  //   itemModel.findByIdAndUpdate(id, { $set: newProperties }, { new: true });
  // findAndDelete = (id) => itemModel.findOneAndDelete(id);
  // findById = (id) => itemModel.findById(id);
}
module.exports = new Controller();
