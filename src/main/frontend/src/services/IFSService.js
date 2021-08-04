import axios from "axios";
import authHeader from "../util/authHeader";
import { API_BASE_URL } from "../util/apiBaseUrl";

const IFS_API_BASE_URL = `${API_BASE_URL}/ifs-listing`;

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

  getSearchListings(keyword, categoryName, itemCondition, searchLocation) {
    return axios.get(IFS_API_BASE_URL + "/searchIFS/get", {
      params: {
        keyword: keyword,
        categoryName: categoryName,
        itemCondition: itemCondition,
        searchLocation: searchLocation,
      },
      headers: authHeader(),
    });
  }

  getCurrentUserIFSListings(uid) {
    return axios.get(IFS_API_BASE_URL + "/get/user=" + uid, {
      headers: authHeader(),
    });
  }

  postListingImage(ifsId, file) {
    return axios.post(IFS_API_BASE_URL + "/" + ifsId + "/image/upload", file, {
      headers: { ...authHeader(), "Content-Type": "multipart/form-data" },
    });
  }

  getListingImage(ifsId) {
    return axios.get(IFS_API_BASE_URL + "/" + ifsId + "/image/download", {
      headers: { ...authHeader() },
    });
  }
}

export default new IFSService();
