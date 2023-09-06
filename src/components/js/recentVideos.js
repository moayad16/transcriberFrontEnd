import React from "react";
import "../css/recentVideos.css";
import 'animate.css'

export default function RecentVideos({redo}) {
    return (
      <div className="recentVideos" style={redo && { width: "100%" }}>
        <div style={redo ? { display: "none" } : null}>
          <h4>Recent Videos:</h4>
          <hr />
        </div>
        <table>
          <tr className="animate__animated animate__fadeInLeft">
            <td className="videoName">React Tutorial: Part 1</td>
            <td className="videoSource">YouTube</td>
            <td className="download">Download Video</td>
            <td style={!redo ? { display: "none" } : null} className="download">
              Redo Transcription
            </td>
          </tr>
          <tr className="animate__animated animate__fadeInRight">
            <td className="videoName">CNN Special Report</td>
            <td className="videoSource">Twitter</td>
            <td className="download">Download Video</td>
            <td style={!redo ? { display: "none" } : null} className="download">
              Redo Transcription
            </td>
          </tr>
          <tr className="animate__animated animate__fadeInLeft">
            <td className="videoName">Interview with Naval Ravikant</td>
            <td className="videoSource">Instagram</td>
            <td className="download">Download Video</td>
            <td style={!redo ? { display: "none" } : null} className="download">
              Redo Transcription
            </td>
          </tr>
        </table>
      </div>
    );
}