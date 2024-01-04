const express = require("express");
const port = process.env.PORT || 1908;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
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

const {
  signup,
  authenticateSession,
  userProfile,
  allUsers,
} = require("./Controller/Manager.js");

const {
  findBook,
  addBook,
  getAllBooks,
  returnBook,
  lendBook,
  removeBook,
} = require("./Model/Book.js");

const Auth = require("./Middleware/Auth.js");

// app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/books", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/catalogue", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.get("/api/home", Auth, userProfile);
app.get("/api/users", Auth, allUsers);
app.post("/api/user/account/signin", authenticateSession);

app.get("/api/all/books", Auth, getAllBooks);

app.get("/api/book/search/", Auth, findBook);

app.post("/api/add/new/book", Auth, addBook);

app.patch("/api/return/book", Auth, returnBook);
app.patch("/api/lend/book", Auth, lendBook);

app.delete("/api/delete", Auth, removeBook);

app.post("/api/signup", signup);

app.listen(port, function () {
  console.log(`Server running on on ${port}`);
});
