import React from "react";
import "../css/recentVideos.css";
import "animate.css";
import { useSelector, useDispatch } from "react-redux";
import { TranscriptionProcessor } from "../../utils/TranscriptionProcessor";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store";

export default function RecentVideos({ redo }) {
  const finishedTranscriptions = useSelector(
    (state) => state.finishedTranscriptions
  );
  const dispatch = useDispatch();
  const mainComponentReducer = bindActionCreators(
    actionCreators.setMainComponent,
    dispatch
  );

  const redoTranscription = (url) => {
    const trancriptionProcessor = new TranscriptionProcessor(dispatch, url);
    trancriptionProcessor.retryTranscription();
    mainComponentReducer("Transcribe");
  };

  return (
    <div className="animate__animated animate__fadeInUp recentVideos" style={redo && { width: "100%" }}>
      <div style={redo ? { display: "none" } : null}>
        <h4>Recent Videos:</h4>
        <hr />
      </div>
      {finishedTranscriptions.map((transcription) => {
        return (
          <div style={{ margin: 0, padding: 0 }} className="row">
            <div style={{ padding: 0 }} className="col-lg-5">
              <h1 className="videoName">{transcription.title}</h1>
            </div>
            <div className={!redo ? "col-lg-3" : "col-lg-2"}>
              <p className="videoSource">YouTube</p>
            </div>
            <div className={!redo ? "col-lg-3" : "col-lg-2"}>
              <a href={transcription.url} className="download">
                Goto Video
              </a>
            </div>
            <div
              style={!redo ? { display: "none" } : null}
              className="col-lg-3"
            >
              <p
                onClick={() => redoTranscription(transcription.url)}
                className="download"
              >
                Redo Transcription
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
