const path = require("path");

const fsPromises = require("fs").promises;
const shortId = require("shortid");
// const authActions = require("./authActions");
const actions = require("./actions");
// const multer = require("multer");

const { sendEmail } = require("../helpers/email-sender");

exports.testUser = (req, res, next) => {
  try {
    console.log(req.body);
    res.json(req.body);
    res.end(`<p>Hello</p>`);
  } catch (error) {
    next(error);
  }
};
exports.createUser = async (req, res, next) => {
  try {
    const { firstName, email, lastName, text } = req.body;
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
    const user = await actions.writeUser(
      // passwordHash,
      email,
      firstName,
      lastName,
      text
      // subscription,
      // avatarURL,
      // otpCode
    );
    // const token = authActions.createToken(user._id);
    // await actions.findAndUpdate(user._id, { token });
    const msg = {
      to: "spivakmailbox@gmail.com",
      from: "bill",
      subject: "Request from user",
      html: `<h1>Text from user<h1><p>Name: ${
        (firstName, lastName)
      }</p><p>Email:${email}</p><p>${text}</p>`,
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
