// step 2(c): create theme reducer slice.

import { createSlice } from "@reduxjs/toolkit";

const initialThemeSlice = {theme: null}

const themeSlice = createSlice({
    name: 'theme',
    initialState: initialThemeSlice,
    reducers: {
        forPremium(state){
            state.theme = 'darkMode-theme-premium'
        },
        forNormal(state){
            state.theme= null
        }
    }
})

export const themeActions = themeSlice.actions
export default themeSlice.reducer