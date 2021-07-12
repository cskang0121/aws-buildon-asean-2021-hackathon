import axios from "axios";

const WTB_API_BASE_URL = "http://localhost:8080/api/v1/wtb-listing";

class WTBService {
  getWTBListings() {
    return axios.get(WTB_API_BASE_URL);
  }

  postWTBListing(listing) {
    return axios.post(WTB_API_BASE_URL + "/post", listing);
  }
}

export default new WTBService();