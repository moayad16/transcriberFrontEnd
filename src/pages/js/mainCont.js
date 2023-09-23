import React, {useRef, useEffect, useState } from "react";
import "../css/mainCont.css";
import "animate.css";
import SideBar from "../../components/js/sideBar";
import { useSelector } from "react-redux";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Transcribe from "../../components/js/transcribe";
import History from "../../components/js/history";
import Subscription from "../../components/js/subscription";


export default function MainCont() {

  const MainComponent = useSelector(
    (state) => state.mainComponent
  )

  
  const [width, setWidth] = useState(window.innerWidth);
  const [translation, setTranslation] = useState(0);
  const [closed, setClosed] = useState(true);
  const [viz, setViz] = useState(false);
  const sideBarRef = useRef(null);

  useEffect(() => {
    setWidth(window.innerWidth);
    if (width < 1300) {
      setClosed(true);
      setViz(true);
    }
  }, [window.innerWidth]);

  const handleOpen = () => {
    setClosed(false);
    setTranslation((sideBarRef.current.offsetWidth / window.innerWidth) * 100 );
  };

  const handleClose = () => {
    setClosed(true);
    setTranslation(0);
  };

  return (
    <div style={!closed? {overflowX: "hidden"} : {overflowX: "hidden"}} className="mainCont">
      <div className="row">
        <div ref={sideBarRef} className="col-lg-4 sideBar">
          <SideBar close={handleClose} width={width} />
        </div>
        <div
          style={{ transform: `translateX(${translation}%)` }}
          className={`${width < 1300 ? "col-lg-12 mobileViewMainCont" : "col-lg-9"} mainComponent`}
        >
          <div
            className="sideBarToggle"
            style={viz ? { display: "flex" } : { display: "none" }}
          >
            <FontAwesomeIcon
              className="animate__animated animate__fadeIn"
              onClick={handleOpen}
              style={!closed && { display: "none" }}
              icon={faBars}
              size="xl"
            />
            <FontAwesomeIcon
              className="animate__animated animate__fadeIn"
              onClick={handleClose}
              style={closed && { display: "none" }}
              icon={faClose}
              size="xl"
            />
          </div>
          {(() => {
            switch (MainComponent) {
              case "Transcribe":
                return <Transcribe width={width} />;
              case "History":
                return <History width={width} />;
              case "Subscription":
                return <Subscription width={width} />;
              default:
                return <Transcribe width={width} />;
            }
          })()}
        </div>
      </div>
    </div>
  );
}

// max width before things start to look bad is 1280 px
