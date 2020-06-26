const mongoose = require("mongoose");
const Issue = require("../models/issue");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/caren");

const issueSeed = [
  {
    category: "Structural",
    descr: "Building is moldy",
    lat: 37.805105,
    lng: -122.218504,
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
    lat: 37.801816,
    lng: -122.21537,
    status: "Voting",
  },
  {
    category: "Structural",
    descr: "Building is moldy",
    lat: 37.800527,
    lng: -122.216014,
    status: "Voting",
  },
  {
    category: "Structural",
    descr: "Building is moldy",
    lat: 37.793067,
    lng: -122.226922,
    status: "Voting",
  },
  {
    category: "Structural",
    descr: "Building is moldy",
    lat: 37.780382,
    lng: -122.226748,
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

function seed() {
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
}

Issue.remove()
  .then((res) => {
    console.log(res);
    seed();
  })
  .catch((err) => console.log(err));
