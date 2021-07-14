import axios from "axios";
import authHeader from "../util/authHeader";

const DEAL_API_BASE_URL = "http://localhost:8080/api/v1/deal";

class DealService {
  postDeal(deal) {
    return axios.post(DEAL_API_BASE_URL + "/post", deal, {
      headers: authHeader(),
    });
  }
}

export default new DealService();
