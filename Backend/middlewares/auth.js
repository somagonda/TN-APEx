const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express;
const fs = require("fs");
require("dotenv").config();
const secretKey = process.env.Secret_Access_Key;

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied");

  try {
    jwt.verify(token, secretKey, { algorithm: "HS256" }, (err, decoded) => {
      if (err) {
        console.log("jwt token expired", err);
        return res.status(500).json({ error: "Not Authorized" });
      }

      res.locals.user = {
        full_name: decoded.full_name,
        id: decoded.id,
        mobile: decoded.mobile,
        city: decoded.city,
        profession: decoded.profession,
      };
      next();
    });
  } catch (error) {
    res.status(400).send("Invalid Token: " + error.message);
  }
};

module.exports = verifyToken;
