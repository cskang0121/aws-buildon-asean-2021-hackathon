import axios from "axios";

const WTB_API_BASE_URL = "http://localhost:8080/api/v1/wtb-listing";

axios.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    const token = "Bearer " + user.token;
    config.headers.Authorization = token;
    console.log(user.token);
  }
  return config;
});

class WTBService {
  getAllWTBListings() {
    return axios.get(WTB_API_BASE_URL + "/getAll");
  }

  postWTBListing(listing) {
    return axios.post(WTB_API_BASE_URL + "/post", listing);
  }

  postDeleteWTB(listing) {
    return axios.post(WTB_API_BASE_URL + "/deleteWTB/post", listing);
  }
}

export default new WTBService();
