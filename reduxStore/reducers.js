import { warmTheme, roseTheme } from '../colorthemes'
import * as firebase from 'firebase'

const initialState={
    currentTheme: {...warmTheme},
}

export const reducer = (state=initialState, action) => {
    // console.log("IN REDUCER: " + action.theme)
    // console.log("IN REDUCER: " + action.value)
    switch(action.type) {
        case "THEME_PICKER":
            return {
                ...state,
                currentTheme: action.theme
            }
        default:
            return state
    }
}
