const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const DbConnection = require("../../db");
const { v4: uuidv4 } = require("uuid");
const RegisterValidation = require("./Validation");
require("dotenv").config();
const secretKey = process.env.Secret_Access_Key;

module.exports = {
  registerUserController: async (req, res) => {
    const { full_name, mobile, city, profession } = req.body;
    const userId = uuidv4();
    const currentDate = new Date();
    const createdDate = currentDate.toISOString();
    const updatedDate = createdDate;
    try {
      const { error, value } = RegisterValidation.validate(req.body);
      if (error) {
        return res.status(400).send({ message: error.details[0].message });
      }
      await DbConnection.query(
        "INSERT INTO users (user_id, full_name, mobile, city, profession,created_date,updated_date) VALUES (?, ?, ?, ?, ?,?,?)",
        [userId, full_name, mobile, city, profession, createdDate, updatedDate]
      );
      const options = {
        expiresIn: "2d",
      };
      let payload = {
        full_name: full_name,
        id: userId,
        mobile: mobile,
        city: city,
        profession: profession,
      };
      let token = jwt.sign(payload, secretKey, options, {
        algorithm: "HS256",
      });
      res
        .status(201)
        .send({ message: "Registered Successfully", auth: true, token });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error.");
    }
  },
  updatedUserController: async (req, res) => {
    const userId = res.locals.user.id;
    const { full_name, mobile, city, profession } = req.body;
    console.log(userId);
    try {
      const currentDate = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      await DbConnection.query(
        "UPDATE users SET full_name=?, mobile=?, city=?, profession=?, updated_date=? WHERE user_id=?",
        [full_name, mobile, city, profession, currentDate, userId]
      );

      res.status(200).send("User data updated successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};
