import AuthenticationService from "../services/AuthenticationService";

export default function authHeader() {
  const currentUser = AuthenticationService.getCurrentUserToken();
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  } else {
    return {};
  }
}
