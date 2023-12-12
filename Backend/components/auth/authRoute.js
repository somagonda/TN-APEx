const express = require("express");
const router = express.Router();
const authController = require("./authController");
const verifyToken = require("../../middlewares/auth");

router.post("/register", authController.registerUserController);

router.put(
  "/updateUserData",
  verifyToken,
  authController.updatedUserController
);
module.exports = router;
