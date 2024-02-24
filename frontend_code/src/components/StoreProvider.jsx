import React, {createContext} from "react";

const initialState = {
    user: null,
    topic: null,
    currentView: "login",
};

function reducer(state, action)
{
    switch(action.type)
    {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
            };
        case "SET_TOPIC":
            return {
                ...state,
                focusedTopic: action.payload,
            };
        case "SET_VIEW":
            console.log(`Setting current view to: ${action.payload}`);
            return {
                ...state,
                currentView: action.payload,
            };

        default:
            return state;
    }
}

export const AppContext = createContext(initialState);

export class StoreProvider extends React.Component {
    constructor(props) {
        super(props);

        // Load the stored state, or fall back to the initial state if there is none
        const storedState = JSON.parse(window.localStorage.getItem('myContext')) || initialState;

        this.state = storedState;
        this.dispatch = action => this.setState(state => reducer(state, action));
    }

    componentDidUpdate() {
        // Whenever state updates, store it in the local storage
        window.localStorage.setItem('myContext', JSON.stringify(this.state));
    };

    render() {
        return (
            <AppContext.Provider value={
                {
                    state: this.state,
                    dispatch: this.dispatch,
                }
            }>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}
