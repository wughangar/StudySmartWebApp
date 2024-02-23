import React, {createContext} from "react";

const initialState = {
    user: null,
    topic: null,
    currentView: null
};

function reducer(state, action) {
    switch (action.type) {
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
            return {
                ...state,
                currentView: action.payload
            }

        default:
            return state;
    }
}

export const AppContext = createContext(initialState);

export class StoreProvider extends React.Component {
    constructor(props) {
        super(props);
        const storedState = JSON.parse(window.localStorage.getItem('myContext'));
        this.state = storedState ? storedState : initialState;
        this.dispatch = action => this.setState(state => reducer(state, action));
    }

    componentDidUpdate() {
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
};
