import axios from "axios";
import env from "../config/env.config";

axios.interceptors.request.use(
  (config: any) => {
    const configOptions = config;

    configOptions.headers.ContentType = "application/json";
    configOptions.headers.accept = "application/json";
    configOptions.headers["Accept-Language"] = "en";

    configOptions.baseURL = `${env.END_POINT}/`;

    return config;
  },
  (error) => Promise.reject(error)
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
