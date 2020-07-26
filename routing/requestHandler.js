const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controllers");
const validation = require("../controllers/validation");

router.get("/request", validation.validateRequest, userController.createUser);
module.exports = router;
