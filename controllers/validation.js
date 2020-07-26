const Joi = require("@hapi/joi");

class Validations {
  validateRequest = (req, res, next) => {
    const rules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
      text: Joi.string().required(),
    });
    const validationResult = rules.validate(req.body);
    if (validationResult.error) {
      return res.status(421).json({ message: "Missing required field" });
    }
    next();
  };
}
module.exports = new Validations();
