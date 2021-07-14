import axios from "axios";
const REGISTER_API_URL = "http://localhost:8080/api/v1/register";
const AUTH_API_URL = "http://localhost:8080/api/v1/authenticate";

class AuthenticationService {
  registerUser = (user) => {
    return axios.post(REGISTER_API_URL, user);
  };

  authenticate = (userCredentials) => {
    return axios
      .post(AUTH_API_URL, userCredentials)
      .then((response) => {
          if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
            console.log(localStorage.getItem("user"))
          }
          return response.data;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  signOut() {
    localStorage.removeItem("user");
    localStorage.removeItem("userProfile");
  }

  getCurrentUserToken() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthenticationService();
