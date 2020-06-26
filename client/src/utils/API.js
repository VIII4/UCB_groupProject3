import axios from "axios";

export default {
  // TESTING- REMOVE ***
  // getIssues: function () {
  //   return [
  //     /*  Array of issue objects for testing: { id, lon, lat, type }*/
  //     { lat: 37.804363, lng: -122.271111 },
  //     { lat: 37.804363, lng: -122.271111 },
  //     { lat: 37.804363, lng: -122.271111 },
  //     { lat: 37.804363, lng: -122.271111 },
  //     { lat: 59.611975, lng: 16.547017 },
  //     { lat: 59.612186, lng: 16.544901 },
  //     { lat: 59.614412, lng: 16.538992 },
  //     { lat: 59.615677, lng: 16.546703 },
  //     { lat: 59.618794, lng: 16.54548 },
  //     { lat: 59.62265, lng: 16.558984 },
  //     { lat: 59.615612, lng: 16.555962 },
  //     { lat: 59.610812, lng: 16.549959 },
  //     { lat: 59.608804, lng: 16.541045 },
  //     { lat: 59.608084, lng: 16.537515 },
  //   ];
  // },

  /////// Issue API Calls

  // Gets all issues
  getIssues: function () {
    return axios.get("/issue/");
  },

  // Gets single issue by id
  getSingleIssue: function (id) {
    return axios.get("/issue/" + id);
  },

  // Adds issue to data base
  createIssue: function () {
    return axios.post("/issue/add");
  },

  // Update issue with given id
  updateIssue: function (id) {
    return axios.post("/issue/" + id);
  },

  // Deletes issue with given id
  deleteIssue: function (id) {
    return axios.delete("/issue/" + id);
  },

  ////// User API Calls

  // Gets single issue by id
  getUser: function (id) {
    return axios.get("/users/" + id);
  },

  // Adds issue to data base
  createUser: function () {
    return axios.post("/users/add");
  },

  // Update issue with given id
  updateUser: function (id) {
    return axios.post("/users/" + id);
  },
};
