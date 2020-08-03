const express = require("express");
const router = express.Router();
// const actions = require("../controllers/actions");
const validations = require("../controllers/validation");
const authControllers = require("../auth/authControllers");

router.post("/signup", validations.validateSignup, authControllers.createUser);

router.post("/login", validations.validateLogin, authControllers.login);

router.post("/logout", validations.validateToken, authControllers.logout);

router.get(
  "/user/current",
  validations.validateToken,
  authControllers.currentUser
);

router.post(
  "/otp",
  validations.validateOtpCode,
  authControllers.handlerOtpCode
);

// router.post("/login", validations.validateSignIn, userController.login);

// router.post("/logout", userController.validateToken, userController.logout);

module.exports = router;
