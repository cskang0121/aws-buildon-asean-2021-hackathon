import axios from "axios";

const GET_PROFILE_URL = "http://localhost:8080/api/v1/get-profile";

class UserService {
  getProfile = () => {
    return axios.get(GET_PROFILE_URL);
  };
}

export default new UserService();
