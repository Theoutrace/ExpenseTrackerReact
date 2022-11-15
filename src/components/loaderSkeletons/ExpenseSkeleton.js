import React from "react";
import "./ExpenseSkeleton.css";

const ExpenseSkeleton = () => {
  return (
    <div className="item-edit-dlt-container-hi">
      <div className="expense-dummy-box"></div>
      <div className="expense-dummy-box"></div>
      <div className="expense-dummy-box"></div>
    </div>
  );
};

export default ExpenseSkeleton;
