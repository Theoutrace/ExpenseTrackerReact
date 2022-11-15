import React, { Fragment, useState } from "react";
import "./SingleExpense.css";
import iconMoney from "./imagesExp/money.png";
import iconCat from "./imagesExp/category.png";
import iconEdit from "./imagesExp/write.png";
import iconDel from "./imagesExp/delete.png";
import nextIcon from "./imagesExp/next.png";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../Store/expenseCtx/expense";

const SingleExpense = (props) => {
  const expArr = useSelector((state) => state.expense.expense);
  const email = useSelector((state) => state.auth.email);

  const dispatch = useDispatch();
  const itemVal = props.expObj[0].values;
  // console.log(itemVal);

  const deleteObjHandler = () => {

    const idx = expArr.findIndex((ele) => ele[0].id === props.expObj[0].id);

    if (idx !== -1) {
      if (email) {
        const plainEmail = email.replace(/[^a-zA-Z0-9]/g, "");
        // call api and delete it
        fetch(
          `https://expensetracker-c1fe6-default-rtdb.firebaseio.com/expenses/${plainEmail}/${props.expObj[0].id}.json`,
          {
            method: "DELETE",
          }
        ).then((res) => {
          if (res.ok) {
            // delete from front first================================
            // console.log('this',idx);
            const dummyArr = [...expArr];
            dummyArr.splice(idx, 1);
            // console.log('new arr',dummyArr);
            dispatch(expenseActions.removeExpense([...dummyArr]));

            //====================================
          } else {
            alert("Something Went Wrong! Check Your Connections");
          }
        });
      }
    }
  };

  const editObjHandler = () => {
    // dispatch(expenseActions.editExpense(props.expObj));
    props.onClickEdit(props.expObj[0]);
  };


  return (
    <div className="item-edit-dlt-container">
        <Fragment>
          <div className="edt-cntr-btn-cntenr">
            <div className="dlt-edit-btn-cntr">
              <button onClick={editObjHandler}>
                <img src={iconEdit} alt="" width="26px"></img>
              </button>
            </div>
          </div>
          <div className={`${props.className}`}>
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
              <div className="desc-desc-txt-usr-dfnd">
                {itemVal.description}
              </div>
              <div className="see-details-cls-text">
                Details<img src={nextIcon} alt="" width="10"></img>
              </div>
            </div>
          </div>
          <div className="edt-dlt-cntr-btn-cntenr">
            <div className="dlt-edit-btn-cntr edit-btn-itm">
              <button onClick={deleteObjHandler}>
                <img src={iconDel} alt="" width="25px"></img>
              </button>
            </div>
          </div>
        </Fragment>
    </div>
  );
};

export default SingleExpense;
