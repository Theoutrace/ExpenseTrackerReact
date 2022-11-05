import React, { useEffect, useState } from "react";

const ExpContext = React.createContext({
  totalExpense: 0,
  addExp: () => {},
  removeExp: () => {},
  expItems: [],
});

export const ExpContextProvider = (props) => {
  const [expen, setExpen] = useState([]);

  useEffect(() => {
    fetch(
      "https://expensetracker-c1fe6-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "GET",
      }
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          const objPropName = Object.values(data);
        //   console.log(objPropName);
          setExpen(() => [...objPropName]);
        });
      }
    });
  }, [expen.length]);

  const addExpenseHandler = (expObj) => {
    fetch(
      "https://expensetracker-c1fe6-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "POST",
        body: JSON.stringify({ ...expObj }),
      }
    ).then((res) => {
      if (res.ok) {
        console.log("sent successfully");
      }
    });
    setExpen((previous) => [...previous, expObj]);
  };

  const removeExpHandler = () => {};

  const expContextValue = {
    totalExpense: 0,
    addExp: addExpenseHandler,
    removeExp: removeExpHandler,
    expItems: expen,
  };

  return (
    <ExpContext.Provider value={expContextValue}>
      {props.children}
    </ExpContext.Provider>
  );
};

export default ExpContext;
