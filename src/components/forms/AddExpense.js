import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/auth/auth";
import { expenseActions } from "../../Store/expenseCtx/expense";
import SingleExpense from "../expense/SingleExpense";
import ExpenseSkeleton from "../loaderSkeletons/ExpenseSkeleton";
import premiumIcon from "../expense/imagesExp/premium.png";
import "./AddExpense.css";

const AddExpense = () => {
  const expense = useSelector((state) => state.expense.expense);
  const totalExp = useSelector((state) => state.expense.totalExpense);
  const email = useSelector((state) => state.auth.email);
  const [objId, setObjId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [askPremium, setAskPremium] = useState(false);

  const dispatch = useDispatch();

  const meoneyRef = useRef();
  const descRef = useRef();
  const catRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    if (email) {
      const plainEmail = email.replace(/[^a-zA-Z0-9]/g, "");
      if (plainEmail.length > 0) {
        fetch(
          `https://expensetracker-c1fe6-default-rtdb.firebaseio.com/expenses/${plainEmail}.json`,
          {
            method: "GET",
          }
        ).then((res) => {
          if (res.ok) {
            return res.json().then((data) => {
              if (!data) {
                dispatch(expenseActions.getExpense([]));
              } else {
                const result = Object.keys(data).map((key) => [
                  { id: key.toString(), values: data[key] },
                ]);
                dispatch(expenseActions.getExpense(result));
                setIsLoading(false);
              }
            });
          }
        });
      }
    }
    if (expense.length === 0) {
      dispatch(expenseActions.premiumCheck(0));
    }
  }, [expense.length, dispatch, email]);

  useEffect(() => {
    // console.log('rendering');
    const token = localStorage.getItem("token");
    if (token) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyC4NwKi-WNuGvMdl2_U3M7motBl31iKQO4",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
          }),
          headers: { "Content-Type": "application/json" },
        }
      ).then((res) =>
        res.json().then((data) => {
          dispatch(authActions.getEmail(data.users[0].email));
        })
      );
    }
  }, [dispatch]);

  const singleExpFormSubmitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = meoneyRef.current.value;
    const enteredDesc = descRef.current.value;
    const enteredCat = catRef.current.value;

    let id = objId;
    const expObj = {
      id: id,
      values: {
        amount: enteredAmount,
        description: enteredDesc,
        category: enteredCat,
      },
    };

    //===========================================================================

    if (email) {
      const plainEmail = email.replace(/[^a-zA-Z0-9]/g, "");
      console.log(plainEmail);
      if (expObj.id) {
        setIsLoading(true);
        fetch(
          `https://expensetracker-c1fe6-default-rtdb.firebaseio.com/expenses/${plainEmail}/${expObj.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify({ ...expObj.values }),
          }
        ).then((res) => {
          if (res.ok) {
            setIsLoading(false);
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
          } else {
            console.log("addition has error");
          }
        });
      }
      dispatch(expenseActions.addExpense([...expense, [expObj]]));
      //=========================================================================================================
    }

    meoneyRef.current.value = "";
    descRef.current.value = "";
    catRef.current.value = "";
    // id = null;
    setObjId(null);
  };

  const editExpenseHandler = (objWithId, style) => {
    setObjId(objWithId.id);

    meoneyRef.current.value = objWithId.values.amount;
    descRef.current.value = objWithId.values.description;
    catRef.current.value = objWithId.values.category;
  };

  //calculating expense

  useEffect(() => {
    console.log("running");
    let totalExp = 0;
    expense.map((exp) => {
      totalExp = Number(totalExp) + Number(exp[0].values.amount);
      dispatch(expenseActions.premiumCheck(totalExp));
    });

    if (totalExp >= 10000) {
      setAskPremium(true);
    } else {
      setAskPremium(false);
    }
  }, [dispatch, expense]);

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
      <div className="total-exp-container">
        {isLoading && <>please wait...</>}
        {!isLoading && (
          <Fragment>
            <div className="total-text">Total: </div>
            <div className="total-text-exp">₹ {totalExp}</div>
            {askPremium && (
              <div className="button-container-activ-pre">
                <button>
                  Activate Premium{" "}
                  <img src={premiumIcon} alt="" width="14"></img>
                </button>
              </div>
            )}
          </Fragment>
        )}
      </div>
      {isLoading && expense.length !== 0 && <ExpenseSkeleton />}
      {!isLoading && expense && (
        <div className="all-exp-container-tog">
          {expense.map((itm) => {
            return (
              <SingleExpense
                key={`${itm[0].values.category}${
                  itm[0].values.description
                }${Math.random().toString()}`}
                className="ssingle-obj adExp-form-cont-ner"
                expObj={itm}
                onClickEdit={editExpenseHandler}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AddExpense;
