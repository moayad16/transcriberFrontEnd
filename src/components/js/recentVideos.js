import React, {useEffect} from "react";
import "../css/recentVideos.css";
import "animate.css";
import { useSelector, useDispatch } from "react-redux";
import { TranscriptionProcessor } from "../../utils/TranscriptionProcessor";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../store";
// import { ax } from '../../utils/requestTemplate'
import requestTemplate from "../../utils/requestTemplate";
import Cookies from "js-cookie";

export default function RecentVideos({ redo }) {


  let finishedTranscriptions = useSelector(
    (state) => state.finishedTranscriptions
  );

  if(!redo) {
    // Only show 3 most recent videos
    
    finishedTranscriptions = finishedTranscriptions.slice(-3);
  }

  const dispatch = useDispatch();

  const finishedTranscriptionsReducer = bindActionCreators(
    actionCreators.setFinishedTranscriptions,
    dispatch
  );

  const mainComponentReducer = bindActionCreators(
    actionCreators.setMainComponent,
    dispatch
  );

  const redoTranscription = (url) => {
    const trancriptionProcessor = new TranscriptionProcessor(dispatch, url);
    trancriptionProcessor.retryTranscription();
    mainComponentReducer("Transcribe");
  };

useEffect(() => {
  const fetchData = async () => {
    try {

      const rt = new requestTemplate(Cookies.get("token"));
      const ax = await rt.getRequestTemplate();
      const res = await ax.get("/user/finished_Transcriptions");
      finishedTranscriptionsReducer(res.data);

    } catch (err) {

      finishedTranscriptionsReducer([]);
      console.log(err);
    }
  };

  fetchData();
}, []);


  return (
    <div className="animate__animated animate__fadeInUp recentVideos" style={redo && { width: "100%" }}>
      <div style={redo ? { display: "none" } : null}>
        <h4>Recent Videos:</h4>
        <hr />
      </div>
      {finishedTranscriptions.map((transcription) => {
        return (
          <div className="row">
            <div className="col-lg-5">
              <h1 className="videoName">{transcription.title}</h1>
            </div>
            <div className={!redo ? "col-lg-3" : "col-lg-2"}>
              <p className="videoSource">YouTube</p>
            </div>
            <div className={!redo ? "col-lg-3" : "col-lg-2"}>
              <a href={transcription.videoUrl} className="download">
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
