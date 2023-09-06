import React from "react";
import '../css/sideBar.css'
import 'animate.css'
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../../store";

export default function SideBar({width}) {

    const dispatch = useDispatch();
    const mainComponentReducer = bindActionCreators(actionCreators.setMainComponent, dispatch);

    const selectedComponent = useSelector(state => state.mainComponent).mainComponent.name;


    return (
      <div className="sideBarComp">
        <div className="logo">
          {/* <img src={require("../../assets/Logo.png")} alt="logo" /> */}
          <h1>Transcriber</h1>
          <div className="circle"></div>
        </div>
        <div className="navigationPages">
          <ul>
            <li onClick={() => mainComponentReducer( "Transcribe" )} className={(selectedComponent === "Transcribe") && "active"}>Transcribe</li>
            <li onClick={() => mainComponentReducer( "History" )} className={(selectedComponent === "History") && "active"}>History</li>
            <li onClick={() => mainComponentReducer( "Subscription" )}className={(selectedComponent === "Subscription") && "active"}>Subscription</li>
            <li>Settings</li>
          </ul>
        </div>
        <div style={(width<1300)? {marginBottom: "30%"} : null} className="boxTips">
          <img
            className="leftImage"
            src={require("../../assets/Illustration.png")}
            alt="icon1"
          />
          <img
            className="rightImage"
            src={require("../../assets/Illustration copy.png")}
            alt="icon2"
          />
          <h6>Save more money</h6>
          <p>
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim.
          </p>
          <button className="btn btn-primary">Learn More</button>
        </div>
      </div>
    );
}
