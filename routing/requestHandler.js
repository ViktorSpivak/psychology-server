const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controllers");
const validation = require("../controllers/validation");

router.post("/request", validation.validateRequest, userController.createUser);
router.post(
  "/sendEmail",
  //  validation.validateRequest,
  userController.testUser
);
router.get("/requests", userController.getRequests);

module.exports = router;
