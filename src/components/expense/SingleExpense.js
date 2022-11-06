import React, { useContext, useState } from "react";
import "./SingleExpense.css";
import iconMoney from "./imagesExp/money.png";
import iconCat from "./imagesExp/category.png";
import iconEdit from "./imagesExp/write.png";
import iconDel from "./imagesExp/delete.png";
import ExpContext from "../../Store/expenseCtx/exp-context";

const SingleExpense = (props) => {
  // console.log(props.expObj[0]);

  // const itemId = props.expObj[0].id
  const itemVal = props.expObj[0].values;
  // console.log(itemVal);

  const expCtx = useContext(ExpContext);

  const deleteObjHandler = () => {
    expCtx.removeExp(props.expObj[0]);
  };

  const editObjHandler = () => {
    props.onClickEdit(props.expObj[0]);
  };

  return (
    <div className="item-edit-dlt-container">
      {console.log("rendering done")}
      <div className="edt-cntr-btn-cntenr">
        <div className="dlt-edit-btn-cntr">
          <button onClick={editObjHandler}>
            <img src={iconEdit} alt="" width="26px"></img>
          </button>
        </div>
      </div>
      <div className={props.className}>
        <div className="amt-cat-container">
          <div className="amt-cntnr">
            <div className="img-logo-cnt-nr">
              <img src={iconMoney} alt="" width="25"></img>
            </div>
            <div className="amt-txt-cnt">₹ {itemVal.amount}</div>
          </div>
          <div className="amt-cntnr">
            <div className="img-logo-cnt-nr">
              <img src={iconCat} alt="" width="25"></img>
            </div>
            <div className="amt-txt-cnt size-prob">{itemVal.category}</div>
          </div>
        </div>
        <div className="desc-otr-cntr">
          <div className="desc-title-txt">Description: </div>
          <div className="desc-desc-txt-usr-dfnd">{itemVal.description}</div>
        </div>
      </div>
      <div className="edt-dlt-cntr-btn-cntenr">
        <div className="dlt-edit-btn-cntr edit-btn-itm">
          <button onClick={deleteObjHandler}>
            <img src={iconDel} alt="" width="25px"></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleExpense;
