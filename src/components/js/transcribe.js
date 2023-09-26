import React, { useState } from "react";
import "../css/transcribe.css";
import "animate.css";
import RecentVideos from "./recentVideos";
import Info from "./info";
import { useDispatch } from "react-redux";
import { TranscriptionProcessor } from "../../utils/TranscriptionProcessor";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import Spinner from "./spinner";

export default function Transcribe({ width }) {
  
  const [videoLink, setVideoLink] = useState("");
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();


  
  const submit = () => {
    setLoading(true);
    setVideoLink("")
    const transcriptionProcessor = new TranscriptionProcessor(dispatch, videoLink, localStorage.getItem("token"));
    transcriptionProcessor.processTranscription();
    const infoCol = document.querySelector(".infoCol");
    infoCol.scrollIntoView({ behavior: "smooth" });
    setLoading(false);
  };

  return (
    <div className="transcribe">
      <div className="row transcribeCont">
        <div className="col-lg-8 transcribeCol animate__animated animate__fadeIn">
          <h1 className="title animate__animated animate__fadeInDown">
            Transcribe
          </h1>
          <p>Paste your YouTube, Twitter, or Instagram Link here:</p>
          <input
            className="animate__animated animate__fadeInUp"
            onChange={(e) => setVideoLink(e.target.value)}
            type="text"
            value={videoLink}
          />
          <p
            className={`notLoggedIn ${
              Cookies.get("token") !== undefined
                ? "animate__animated animate__fadeOut hidden"
                : "animate__animated animate__fadeIn"
            }`}
          >
            You are not logged in! History is not permenant if not logged in
          </p>
          <button
            onClick={submit}
            className="btn btn-primary submit btn animate__animated animate__fadeInUp"
          >
            {Loading ? (
              <Spinner />
            ) : (
              "Submit"
            )}
          </button>
          <RecentVideos />
        </div>
        <div
          style={
            width < 1300
              ? { borderRadius: "0", height: "100%", overflowY: "hidden" }
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
