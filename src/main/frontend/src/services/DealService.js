import axios from "axios";
import authHeader from "../util/authHeader";

const DEAL_API_BASE_URL = "http://localhost:8080/api/v1/deal";

class DealService {
  postDeal(deal) {
    return axios.post(DEAL_API_BASE_URL + "/post", deal, {
      headers: authHeader(),
    });
  }

  getDealsForWtbListing(wtbId) {
    return axios.get(DEAL_API_BASE_URL + "/get/wtblisting=" + wtbId, {
      headers: authHeader(),
    });
  }

  getDealsForIfsListing(ifsId) {
    return axios.get(DEAL_API_BASE_URL + "/get/ifslisting=" + ifsId, {
      headers: authHeader(),
    });
  }

  postAcceptedDeals(deals) {
    return axios.post(DEAL_API_BASE_URL + "/post/accept", deals, {
      headers: authHeader(),
    });
  }
}

export default new DealService();
