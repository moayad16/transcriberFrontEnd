import React from "react";
import "../css/card.css";
import "animate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";

export default function Card({animation, title, description, price, features, unavailable, year, button}) {
    
  return (
    <div className={`crd ${title.includes("Current Plan") && 'crd-current'} ${animation} `}>
      <h1 className="title">{title}</h1>
      <p className="description">
        {description}
      </p>
      <h1 className="price">
          ${price} <span className="month">/Month {year}</span>
      </h1>
      <button className={`btn ${title.includes("Current Plan") && 'cancel'} btn-primary`}>{button}</button>
      <div className="cardBody">
        {
            features.map((feature) => {
                return (
                  <div className="feature">
                    <div className="icon">
                      <FontAwesomeIcon icon={faCheck} />{" "}
                    </div>
                    <span style={{textAlign:"left"}}>{feature}</span>
                  </div>
                );
            })
        }
        {
            unavailable.map((feature) => {
                return (
                  <div className="feature unavailable">
                    <div className="icon">
                      <FontAwesomeIcon
                        style={{ color: "black", opacity: 0.5 }}
                        icon={faClose}
                      />{" "}
                    </div>
                    <span style={{ textAlign: "left" }}>{feature}</span>
                  </div>
                );
            })
        }  
      </div>
    </div>
  );
}
