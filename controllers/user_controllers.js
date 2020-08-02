const path = require("path");
const shortId = require("shortid");
const authActions = require("./authActions");
const actions = require("./actions");
// const multer = require("multer");
const { sendEmail } = require("../helpers/email-sender");

exports.testUser = async (req, res, next) => {
  try {
    const msg = {
      to: "pointed.s@gmail.com",
      from: "spivakmailbox@gmail.com",
      subject: "Request from user",
      html: `<h1>Text from user<h1><p>Name: ${name}</p><p>Email:${email}</p><p>${text}</p>`,
    };

    sendEmail(msg).then((err) => console.log("Sendgrid error:", err));
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

exports.createUserRequest = async (req, res, next) => {
  try {
    const { name, email, phone, text } = req.body;

    const user = await actions.writeUser(email, name, phone, text);
    const msg = {
      to: "pointed.s@gmail.com",
      from: "spivakmailbox@gmail.com",
      subject: "Request from user",
      html: `<h1>Massage from client<h1><p>Name: ${name}</p><p>Phone: ${phone}</p><p>Email: ${email}</p><p> Massage: ${text}</p>`,
    };
    sendEmail(msg)
      .then((res) => console.log("Sendgrid response: ", res))
      .catch((err) => console.log("Sendgrid error: ", err));

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

    return res.json("data");
  } catch (error) {
    next(error);
  }
};
