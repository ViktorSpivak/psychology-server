const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const nodemailer = require("nodemailer");
sgMail.setApiKey(process.env.KEY_SEND);

exports.sendEmail = async (msg) => await sgMail.send(msg);
exports.sendEmailNodeMailer = async (msg) => {
  let testEmailAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testEmailAccount.user,
      pass: testEmailAccount.pass,
    },
  });

  let result = await transporter.sendMail({
    from: "server psychology",
    to: "pointed.s@gmail.com",
    subject: "Message from clients",
    text: "This message was sent from Node js server.",
    html: `This <i>${msg}</i> was sent from <strong>server psychology</strong> server.`,
  });
  console.log("result:", result);
  console.log(testEmailAccount.user, testEmailAccount.pass);
};
