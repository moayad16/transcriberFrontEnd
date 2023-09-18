import React from "react";
import "../css/info.css";
import VideoLoader from "./videoLoader";
import FinishedVideos from "./finishedVideos";
import { useSelector } from "react-redux";

export default function Info() {
  const transcriptions = useSelector(state => state.transcriptionProcess);
  const finishedTranscriptions = useSelector(state => state.finishedTranscriptions);


  return (
    <div className="info">
      <h1 className="animate__animated animate__fadeInRight">Transcription Queue:</h1>
      <div className="videosProcessing">
        {transcriptions.map((transcription) => {
          return (
            <VideoLoader
              key={transcription.id}
              title={transcription.title}
              status={transcription.status}
              percent={transcription.percent}
              id={transcription.id}
              url={transcription.url}
              className="aniamte__animated animate_fadeInRight"
            />
          );
        })}
      </div>
      <h1 className="animate__animated animate__fadeInRight">Finished:</h1>
      {finishedTranscriptions.map((transcription) => {
        return (
          <FinishedVideos
            key={transcription.id}
            title={transcription.title}
            transcript={transcription.text}
          />
        )
      })}
    </div>
  );
}
