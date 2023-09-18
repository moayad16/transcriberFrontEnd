import React from "react";
import "../css/history.css";
import "animate.css";
import RecentVideos from "../../components/js/recentVideos";


export default function History() {

    return (
      <div className="history animate__animated animate__fadeIn">
        <h1 className="title animate__animated animate__fadeInDown">History</h1>
        <p>
          The videos you have worked with. *History is not permanent without a
          registered account
        </p>
        <hr/>
        <RecentVideos redo={true}/>
      </div>
    );
}