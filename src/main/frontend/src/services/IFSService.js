import axios from "axios";

const IFS_API_BASE_URL = "http://localhost:8080/api/v1/ifs-listing";

class IFSService {
  getIFSListings() {
    return axios.get(IFS_API_BASE_URL);
  }

  postIFSListing(listing) {
    return axios.post(IFS_API_BASE_URL + "/post", listing);
  }
}

export default new IFSService();