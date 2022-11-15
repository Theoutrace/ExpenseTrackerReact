
// step 2(b): create reducer slice for expenses
import { createSlice } from "@reduxjs/toolkit"
console.log('expense Reducer ran');


const initialExpenseState = {expense: [], askPremium: false, totalExpense: 0}


const expenseSlice = createSlice({
    name: 'expense',
    initialState: initialExpenseState,
    reducers: {
        getExpense(state, load){
            // get expenses from server and push it to expense : []
            state.expense = load.payload
        },
        addExpense(state, load){
            state.expense = load.payload
        },
        removeExpense(state, load){
            state.expense = load.payload
        },
        premiumCheck(state, load){
            state.totalExpense = load.payload
        }
    }
})

export const expenseActions = expenseSlice.actions
export default expenseSlice.reducer