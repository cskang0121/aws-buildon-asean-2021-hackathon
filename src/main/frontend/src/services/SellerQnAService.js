import axios from "axios";
import authHeader from "../util/authHeader";

const SELLER_QNA_API_BASE_URL = "http://localhost:8080/api/v1/seller-qna";

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
