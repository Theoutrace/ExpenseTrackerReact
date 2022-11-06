import React, { useEffect, useState } from "react";

const ExpContext = React.createContext({
  totalExpense: 0,
  addExp: () => {},
  removeExp: () => {},
  expItems: [],
});

export const ExpContextProvider = (props) => {
  const [expen, setExpen] = useState([]);
  const [count, setCount] = useState(0); // just to run the useEffect
  console.log("should call first");

  useEffect(() => {
    console.log("useEffect called");
    // console.log(expen);

    fetch(
      "https://expensetracker-c1fe6-default-rtdb.firebaseio.com/expenses.json",
      {
        method: "GET",
      }
    ).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          if (!data) {
            setExpen(() => []);
          } else {
            // console.log(data);

            const result = Object.keys(data).map((key) => [
              { id: key.toString(), values: data[key] },
            ]);
            // console.log(result);
            setExpen(() => [...result]);
          }
        });
      }
    });
  }, [count]);

  //=============================ADD ====================================================================================

  const addExpenseHandler = (expObj) => {
    // console.log(expObj);
    if (expObj.id) {
      // this is to edit
      // console.log(expObj.id);
      fetch(
        `https://expensetracker-c1fe6-default-rtdb.firebaseio.com/expenses/${expObj.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({ ...expObj.values }),
        }
      ).then((res) => {
        if (res.ok) {
          // setExpen((previous) => [...previous, expObj]);
          setCount((pre)=>pre+1)
        } else {
          console.log("edit has error");
        }
      });
    } else {
      fetch(
        "https://expensetracker-c1fe6-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          body: JSON.stringify({ ...expObj.values }),
        }
      ).then((res) => {
        if (res.ok) {
          // setExpen((previous) => [...previous, expObj]);
          setCount((pre)=>pre+1)
        } else {
          console.log("addition has error");
        }
      });
    }
  };

  //==============================REMOVE===================================================================================

  const removeExpHandler = (expObjWithId) => {
    // console.log(expObjWithId);
    fetch(
      `https://expensetracker-c1fe6-default-rtdb.firebaseio.com/expenses/${expObjWithId.id}.json`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.ok) {
        setCount((pre) => pre - 1);
      } else {
        console.log("error in delete");
      }
    });
  };

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
