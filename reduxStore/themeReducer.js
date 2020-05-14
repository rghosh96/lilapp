import { warmTheme, roseTheme } from '../colorthemes'

const initialState={
    currentTheme: {...warmTheme},
}

export default function (state=initialState, action) {
    console.log("IN REDUCER: " + action.theme)
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