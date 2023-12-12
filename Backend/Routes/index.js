const express = require("express");
const router = express.Router();

router.use("/auth", require("../components/auth/authRoute"));
router.use("/user", require("../components/Main/categoryRoute"));

module.exports = router;
