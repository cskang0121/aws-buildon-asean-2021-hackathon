import axios from "axios";
import authHeader from "../util/authHeader";
import { API_BASE_URL } from "../util/apiBaseUrl";

const BUYER_QNA_API_BASE_URL = `${API_BASE_URL}/buyer-qna`;

class BuyerQnAService {
  postManyBuyerQnAs(buyerQnAs) {
    return axios.post(BUYER_QNA_API_BASE_URL + "/post/many", buyerQnAs, {
      headers: authHeader(),
    });
  }

  getQnAsForWtbListing(wtbId) {
    return axios.get(BUYER_QNA_API_BASE_URL + "/get/wtblisting=" + wtbId, {
      headers: authHeader(),
    });
  }

  postManyAnswerQnAs(answerQnAs) {
    return axios.post(
      BUYER_QNA_API_BASE_URL + "/post/many-answers",
      answerQnAs,
      {
        headers: authHeader(),
      }
    );
  }

  getAnswersByDeal(sellerId, wtbId, ifsId) {
    return axios.get(
      BUYER_QNA_API_BASE_URL +
        "/get/answer/seller=" +
        sellerId +
        "&wtbid=" +
        wtbId +
        "&ifsid=" +
        ifsId,
      {
        headers: authHeader(),
      }
    );
  }
}

export default new BuyerQnAService();
