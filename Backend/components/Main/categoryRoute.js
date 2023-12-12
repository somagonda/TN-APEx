const express = require("express");
const router = express.Router();
const categoryController = require("./categoryController");
const verifyToken = require("../../middlewares/auth");

router.get("/categories", categoryController.Categories);
router.get("/getAllCategories", categoryController.getAllCategories);

router.post("/categoryDetails", categoryController.getCategoryDetails);

module.exports = router;
