const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user_controllers");
const validation = require("../controllers/validation");

router.post(
  "/request",
  validation.validateRequest,
  userControllers.createUserRequest
);
router.post(
  "/sendEmail",
  //  validation.validateRequest,
  userControllers.testUser
);
router.get("/requests", userControllers.getRequests);
// router.post("/login", (req, res, next) => res.json(`Login:${req.body.name}`));
// router.post("/logout", (req, res, next) => res.json("logout"));

module.exports = router;
