import axios from "axios";

export default {
  // TESTING- REMOVE ***
  getIssues: function () {
    return [
      /*  Array of issue objects for testing: { id, lon, lat, type }*/
      { lat: 37.804363, lng: -122.271111 },
      { lat: 37.804363, lng: -122.271111 },
      { lat: 37.804363, lng: -122.271111 },
      { lat: 37.804363, lng: -122.271111 },
      { lat: 59.611975, lng: 16.547017 },
      { lat: 59.612186, lng: 16.544901 },
      { lat: 59.614412, lng: 16.538992 },
      { lat: 59.615677, lng: 16.546703 },
      { lat: 59.618794, lng: 16.54548 },
      { lat: 59.62265, lng: 16.558984 },
      { lat: 59.615612, lng: 16.555962 },
      { lat: 59.610812, lng: 16.549959 },
      { lat: 59.608804, lng: 16.541045 },
      { lat: 59.608084, lng: 16.537515 },
    ];
  },
  // Gets all books
  getBooks: function () {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },
};
