import axios from "axios";
import authHeader from "../util/authHeader";

const WTB_API_BASE_URL = "http://localhost:8080/api/v1/wtb-listing";

class WTBService {
  getAllWTBListings() {
    return axios.get(WTB_API_BASE_URL + "/get", { headers: authHeader() });
  }

  postWTBListing(listing) {
    return axios.post(WTB_API_BASE_URL + "/post", listing, {
      headers: authHeader(),
    });
  }

  postDeleteWTB(listing) {
    return axios.post(WTB_API_BASE_URL + "/deleteWTB/post", listing, {
      headers: authHeader(),
    });
  }

  getSearchListings(keyword, categoryName, hashtags) {
    return axios.get(WTB_API_BASE_URL + "/searchWTB/get", {
      params: { 
        keyword: keyword, 
        categoryName: categoryName,
        hashtags: hashtags
      },
      headers: authHeader(),
    });
  }

  getCurrentUserWTBListings(uid) {
    return axios.get(WTB_API_BASE_URL + "/get/user=" + uid, {
      headers: authHeader(),
    });
  }

  async postListingImage(wtbId, file) {
    return axios.post(WTB_API_BASE_URL + "/" + wtbId + "/image/upload", file, {
      headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
    });
  }

  getListingImage(wtbId) {
    return axios.get(WTB_API_BASE_URL + "/" + wtbId + "/image/download", {
      headers: { ...authHeader() },
    });
  }
}

export default new WTBService();
