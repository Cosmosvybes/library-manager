const { books, borrowers } = require("../utils/mongodb.js");
const { getUser } = require("../Controller/Manager.js");
// import { books } from "../utils/mongodb.js";

// add book func
async function createBook(title, author, isbn, qty, copyrightYear, category) {
  if (!(title || author || isbn)) return;
  const status = await books.insertOne({
    title,
    author,
    isbn,
    isAvailable: true,
    qty: qty,
    borrowers: [],
    dateAdded: new Date().toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
    copyrightYear: copyrightYear,
    category: category,
  });
  return status;
}

async function updateBook(title) {
  const newBookStatus = await books.updateOne(
    { title: title },
    { $set: { isAvailable: true } }
  );
  await books.updateOne({ title: title }, { $set: { borrowedBy: "" } });
  return newBookStatus;
}

// return borrowed book
async function returnBook(req, res) {
  const { email, title } = req.body;
  try {
    let book = await getBook(title);
    let newQty = book.qty + 1;
    await books.updateOne({ title: title }, { $set: { qty: newQty } });
    await borrowers.deleteOne({ borrowerEmail: email });
  } catch (error) {
    res.send({ error });
  }
}
//get book by title
const getBook = async (title) => {
  let bookData = await books.findOne({ title: title });
  return bookData;
};

// borrow book
async function lendUpdate(title, reader, returnDate) {
  let user = await getUser(reader);
  let book = await getBook(title);
  return { book, user: user.email };
  // if (book.qty > 1) {
  //   let newQty = book.qty - 1;
  //   await books.updateOne({ title: title }, { $set: { qty: newQty } });
  //   const data = await borrowers.insertOne({
  //     title: book.title,
  //     borrowerEmail: user.email,
  //     borrowerFirstname: user.firstname,
  //     date: new Date().toLocaleString("en-US", {
  //       year: "2-digit",
  //       month: "2-digit",
  //       day: "2-digit",
  //     }),
  //     returningDate: returnDate,
  //   });
  //   return data;
  // } else {
  //   await books.updateOne({ title: title }, { $set: { isAvailable: false } });
  // }
}

// lend book route
async function lendBook(req, res) {
  const { title, reader, returnDate } = req.body;
  console.log(req.body)
  // try {
  //   const data = await lendUpdate(title, reader, returnDate);
  //   res.send({ data });
  // } catch (error) {
  //   res.send({ error });
  // }
}

//  get all books
async function getAllBooks(req, res) {
  try {
    const allBooks = await books.find({}).toArray();
    res.send(allBooks);
  } catch (error) {
    res.send({ error });
  }
}

async function getBookByAuthor(keyword) {
  const book = await books.find({ author: keyword }).toArray();
  return book.length > 0
    ? book
    : `book with the author ${keyword} is not found`;
}
async function getBookByTitle(keyword) {
  const book = await books.find({ title: keyword }).toArray();
  return book.length > 0 ? book : `book with the title ${keyword} is not found`;
}
async function getBookByIsbn(keyword) {
  const book = await books.find({ isbn: keyword }).toArray();
  return book.length > 0 ? book : `book with the isbn ${keyword} is not found`;
}

//  find book based on the title , author, and isbn keywords
async function findBook(req, res) {
  const title = req.query.title;
  const author = req.query.author;
  const isbn = req.query.isbn;
  try {
    if (title) {
      const data = await getBookByTitle(title);
      res.send({ data });
    } else if (author) {
      const data = await getBookByAuthor(author);
      res.send({ data });
    } else if (isbn) {
      const data = await getBookByIsbn(isbn);
      res.send({ data });
    } else res.send({ response: "no keyword recieved" });
  } catch (error) {
    res.send({ error });
  }
}

async function addBook(req, res) {
  const { title, author, isbn, qty, copyrightYear, category } = req.body;
  console.log(req.body);
  try {
    const status = await createBook(
      title,
      author,
      isbn,
      qty,
      copyrightYear,
      category
    );
    status.insertedId
      ? res.send({ response: ` new Book ${title} successfull added` })
      : res.send({ response: "book not added yet" });
  } catch (error) {
    res.send({ error });
  }
}

async function deleteBook(title) {
  let response = await books.deleteOne({ title: title });
  return response;
}

async function removeBook(req, res) {
  const { title } = req.body;
  console.log(title);
  try {
    let data = await deleteBook(title);
    res.send(data);
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  findBook,
  createBook,
  returnBook,
  getAllBooks,
  addBook,
  lendBook,
  removeBook,
};
