import Axios, { AxiosInstance } from "axios";

const axios: AxiosInstance = Axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    'Access-Control-Allow-Origin' : '*',
  },
  timeout: 10000,
});

// Cookie Version
// const refresh = async () => {
//   try {
//     const response = await axios.get('/auth/refresh');
//     sessionStorage.setItem("token", response.data.token);
//     return response.data.token;
//   } catch (error) {
//     console.log(error);
//   }
// } axios.get("/surveys/one", { params: { patientId } });

// localStorage  Version
const refresh = async () => {
  let refreshToken = localStorage.getItem("refreshToken")
  try {
    const response = await axios.post('auth/refresh', {refreshToken});
    sessionStorage.setItem("token", response.data.token);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data.token;
  } catch (error) {
    console.log(error);
  }
}

axios.interceptors.request.use(
  config => {
    let token = sessionStorage.getItem("token")
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  response => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const newAccessToken = await refresh();
      prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return axios(prevRequest);
    }
    return Promise.reject(error);
  });

export default axios;
axios.defaults.withCredentials = true
