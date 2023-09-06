import React, { useState } from "react";
import "../css/transcribe.css";
import "animate.css";
import RecentVideos from "./recentVideos";
import Info from "./info";
import io from "socket.io-client";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store";
import { useDispatch } from "react-redux";
import { TranscriptionProcessor } from "../../utils/TranscriptionProcessor";


export default function Transcribe({ width }) {

  
  const [videoLink, setVideoLink] = useState("");
  const dispatch = useDispatch();
  const transcriptionProcessor = new TranscriptionProcessor(dispatch)
  const createNewVideoProccess = bindActionCreators(
    actionCreators.createNewTranscriptionProcess,
    dispatch
  );
  const updateStatus = bindActionCreators(
    actionCreators.setTranscriptionStatus,
    dispatch
  );
  const updateTranscript = bindActionCreators(
    actionCreators.setTranscriptionTranscript,
    dispatch
  );
  const deleteTranscriptionProcess = bindActionCreators(
    actionCreators.deleteTranscriptionProcess,
    dispatch
  );
  const createNewFinishedTranscription = bindActionCreators(
    actionCreators.createNewFinishedTranscription,
    dispatch
  );

  const submit = () => {
    const socket = io("http://localhost:9090");

    createNewVideoProccess({
      title: "test",
      status: "Transcription Failed",
      transcript: null,
      id: 4,
    });

    socket.emit("postUrl", { url: videoLink });

    socket.on("info", (data) => {
      createNewVideoProccess({
        title: data.title,
        status: "Loading . . .",
        transcript: null,
        id: data.id,
        percent: 0,
      });
    });

    socket.on("status", (data) => {
      updateStatus({
        id: data.id,
        status: data.message,
        percent: data.percent,
      });
    });

    socket.on("transcription", (data) => {
      updateTranscript(data.id, data.transcript);

      createNewFinishedTranscription({
        title: data.title,
        transcript: data.transcript,
        id: data.id,
      });

      deleteTranscriptionProcess(data.id);
    });

    socket.on("error", (data) => {
      updateStatus({ id: data.id, status: data.message });
    });
  };



  return (
    <div className="transcribe">
      <div className="row transcribeCont">
        <div className="col-lg-8 transcribeCol animate__animated animate__fadeIn">
          <h1>Transcribe</h1>
          <p>Paste your YouTube, Twitter, or Instagram Link here:</p>
          <input onChange={(e) => setVideoLink(e.target.value)} type="text" />
          <button
            onClick={submit}
            className="btn btn-primary submit btn animate__animated animate__fadeInUp"
          >
            Transcribe
          </button>
          <RecentVideos />
        </div>
        <div
          style={
            width < 1300
              ? { borderRadius: "20px", height: "100%", overflowY: "hidden" }
              : null
          }
          className="col-lg-4 infoCol animate__animated animate__fadeIn"
        >
          <Info />
        </div>
      </div>
    </div>
  );
}
