import React from "react";
import "../css/finishedVideos.css";
import 'animate.css'

export default function FinishedVideos({title, transcript}) {

  const download = () => {
    const element = document.createElement("a");
    const file = new Blob([transcript], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${title}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <div className="finishedVideos animate__animated animate__fadeInRight">
      <div className="row">
        <p>{title}</p>
        <div className="col-6">
          <h6 className="finished">Finished</h6>
        </div>
        <div className="col-6">
          <h6 onClick={download} className="download">Download Text</h6>
        </div>
      </div>
    </div>
  );
}
