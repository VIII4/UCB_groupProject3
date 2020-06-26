const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useFindAndModify", false);

const issueSchema = new Schema({
  category: { type: String, required: true },
  descr: { type: String, required: true },
  voteCount: { type: Number, required: true },
  image1: { type: String },
  image2: { type: String },
  image3: { type: String },
  zipcode: { type: Number, required: true },
  status: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  addtlcomments: { type: String },
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
