import axios from "axios";
import authHeader from "../util/authHeader";
import { API_BASE_URL } from "../util/apiBaseUrl";

const SELLER_QNA_API_BASE_URL = `${API_BASE_URL}/seller-qna`;

class SellerQnAService {
  postSellerQnA(sellerQnA) {
    return axios.post(SELLER_QNA_API_BASE_URL + "/post", sellerQnA, {
      headers: authHeader(),
    });
  }

  getQnAsForIfsListing(ifsId) {
    return axios.get(SELLER_QNA_API_BASE_URL + "/get/ifslisting=" + ifsId, {
      headers: authHeader(),
    });
  }
}

export default new SellerQnAService();
