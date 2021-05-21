import Axios from "axios";
const baseurl = "http://192.168.0.101:8000/api";

export const axiosInstance = Axios.create({
  baseURL: baseurl,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access")
      ? "Bearer " + localStorage.getItem("access")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

async function getConfig() {
  const token = await localStorage.getItem("access");
}

export const retrieve = async (param, params = null) => {
  return await new Promise((resolve, reject) => {
    axiosInstance
      .get(param, params)
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

// axiosInstance.interceptors.request.use(
//   async (config) => {
//     console.log(config);
//     // localStorage.getItem("access")
//     //   ? (config.headers = {
//     //       Authorization: `Bearer ${localStorage.getItem("access")}`,
//     //     })
//     //   : (config.headers = { Authorization: "" });
//     console.log("sending a req");
//     return config;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    //Prevent infinite loops
    if (
      error.response.status === 401 &&
      originalRequest.url === baseurl + "/token/refresh/"
    ) {
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh");
      //TO-DO: fix refresh token expiry loop
      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        const now = Math.ceil(Date.now() / 1000);
        if (tokenParts.exp > now) {
          return axiosInstance
            .post("/token/refresh/", { refresh: refreshToken })
            .then((response) => {
              localStorage.setItem("access", response.data.access);
              axiosInstance.defaults.headers["Authorization"] =
                "Bearer " + response.data.access;
              originalRequest.headers["Authorization"] =
                "Bearer " + response.data.access;
              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/login/";
        }
      } else {
        console.log("Refresh token not available.");
        window.location.href = "/login/";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);
