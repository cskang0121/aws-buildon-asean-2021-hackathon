import axios from "axios";
import authHeader from "../util/authHeader";

const RECOMMEND_API_BASE_URL = "http://localhost:8080/api/v1/recommend";

class RecommendService {
  getRecsByItemId(itemId) {
    return axios.get(RECOMMEND_API_BASE_URL + "/get/itemid=" + itemId, {
      headers: authHeader(),
    });
  }

  getWTBRecsByUserId(uid) {
    return axios.get(RECOMMEND_API_BASE_URL + "/get/wtb/user=" + uid, {
      headers: authHeader(),
    });
  }

  getIFSRecsByUserId(uid) {
    return axios.get(RECOMMEND_API_BASE_URL + "/get/ifs/user=" + uid, {
      headers: authHeader(),
    });
  }
}

export default new RecommendService();
