import React, {createContext, useReducer, useState, useEffect} from "react";

const initialState = {
    user: "No User",
    theme: "light",
};

function reducer(state, action) {
    switch (action.type) {
        case "SET_USER":
            console.log("SETTING USER!")
            return {
                ...state,
                ...action.payload,
            };
        case "SET_THEME":
            console.log("SETTING THEME!")
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
}

export const AppContext = createContext(initialState);

export const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer,
        // getting initialState from localStorage or falling back to default initialState
        JSON.parse(window.localStorage.getItem('myContext')) || initialState
    );

    useEffect(() => {
        // save to localStorage whenever state changes
        window.localStorage.setItem('myContext', JSON.stringify(state));
    }, [state]);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    );
};
