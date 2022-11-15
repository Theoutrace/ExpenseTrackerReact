import React, { useContext, useEffect, useState } from "react";


const ExpContext = React.createContext({
  totalExpense: 0,
  addExp: () => {},
  removeExp: () => {},
  expItems: [],
});

export const ExpContextProvider = (props) => {
  const authCtx = useContext('AuthContext')
  // console.log(authCtx);
  const plainEmail = authCtx.email.replace(/[^a-zA-Z0-9]/g,'')
  // console.log(plainEmail);
  const [expen, setExpen] = useState([]);
  const [count, setCount] = useState(0); // just to run the useEffect

  useEffect(() => {

    if(plainEmail.length>0){
      fetch(
        `https://expensetracker-c1fe6-default-rtdb.firebaseio.com/expenses/${plainEmail}.json`,
        {
          method: "GET",
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            if (!data) {
              setExpen(() => []);
            } else {
              const result = Object.keys(data).map((key) => [
                { id: key.toString(), values: data[key] },
              ]);
              setExpen(() => [...result]);
            }
          });
        }
      });

    }

  }, [count,plainEmail]);

  //=============================ADD ====================================================================================

  const addExpenseHandler = (expObj) => {
    if (expObj.id) {

      fetch(
        `https://expensetracker-c1fe6-default-rtdb.firebaseio.com/expenses/${plainEmail}/${expObj.id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({ ...expObj.values }),
        }
      ).then((res) => {
        if (res.ok) {
          setCount((pre)=>pre+1)
        } else {
          console.log("edit has error");
        }
      });
    } else {
      fetch(
        `https://expensetracker-c1fe6-default-rtdb.firebaseio.com/expenses/${plainEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify({ ...expObj.values }),
        }
      ).then((res) => {
        if (res.ok) {
          setCount((pre)=>pre+1)
        } else {
          console.log("addition has error");
        }
      });
    }
  };

  //==============================REMOVE===================================================================================

  const removeExpHandler = (expObjWithId) => {
    fetch(
      `https://expensetracker-c1fe6-default-rtdb.firebaseio.com/expenses/${plainEmail}/${expObjWithId.id}.json`,
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
