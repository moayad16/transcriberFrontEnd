import { io } from "socket.io-client";

export default class SocketHandler {



    constructor() {
        this.socket = io("http://localhost:9090");
        this.cleintId = null;
    }


}