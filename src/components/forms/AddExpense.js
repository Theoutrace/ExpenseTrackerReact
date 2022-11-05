import React, { useContext, useRef, useState } from "react";
import ExpContext from "../../Store/expenseCtx/exp-context";
import SingleExpense from "../expense/SingleExpense";
import "./AddExpense.css";

const AddExpense = () => {
  const expCtx = useContext(ExpContext)
  // console.log(expCtx);

  const meoneyRef = useRef();
  const descRef = useRef();
  const catRef = useRef();

  const singleExpFormSubmitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = meoneyRef.current.value;
    const enteredDesc = descRef.current.value;
    const enteredCat = catRef.current.value;

    const expObj = {
      amount: enteredAmount,
      description: enteredDesc,
      category: enteredCat,
    };

    expCtx.addExp(expObj)

    meoneyRef.current.value = "";
    descRef.current.value = "";
    catRef.current.value = "";
  };

  return (
    <div className="addExpense-contner">
      <form
        onSubmit={singleExpFormSubmitHandler}
        className="adExp-form-cont-ner"
      >
        <div className="adExp-text-conter">Add Your expense</div>
        <div className="adEx-all-item-t-ner">
          <div className="adEx-mon-ab1-cont-ner">
            <label htmlFor="money-id-id" className="adEx-label-txt-cont-ner">
              Amount
            </label>
            <input
              type="number"
              id="money-id-id"
              className="adEx-input-cont-nr"
              placeholder=" ₹"
              required
              ref={meoneyRef}
            />
          </div>
          <div className="adEx-mon-ab1-cont-ner">
            <label htmlFor="desc-id-id" className="adEx-label-txt-cont-ner">
              Description
            </label>
            <input
              id="desc-id-id"
              className="adEx-input-cont-nr"
              placeholder=" For what it was?"
              required
              ref={descRef}
            />
          </div>
          <div className="adEx-mon-ab1-cont-ner">
            <label htmlFor="cat-id-id" className="adEx-label-txt-cont-ner">
              Category
            </label>
            <select
              type="text"
              id="cat-id-id"
              className="adEx-input-cont-nr select-opt-prev"
              ref={catRef}
            >
              <option disabled>Select</option>
              <option>Food</option>
              <option>Petrol</option>
              <option>EMI</option>
              <option>Party</option>
              <option>Lending</option>
              <option>Medical</option>
            </select>
          </div>
          <div className="sbmt-btn-cntner">
            <button>Submit</button>
          </div>
        </div>
      </form>
      <div className="all-exp-container-tog">
        {expCtx.expItems.map((itm) => {
          return (
            <SingleExpense
              className="ssingle-obj adExp-form-cont-ner"
              expObj={itm}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AddExpense;
