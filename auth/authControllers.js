const path = require("path");

const fsPromises = require("fs").promises;
const shortId = require("shortid");
const authActions = require("./authActions");
const actions = require("../controllers/actions");
// const multer = require("multer");
// const { createAvatar } = require("../helpers/avatar-builder");
const { sendEmail } = require("../helpers/email-sender");

exports.createUser = async (req, res, next) => {
  try {
    const { password, email, name } = req.body;
    const isEmail = await actions.findEmail(email);
    if (!isEmail) {
      const otpCode = shortId();
      const passwordHash = await authActions.passwordHash(password);
      const user = await actions.createUser(passwordHash, email, name, otpCode);
      const token = authActions.createToken(user._id);
      await actions.findAndUpdate(user._id, { token });
      const msg = {
        to: email,
        from: "spivakmailbox@gmail.com",
        subject: "Verification email",
        html: `<p>For complete verification enter the code ${otpCode}</p><form action='http://localhost:99/auth/otp?email=${email}' method="post"><input  name="otpCode" placeholder="Enter code"></input><button type="submit">Click to confirm</button></form>`,
      };
      sendEmail(msg);
      return res.status(201).json({
        token,
        user: {
          email: user.email,
        },
      });
    } else {
      return res.status(400).json({
        message: "Email in use",
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await actions.findEmail(email);
    if (!user) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }
    const isPasswordValid = await authActions.validationPassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }
    const token = authActions.createToken(user._id);
    await actions.findAndUpdate(user._id, { token: token });
    return res.status(200).send(token);
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const user = await actions.findById(req.user._id);
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    await actions.findAndUpdate(req.user._id, { token: null });
    return res.status(200).json({
      message: "Logout success",
    });
  } catch (error) {
    next(error);
  }
};
exports.currentUser = async (req, res, next) => {
  try {
    const user = await actions.findById(req.body.id);
    const { email } = user;
    return res.status(200).json({
      email: email,
    });
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
    next(error);
  }
};
exports.handlerOtpCode = async (req, res, next) => {
  try {
    const id = req.user._id;
    await actions.findAndUpdate(id, { registered: true });
  } catch (error) {
    next(error);
  }
};
