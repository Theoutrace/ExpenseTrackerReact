import React from "react";
import "./SingleExpense.css";
import iconMoney from "./imagesExp/money.png";
import iconCat from "./imagesExp/category.png";

const SingleExpense = (props) => {
//   console.log(props);
  return (
    <div className={props.className}>
      <div className="amt-cat-container">
        <div className="amt-cntnr">
          <div className="img-logo-cnt-nr">
            <img src={iconMoney} alt="" width="25"></img>
          </div>
          <div className="amt-txt-cnt">₹ {props.expObj.amount}</div>
        </div>
        <div className="amt-cntnr">
        <div className="img-logo-cnt-nr">
            <img src={iconCat} alt="" width="25"></img>
          </div>
          <div className="amt-txt-cnt size-prob">{props.expObj.category}</div>
        </div>
      </div>
      <div className="desc-otr-cntr">
        <div className="desc-title-txt">Description: </div>
        <div className="desc-desc-txt-usr-dfnd">{props.expObj.description}</div>
      </div>
    </div>
  );
};

export default SingleExpense;
