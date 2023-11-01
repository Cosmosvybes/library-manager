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
const { managerSchema } = require("./Controllers/Manager.js");

app.post("/api/user/account/signin", async (req, res) => {
  // const user = await findUser("alfredchrisayo@gmail.com");
  // if (user.email) {
  //   re.send(user);
  // try {
  //   const authorizedUser = await bcrypt.compare(
  //     "Ayomide22689$",
  //     user.password
  //   );
  //   if (authorizedUser) res.send(user);
  //   else res.send("invalid password");
  // } catch (error) {
  //   res.send({ error });
  // }
  // res.send(
  //   authorizedUser
  //     ? `${(user.fullname, "is an authorized user")}`
  //     : `incorrect password`
  // );
});

app.post("/api/signup", async (req, res) => {
  const data = await managerSchema();
  res.send(data);
});
app.listen(port, function () {
  console.log(`Server running on ${port}`);
});
