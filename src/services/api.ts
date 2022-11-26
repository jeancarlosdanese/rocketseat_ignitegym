import { AppError } from "@utils/AppError";
import axios from "axios";

const api = axios.create({
  baseURL: "http://10.7.100.7:3333",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    }

    return Promise.reject(error);
  }
);

export { api };

/* api.interceptors.request.use(
  (config) => {
    console.log("INTERCEPTOR => ", config);

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
); */

/* api.interceptors.response.use(
  (response) => {
    console.log("INTERCEPTOR RESPONSE => ", response);

    return response;
  },
  (error) => {
    console.log("INTERCEPTOR RESPONSE ERROR=> ", error);
    Promise.reject(error);
  }
); */
