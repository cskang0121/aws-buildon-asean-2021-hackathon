import axios from "axios";
import authHeader from "../util/authHeader";

const OFFER_API_BASE_URL = "http://localhost:8080/api/v1/offer";

class OfferService {
  postOffer(offer) {
    return axios.post(OFFER_API_BASE_URL + "/post", offer, {
      headers: authHeader(),
    });
  }

  getCurrentUserReceivedOffers(uid) {
    return axios.get(OFFER_API_BASE_URL + "/get/receivedby=" + uid, {
      headers: authHeader(),
    });
  }

  postAcceptedOffers(offers) {
    return axios.post(OFFER_API_BASE_URL + "/post/accept", offers, {
      headers: authHeader(),
    });
  }

  getOffersForListing(ifsId) {
    return axios.get(OFFER_API_BASE_URL + "/get/ifslisting=" + ifsId, {
      headers: authHeader(),
    });
  }

  getCurrentUserOffersMade(uid) {
    return axios.get(OFFER_API_BASE_URL + "/get/madeby=" + uid, {
      headers: authHeader(),
    });
  }

  postConfirmOffer(offer) {
    return axios.post(OFFER_API_BASE_URL + "/post/confirm", offer, {
      headers: authHeader(),
    });
  }
}

export default new OfferService();
