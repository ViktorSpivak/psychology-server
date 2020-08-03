const itemModel = require("../models/model");

class Controller {
  findEmail = (value) => itemModel.itemModelAdmin.findOne({ email: value });
  writeUser = (email, name, phone, text) =>
    itemModel.itemModelPost.create({
      email,
      name,
      phone,
      text,
    });
  createUser = (passwordHash, email, name, otpCode) =>
    itemModel.itemModelAdmin.create({
      name,
      email,
      password: passwordHash,
      otpCode,
    });
  findAll = (page, limit, sort) => {
    const options = limit && { page, limit, sort };
    return itemModel.itemModelPost.paginate({}, options);
  };

  findAndUpdate = (id, newProperties) =>
    itemModel.itemModelAdmin.findByIdAndUpdate(
      id,
      { $set: newProperties },
      { new: true }
    );
  findAndDelete = (id) => itemModel.itemModelPost.findOneAndDelete(id);
  findById = (id) => itemModel.itemModelPost.findById(id);
}
module.exports = new Controller();
