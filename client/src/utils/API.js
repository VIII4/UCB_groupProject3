import axios from "axios";

export default {
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
  createIssue: function (data) {
    return axios.post("/issue/add", data);
  },

  // Update issue with given id
  // updateIssue: function (id, data) {
  //   return axios.post("/issue/update/" + id, data);
  // },

  //TESTING
  updateIssue: function (id, data) {
    return axios.post("/issue/updatevote/" + id, data);
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
