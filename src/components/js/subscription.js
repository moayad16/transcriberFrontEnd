import React from "react";
import "../css/subscription.css";
import "animate.css";
import Card from "./card";
import Arrow from "../../assets/arrow";

export default function Subscription({ width }) {
  let style = {};
  if (width < 1300) {
    style = {
      paddingTop: "5.54rem",
      scale: "scaleX(-1)",
      top: "90%",
      right: "30%",
      rotate: "rotate(20deg)",
      marginTop: "5rem",
      borderRadius: "0",
    };
  }

  return (
    <div
      style={{paddingTop: style.paddingTop, borderRadius: style.borderRadius}}
      className="subscription"
    >
      <h1 className="animate__animated animate__fadeInLeft">
        Powerful features for
      </h1>
      <h1 className="animate__animated animate__fadeInRight subtitle">
        powerful creators
      </h1>
      <p className="animate__animated animate__fadeInDown">
        Choose a plan that's right for you
      </p>
      <div className=" animate__animated animate__fadeInUp switch form-switch">
        <span>Pay Monthly</span>
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
        />
        <span>Pay Yearly</span>
        <div style={{transform: style.scale + style.rotate, top: style.top, right: style.right,}} className="saver">
          <Arrow />
          <p style={{transform: style.scale}}>Save 25%</p>
        </div>
      </div>
      <div style={{marginTop: style.marginTop}} className="row cards">
        <div className="col-lg-4">
          <Card
            animation="animate__animated animate__fadeInLeft"
            title="Freebie"
            description="Ideal for individuals who need quick access to basic features."
            price="0"
            button="Get Started Now"
            features={[
              "Unlimited 10 minute videos or less",
              "Youtube Downloads & Transcription",
              "Twitter Downloads & Transcription",
            ]}
            unavailable={["Instagram Downloads & Transcription"]}
          />
        </div>
        <div className="col-lg-4">
          <Card
            animation="animate__animated animate__fadeInUp"
            title="Professional - Current Plan"
            description="Ideal for individuals who who need full access with medium amounts of videos"
            price="1.99"
            year="($23.88/year)"
            button="Cancel Now"
            features={[
              "Unlimited 10 minute videos or less",
              "200 Videos / month > 10 Minutes",
              "YouTube Downloads & Transcriptions",
              "Twitter Downloads & Transcriptions",
              "Instagram Downloads & Transcriptions",
            ]}
            unavailable={[]}
          />
        </div>
        <div className="col-lg-4">
          <Card
            animation="animate__animated animate__fadeInRight"
            title="Enterprise"
            description="Ideal for businesses who need large amounts of videos per month"
            price="4.99"
            year="($59.88/year)"
            button="Get Started Now"
            features={[
              "Unlimited Videos Unlimited Length",
              "YouTube Downloads & Transcriptions",
              "Twitter Downloads & Transcriptions",
              "Instagram Downloads & Transcriptions",
            ]}
            unavailable={[]}
          />
        </div>
      </div>
    </div>
  );
}
