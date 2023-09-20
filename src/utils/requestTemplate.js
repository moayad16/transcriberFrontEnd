import axios from "axios";
import Cookies from "js-cookie";

export default class requestTemplate {
  constructor(auth) {
    this.ax = axios.create({
      baseURL: "https://transcriber-io-back-end.onrender.com",
      //   baseURL: "http://192.168.1.4:8080",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + auth,
      },
    });
  }

  setToken(token) {
    this.ax.defaults.headers.common["Authorization"] = "Bearer " + token;
  }

  async getRequestTemplate() {
    return this.ax;
  }
}
