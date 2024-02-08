const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
  longURL: String,
  shortURL: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  clickCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("URL", urlSchema);
