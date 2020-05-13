import { warmTheme, roseTheme } from '../colorthemes'

const initialState={
    currentTheme: {...warmTheme},
}

export default function (state=initialState, action) {
    console.log("IN REDUCER: " + action.theme)
    switch(action.type) {
        case "THEME_PICKER":
            let newState = {
                ...state,
                currentTheme: {...state.currentTheme, ...action.theme},
            }
            return newState
        default:
            return state
    }
}