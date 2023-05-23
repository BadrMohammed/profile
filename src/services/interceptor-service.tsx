import axios from "axios";
import env from "../config/env.config";

const publicAPIS = ["/"];

// eslint-disable-next-line arrow-body-style
const isPublicAPI = (url: string) => {
  return publicAPIS.find((endpoint) => env.END_POINT + endpoint === url);
};

const interceptor = {
  setupInterceptors: async (history: any) => {
    axios.interceptors.request.use(
      (req: any) => {
        if (isPublicAPI(req.url)) return req;

        return req;
      },
      (err) => Promise.reject(err)
    );

    axios.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response.status === 401) {
          history.push("/");
        }
        return Promise.reject(error);
      }
    );
  },
};

export default interceptor;
