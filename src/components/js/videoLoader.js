import React from "react";
import "../css/videoLoader.css";
import "animate.css";
import { useDispatch } from "react-redux";
import { TranscriptionProcessor } from "../../utils/TranscriptionProcessor";

export default function VideoLoader({id, url, title, status, percent }) {

  const dispatch = useDispatch();

  const retry = () => {
    const transcriptionProcessor = new TranscriptionProcessor(dispatch, url.url);
    transcriptionProcessor.retryTranscription(id);
  }

  return (
    <div className="videoLoader animate__animated animate__fadeInRight">
      <div className="row">
        <div className="col-10">
          <p>{title}</p>
        </div>
        <div className="col-2">
          <p>{percent}%</p>
        </div>
      </div>
      <div className="row progressBar">
        <div
          style={{
            backgroundColor: status === "Transcription Failed!" && "red",
            boxShadow: status === "Transcription Failed!" && "0px 0 10px 1px red",
            width: `${percent}%`,
          }}
          className="progress"
        ></div>
      </div>
      <div className="loaderFooter">
        <h6
          className="status"
          style={{ animation: status === "Transcription Failed!" && "none" }}
        >
          {status}
        </h6>
        <h6 onClick={retry} className="error" style={{display: status === "Transcription Failed!" && "block"}}>Try Again</h6>
      </div>
    </div>
  );
}
