import React from "react";
import "animate.css";
import { useState, useEffect } from "react";
import "../css/leftCol.css";

export default function LeftCol() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);
  return (
    <div
      style={width < 1006 ? { display: "none" } : { display: "block" }}
      className="animate__animated animate__fadeInLeft left col-lg-6"
    >
      <div className="header">
        <h1>Transcriber</h1>
        <div className="circle"></div>
      </div>
      <div className="footer">
        <h1>Online videos unleashed</h1>
        <p style={{marginBottom: 0}}>
          Transcriber gives you control to download or transcribe online videos
        </p>
      </div>
    </div>
  );
}
