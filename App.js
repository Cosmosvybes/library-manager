const express = require("express");
const port = process.env.PORT || 1908;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:1908");
  res.setHeader("Access-Control-Allow-Credientials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization",
    "Content-Type"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
const { managerSchema } = require("./Controller/Manager.js");

app.post("/api/user/account/signin", async (req, res) => {
});

app.post("/api/signup", async (req, res) => {
  const data = await managerSchema();
  res.send(data);
});
app.listen(port, function () {
  console.log(`Server running on ${port}`);
});
