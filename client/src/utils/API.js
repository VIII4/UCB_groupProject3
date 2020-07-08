import axios from "axios";
const API_KEY = `${process.env.REACT_APP_GOOGLE_KEY}`;

export default {
  // ===================== //
  // Gov Contact API Calls //
  // ===================== //

  // Get Local Government Contacts
  getGovContacts: function (zipCode) {
    return axios.get(
      `https://www.googleapis.com/civicinfo/v2/representatives?includeOffices=true&levels=locality&key=${API_KEY}&address=` +
        zipCode
    );
  },

  // ===================== //
  // Lat/Lng -> Zipcode API Calls //
  // ===================== //

  // Gets single issue by id  - THESE ARE CREATING ROUTES...BUT HOW
  getZipcode: function (location) {
    return axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&result_type=postal_code&key=${API_KEY}`
    );
  },

  // =============== //
  // Issue API Calls //
  // =============== //

  // WHY DON'T OUR API CALLS REQUIRE '?' SYMBOL?

  // Gets all issues
  getIssues: function () {
    return axios.get("/issue/");
  },

  // Gets single issue by id
  getSingleIssue: function (id) {
    return axios.get("/issue/" + id);
  },

  // Adds issue to data base
  createIssue: function (data) {
    return axios.post("/issue/", data);
  },

  //Update issue with given id
  updateIssue: function (id, data) {
    return axios.put("/issue/" + id, data);
  },

  // Deletes issue with given id
  deleteIssue: function (id) {
    return axios.delete("/issue/" + id);
  },

  // Image Upload request
  uploadImages: function (formData) {
    return axios({
      method: "POST",
      url: "/image-upload",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // //TESTING
  // updateIssue: function (id, data) {
  //   return axios.post("/issue/" + id, data);
  // },

  // ============== //
  // User API Calls //
  // ============== //

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
