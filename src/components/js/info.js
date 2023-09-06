import React from "react";
import "../css/info.css";
import VideoLoader from "./videoLoader";
import FinishedVideos from "./finishedVideos";
import { useDispatch, useSelector } from "react-redux";
import { TranscriptionProcessor } from "../../utils/TranscriptionProcessor";

export default function Info() {
  const transcriptions = useSelector(state => state.transcriptionProcess);
  const finishedTranscriptions = useSelector(state => state.finishedTranscriptions);

  const dispatch = useDispatch();
  const transcriptionProcessor = new TranscriptionProcessor(dispatch)


  return (
    <div className="info">
      <h1>Transcription Queue:</h1>
      <div className="videosProcessing">
        {transcriptions.map((transcription) => {
          return (
            <VideoLoader
              key={transcription.id}
              title={transcription.title}
              status={transcription.status}
              percent={transcription.percent}
              id={transcription.id}
            />
          );
        })}
      </div>
      <h1>Finished:</h1>
      {finishedTranscriptions.map((transcription) => {
        return (
          <FinishedVideos
            key={transcription.id}
            title={transcription.title}
            transcript={transcription.transcript}
          />
        )
      })}
    </div>
  );
}
