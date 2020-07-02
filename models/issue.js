const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useFindAndModify", false);

const issueSchema = new Schema({
  createdby: { type: String, required: true },
  votecount: { type: Number, required: true },
  resolvecount: { type: Number },
  votedby: [String], ///ask should this be username from user table??
  status: { type: String, required: true },
  category: { type: String, required: true },
  descr: { type: String, required: true },
  images: [String],
  zipcode: { type: Number, required: true },
  latlng: { lat: Number, lng: Number },
  date: { type: Date, default: Date.now, required: true },
  addtlcomments: [{ username: String, comment: String }],
});

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
