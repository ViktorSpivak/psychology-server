const path = require("path");

const fsPromises = require("fs").promises;
const shortId = require("shortid");
// const authActions = require("./authActions");
const actions = require("./actions");
// const multer = require("multer");

const { sendEmail } = require("../helpers/email-sender");

exports.testUser = (req, res, next) => {
  try {
    // console.log(req);
    res.json(req.body);
  } catch (error) {
    next(error);
  }
};
exports.getRequests = async (req, res, next) => {
  try {
    const { page, limit, sort } = req.query;
    const item = await actions.findAll(page, limit, sort);
    return res.status(200).json(item.docs);
  } catch (error) {
    next(error);
  }
};
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, phone, text } = req.body;
    // const isEmail = await actions.findEmail(email);
    // if (!isEmail) {
    // const userAvatar = await createAvatar(email);
    // const id = shortId();
    // const otpCode = id;
    // const avatarFileName = `${id}__${name}.png`;
    // const avatarPath = path.join(
    //   __dirname,
    //   `../public/images/${avatarFileName}`
    // );
    // await fsPromises.writeFile(avatarPath, userAvatar);
    // const avatarURL = `http://localhost:3001/images/${avatarFileName}`;

    // const passwordHash = await authActions.passwordHash(password);
    const user = await actions.writeUser(email, name, phone, text);
    // const token = authActions.createToken(user._id);
    // await actions.findAndUpdate(user._id, { token });
    const msg = {
      to: "spivakmailbox@gmail.com",
      from: "bill",
      subject: "Request from user",
      html: `<h1>Text from user<h1><p>Name: ${name}</p><p>Email:${email}</p><p>${text}</p>`,
    };
    // sendEmail(msg);
    return res.json("ok");
    // console.log(result);
    // res.redirect("/api/opt");
    // return res.status(201).json({
    //   token,
    //   user: {
    //     email: user.email,
    //     subscription: user.subscription,
    //   },
    // });
    // } else {
    //   return res.status(400).json({
    //     message: "Email in use",
    //   });
    // }
  } catch (error) {
    next(error);
  }
  // console.log("ok");
  // res.status(400).json({
  //   message: "ok",
  // });
};
