import axios from "axios";
import Cookies from "js-cookie";
    
export let ax = axios.create({
    baseURL: "http://192.168.1.4:8080",
    headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + Cookies.get("token")
    }
});

export default class requestTemplate {

    constructor (auth) {
        this.ax = axios.create({
            baseURL: "http://192.168.1.4:8080",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + auth
            }
        })
    }

    setToken(token) {
        this.ax.defaults.headers.common["Authorization"] = "Bearer " + token;
    }

    async getRequestTemplate() {
        return this.ax;
    }




}