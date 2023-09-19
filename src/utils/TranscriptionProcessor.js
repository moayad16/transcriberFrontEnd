import { bindActionCreators } from "redux";
import { actionCreators } from "../store";
import { io } from "socket.io-client";
import Cookies from "js-cookie";

export class TranscriptionProcessor {
  constructor(dispatch, videoLink, token) {
    console.log("this is the video link ", videoLink);
    this.socket = io("https://transcriber-io-back-end.onrender.com", {
      auth: {
        token: Cookies.get("token"),
      },
    });

    this._dispatch = dispatch;
    this._createNewVideoProccess = bindActionCreators(
      actionCreators.createNewTranscriptionProcess,
      dispatch
    );
    this._updateStatus = bindActionCreators(
      actionCreators.setTranscriptionStatus,
      dispatch
    );
    this._updateTranscript = bindActionCreators(
      actionCreators.setTranscriptionTranscript,
      dispatch
    );
    this._deleteTranscriptionProcess = bindActionCreators(
      actionCreators.deleteTranscriptionProcess,
      dispatch
    );
    this._createNewFinishedTranscription = bindActionCreators(
      actionCreators.createNewFinishedTranscription,
      dispatch
    );

    this.videoLink = videoLink;
    this.transcription = "";
    this.token = token;
  }

  async processTranscription() {
    this.socket.emit("postUrl", { url: this.videoLink, token: this.token });

    this.socket.on("info", (data) => {
      this._createNewVideoProccess({
        title: data.title,
        status: "Loading . . .",
        transcript: null,
        id: data.id,
        percent: 0,
        url: data.url,
      });
    });

    this.socket.on("status", (data) => {
      this._updateStatus({
        id: data.id,
        status: data.message,
        percent: data.percent,
      });
    });

    this.socket.on("transcription", (data) => {
      this._createNewFinishedTranscription({
        id: data.id,
        title: data.title,
        text: data.transcript,
        videoUrl: this.videoLink,
      });

      this._deleteTranscriptionProcess(data.id);
    });

    this.socket.on("error", (data) => {
      this._updateStatus({
        id: data.id,
        status: data.message,
        percent: data.percent,
        url: this.videoLink,
      });
    });
  }

  async retryTranscription(id) {
    console.log("this is the id from the retry funciton", id);
    this._deleteTranscriptionProcess(id);
    this.processTranscription();
  }
}
