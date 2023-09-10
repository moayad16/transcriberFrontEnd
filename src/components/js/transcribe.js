import React, { useState } from "react";
import "../css/transcribe.css";
import "animate.css";
import RecentVideos from "./recentVideos";
import Info from "./info";
import { useDispatch } from "react-redux";
import { TranscriptionProcessor } from "../../utils/TranscriptionProcessor";


export default function Transcribe({ width }) {

  
  const [videoLink, setVideoLink] = useState("");
  const dispatch = useDispatch();
  
  const submit = () => {
    const transcriptionProcessor = new TranscriptionProcessor(dispatch, videoLink, localStorage.getItem("token"));
    transcriptionProcessor.processTranscription();
  };



  return (
    <div className="transcribe">
      <div className="row transcribeCont">
        <div className="col-lg-8 transcribeCol animate__animated animate__fadeIn">
          <h1 className="animate__animated animate__fadeInDown">Transcribe</h1>
          <p>Paste your YouTube, Twitter, or Instagram Link here:</p>
          <input className="animate__animated animate__fadeInUp" onChange={(e) => setVideoLink(e.target.value)} type="text" />
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
