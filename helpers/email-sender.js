const sgMail = require("@sendgrid/mail");
require("dotenv").config();
sgMail.setApiKey(process.env.KEY_SEND);

exports.sendEmail = async (msg) =>
  await sgMail
    .send(msg)
    .catch((err) => console.log("Sendgrid err: ", err.response.body));
