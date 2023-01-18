import { getAuth, getIdToken, onAuthStateChanged, User } from "firebase/auth";
import axios from "axios";

const AxiosInstance = axios.create({
  responseType: "json",
  baseURL: process.env.REACT_APP_BACKEND_URL,
});
AxiosInstance.interceptors.request.use(async (request: any) => {
  const token = await getUserToken();

  if (token) {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  } else {
    window.location.href = "/login";
  }

  return request;
});
const getUserToken = async () => {
  return new Promise((resolve, reject) => {
    const unsub = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        const token = await getIdToken(user);
        resolve(token);
      } else {
        console.log("User not logged in");
        resolve(null);
      }
      unsub();
    });
  });
};
export default AxiosInstance;
