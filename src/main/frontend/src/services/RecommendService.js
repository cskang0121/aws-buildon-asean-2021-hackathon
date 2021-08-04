import axios from "axios";
import authHeader from "../util/authHeader";
import { API_BASE_URL } from "../util/apiBaseUrl";

const RECOMMEND_API_BASE_URL = `${API_BASE_URL}/recommend`;

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

  // putEventsPostIfsListing(ifsListing) {
  //   return axios.post(
  //     RECOMMEND_API_BASE_URL + "/post/event/create/ifs",
  //     ifsListing,
  //     {
  //       headers: authHeader(),
  //     }
  //   );
  // }
}

export default new RecommendService();
