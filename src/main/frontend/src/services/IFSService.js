import axios from "axios";
import authHeader from "../util/authHeader";

const IFS_API_BASE_URL = "http://localhost:8080/api/v1/ifs-listing";

class IFSService {
  getAllIFSListings() {
    return axios.get(IFS_API_BASE_URL + "/getAll", { headers: authHeader() });
  }

  postIFSListing(listing) {
    return axios.post(IFS_API_BASE_URL + "/post", listing, {
      headers: authHeader(),
    });
  }

  postDeleteIFS(listing) {
    return axios.post(IFS_API_BASE_URL + "/deleteIFS/post", listing, {
      headers: authHeader(),
    });
  }

  getSearchListings(keyword) {
    return axios.get(IFS_API_BASE_URL + "/searchIFS/get", {
      params: { keyword: keyword },
      headers: authHeader(),
    });
  }

  getCurrentUserIFSListings(uid) {
    return axios.get(IFS_API_BASE_URL + "/get/user=" + uid, {
      headers: authHeader(),
    });
  }
}

export default new IFSService();
