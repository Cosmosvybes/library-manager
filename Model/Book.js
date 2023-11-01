const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    ISBN: { type: String, required: true },
    availabilityStatus: { type: Boolean },
  },
  {
    collection: "Books",
  }
);
module.exports = mongoose.model("Books", bookSchema);
