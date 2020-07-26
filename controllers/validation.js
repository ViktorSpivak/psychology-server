const Joi = require("@hapi/joi");

class Validations {
  validateRequest = (req, res, next) => {
    const rules = Joi.object({
      firstName: Joi.string().required(),
      email: Joi.string().required(),
      lastName: Joi.string(),
      text: Joi.string().required(),
    });
    const validationResult = rules.validate(req.body);
    if (validationResult.error) {
      return res.status(422).json({ message: "Missing required field" });
    }
    next();
  };
}
module.exports = new Validations();
