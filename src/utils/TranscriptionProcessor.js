import { bindActionCreators } from "redux";
import { actionCreators } from "../store";
import SocketHandler from "./socketHandler";

export class TranscriptionProcessor {
  constructor(dispatch, videoLink) {
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

    this.connectedSocket = new SocketHandler();
    this.videoLink = videoLink;
  }

  async processTranscription() {
    this.connectedSocket.emit("postUrl", { url: this.videoLink });

    this.connectedSocket.on("info", (data) => {
      this._createNewVideoProccess({
        title: data.title,
        status: "Loading . . .",
        transcript: null,
        id: data.id,
        percent: 0,
      });
    });

    this.connectedSocket.on("status", (data) => {
      this._updateStatus({
        id: data.id,
        status: data.status,
        percent: data.percent,
      });
    });

    this.connectedSocket.on("transcript", (data) => {
      this._createNewFinishedTranscription({
        id: data.id,
        title: data.title,
        transcript: data.transcript,
      });

      this._deleteTranscriptionProcess(data.id);
    });

    this.connectedSocket.on("error", (data) => {
      this._updateStatus({
        id: data.id,
        status: data.status,
        percent: data.percent,
        url: this.videoLink,
      });
    });
  }

  async retryTranscription(id) {
    this.deleteTranscriptionProcess(id);
    this.processTranscription();
  }
}
