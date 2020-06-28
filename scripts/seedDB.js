const mongoose = require("mongoose");
const Issue = require("../models/issue");

// This file empties the Books collection and inserts the books below

//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/caren");
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://carenUser:groupProject3@ds145208.mlab.com:45208/heroku_kgv68jn2"
);

const issueSeed = [
  //Oakland
  {
    createdby: "testUser", //
    category: "Structural",
    descr: "Building is moldy",
    voteCount: 0,
    latlng: {
      lat: 37.805105,
      lng: -122.218504,
    }, //
    zipcode: 94602,
    status: "Voting",
    date: Date(), //
  },
  {
    createdby: "testUser", //
    date: Date(), //
    latlng: {
      lat: 37.804363,
      lng: -122.271111,
    }, //
    category: "Wild Life",
    descr: "Deer crossing, needs sign!",
    voteCount: 0,
    zipcode: 94602,
    status: "Closed",
  },
  {
    createdby: "testUser", //
    date: Date(), //
    latlng: {
      lat: 37.801816,
      lng: -122.21537,
    }, //
    category: "Utility",
    descr: "Power line down",
    voteCount: 0,
    zipcode: 94602,
    status: "Voting",
  },
  {
    createdby: "testUser", //
    date: Date(), //
    latlng: {
      lat: 37.800527,
      lng: -122.216014,
    }, //
    category: "Roads",
    descr: "Big ASS pothole",
    voteCount: 0,
    zipcode: 94602,
    status: "Voting",
  },
  {
    createdby: "testUser", //
    date: Date(), //
    latlng: {
      lat: 37.793067,
      lng: -122.226922,
    }, //
    category: "Vandalism",
    voteCount: 0,
    descr: "graffiti on elementary school",
    zipcode: 94602,
    status: "Voting",
  },
  {
    createdby: "testUser", //
    date: Date(), //
    latlng: {
      lat: 37.780382,
      lng: -122.226748,
    }, //
    category: "Trash",
    descr: "park litter",
    voteCount: 0,
    zipcode: 94602,
    status: "Voting",
  },
  //San Francisco
  {
    createdby: "testUser", //
    date: Date(), //
    latlng: {
      lat: 37.759044,
      lng: -122.448249,
    }, //
    category: "Trash",
    descr: "its diiirty AF",
    voteCount: 0,
    zipcode: 94102,
    status: "Voting",
  },
  {
    createdby: "testUser", //
    date: Date(), //
    latlng: {
      lat: 37.743843,
      lng: -122.440004,
    }, //
    category: "Roads",
    descr: "traffic light is out",
    voteCount: 0,
    zipcode: 94102,
    status: "Voting",
  },
  {
    createdby: "testUser", //
    date: Date(), //
    latlng: {
      lat: 37.751444,
      lng: -122.418361,
    }, //
    category: "Other",
    descr: "Fire hydrant is leaking",
    voteCount: 0,
    zipcode: 94102,
    status: "Voting",
  },
  {
    createdby: "testUser", //
    date: Date(), //
    latlng: {
      lat: 37.774785,
      lng: -122.458556,
    }, //
    category: "Vandalism",
    descr: "see title",
    voteCount: 0,
    zipcode: 94102,
    status: "Voting",
  },
  // San Diego
  {
    createdby: "testUser", //
    date: Date(), //
    latlng: { lat: 32.869928, lng: -117.219032 }, //
    category: "Wildlife",
    descr: "Seaworld Escapeees",
    voteCount: 0,
    zipcode: 92122,
    status: "Voting",
  },
  {
    createdby: "testUser", //
    date: Date(), //
    latlng: {
      lat: 32.859258,
      lng: -117.222982,
    }, //
    category: "Utility",
    descr: "Gasline exposed",
    voteCount: 0,
    zipcode: 92122,
    status: "Voting",
  },
  {
    createdby: "testUser", //
    date: Date(), //
    latlng: {
      lat: 32.880452,
      lng: -117.217486,
    }, //
    category: "Structural",
    descr: "asbestos exposed on wall",
    voteCount: 0,
    zipcode: 92122,
    status: "Voting",
  },
  {
    createdby: "testUser", //
    date: Date(), //
    latlng: {
      lat: 32.868198,
      lng: -117.201854,
    }, //
    category: "Road",
    descr: "Need stop sign here",
    voteCount: 0,
    zipcode: 92122,
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
