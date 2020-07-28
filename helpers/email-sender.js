const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const nodemailer = require("nodemailer");
// sgMail.setApiKey(process.env.KEY_SEND);

exports.sendEmail = async (msg) => await sgMail.send(msg);
exports.sendEmailNodeMailer = async (msg) => {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "spivakmailbox@gmail.com",
    //     pass: "yourpassword",
    //   },
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "spivakmailbox@gmail.com", // sender address
    to: "pointed.s@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
  // let testAccount = await nodemailer.createTestAccount();
  // // console.log(testEmailAccount.user, testEmailAccount.pass);
  // let transporter = nodemailer.createTransport({
  //   host: "smtp.ethereal.email",
  //   port: 587,
  //   secure: false,
  //   auth: {
  //     user: testAccount.user,
  //     pass: testAccount.pass,
  //   },
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
  // });
  // let result = await transporter.sendMail({
  //   from: '"Fred Foo 👻" <foo@example.com>', // sender address
  //   to: "pointed.s@gmail.com", // list of receivers
  //   subject: "Hello ✔", // Subject line
  //   text: "Hello world?", // plain text body
  //   html: "<b>Hello world?</b>", // html body
  // });
  // await transporter.sendMail({
  //   from: "server psychology",
  //   to: "pointed.s@gmail.com, spivakmailbox@gmail.com",
  //   subject: "Message from clients",
  //   text: "This message was sent from Node js server.",
  //   html: `This <i>${msg}</i> was sent from <strong>server psychology</strong> server.`,
  // });
  // console.log("result:", result);
};
