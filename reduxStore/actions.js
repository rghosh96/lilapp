import * as firebase from 'firebase'

export const themePicker = (themeName) => {
    console.log("IN ACTION: " + themeName)
    return(dispatch) => {
        dispatch({
            type: "THEME_PICKER",
            theme: themeName
        })
    }
}

