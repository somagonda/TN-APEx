const express = require("express");
const cors = require("cors");
const routes = require("./Routes/index");
const { urlencoded } = require("express");
const app = express();
require("dotenv").config();
require("./db");
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", routes);

app.listen(6000, () => {
  console.log("Expree backend running at 6000");
});
