const mongoose = require("mongoose");
const Issue = require("../models/issue");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/caren");

const issueSeed = [
  {
    category: "Structural",
    descr: "Building is moldy",
    lat: 59.618794,
    lng: 16.54548,
    status: "Voting",
  },
  {
    category: "Structural",
    descr: "Building is moldy",
    lat: 37.804363,
    lng: -122.271111,
    status: "Voting",
  },
  {
    category: "Structural",
    descr: "Building is moldy",
    lat: 37.804363,
    lng: -122.271111,
    status: "Voting",
  },
];

// db.Book.remove({})
//   .then(() => db.Book.collection.insertMany(bookSeed))
//   .then((data) => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   });

Issue.collection
  .insertMany(issueSeed)
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// Issue.findById({})
//   .then((dbModel) => dbModel.remove())
//   .then((dbModel) => res.json(dbModel))
//   .catch((err) => res.status(422).json(err))
//   .then(() => Issue.collection.insertMany(issueSeed))
//   .then((data) => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   });
