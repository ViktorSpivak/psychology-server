const Joi = require("@hapi/joi");
const authActions = require("../auth/authActions");
const actions = require("../controllers/actions");
const shortId = require("shortid");
const { sendEmail } = require("../helpers/email-sender");

class Validations {
  validateRequest = (req, res, next) => {
    const rules = Joi.object({
      name: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().required(),
      text: Joi.string().required(),
    });
    const validationResult = rules.validate(req.body);
    if (validationResult.error) {
      return res.status(422).json({ message: "Missing required field" });
    }
    next();
  };
  validateLogin = (req, res, next) => {
    const rules = Joi.object({
      name: Joi.string().required(),
      password: Joi.string().required(),
    });
    const validationResult = rules.validate(req.body);
    if (validationResult.error) {
      return res.status(422).json({ message: "Missing required field" });
    }
    next();
  };
  validateSignup = (req, res, next) => {
    const rules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    const validationResult = rules.validate(req.body);
    if (validationResult.error) {
      return res.status(422).json({ message: "Missing required field" });
    }
    // res.json("validateSignup ok");
    next();
  };
  validateOtpCode = async (req, res, next) => {
    try {
      const { email } = req.query;
      const { otpCode } = req.body;
      const user = await actions.findEmail(email);
      const id = user._id;
      const isOtpCode = user.otpCode === otpCode;

      if (user && isOtpCode) {
        res.send("Verification is complete!");
        req.user = user;
        next();
      } else {
        const newOtpCode = shortId();
        await actions.findAndUpdate(id, { otpCode: newOtpCode });
        const msg = {
          to: email,
          from: "spivakmailbox@gmail.com",
          subject: "Verification email",
          html: `<p>For complete verification  enter the code ${newOtpCode} again :)</p><form action='psychology-server.herokuapp.com/auth/otp?email=${email}' method="post"><input  name="otpCode" placeholder="Enter code"></input><button type="submit">Click to confirm</button></form>`,
        };
        sendEmail(msg);
        return res.send(
          "Error verification!:( Please, try again in new email !"
        );
      }
    } catch (error) {
      next(error);
    }
  };

  validateToken = async (req, res, next) => {
    try {
      const token = req.get("authorization").replace("Bearer ", "");

      let userId;
      try {
        userId = authActions.verifyToken(token).id;
        const user = await actions.findById(userId);

        if (!user) {
          return res.status(401).json({ message: "Not authorized" });
        }

        if (user.token !== token) {
          return res.status(401).json({ message: "Not authorized" });
        }

        req.user = user;
        req.token = token;
        next();
      } catch (error) {
        return res.status(401).json({ message: "Not authorized" });
      }
    } catch (error) {
      next(error);
    }
  };
}
module.exports = new Validations();
