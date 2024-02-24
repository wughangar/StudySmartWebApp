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
        case "POP_STATE":
            console.log("Popping state...");
            // Retrieve the previous state stack and parse it
            const stateStack = JSON.parse(window.localStorage.getItem('previous_state'));

            // Pop the latest state from the stack
            if(stateStack)
            {
                const previousState = JSON.parse(stateStack.pop());
                window.localStorage.setItem('previous_state', JSON.stringify(stateStack)); // Update localStorage with the rest of the state stack
                return previousState;
            }

            return state;

        default:
            return state;
    }
}

export const AppContext = createContext(initialState);

export class StoreProvider extends React.Component
{
    constructor(props)
    {
        super(props);

        // Load the stored state, or fall back to the initial state if there is none
        const storedState = JSON.parse(window.localStorage.getItem('current_state')) || initialState;
        this.state        = storedState;
        this.dispatch     = action => this.setState(state => reducer(state, action));
    }

    componentDidUpdate(prevProps, prevState)
    {
        // Only push to stack when state.currentView has changed
        if(prevState.currentView !== this.state.currentView ||
           prevState.focusedTopic !== this.state.focusedTopic)
        {
            // Store the old state in previous_state stack
            let previousStateStack = JSON.parse(window.localStorage.getItem('previous_state')) || [];
            previousStateStack.push(JSON.stringify(prevState));

            // Limit the size to 10
            if(previousStateStack.length > 10)
            {
                previousStateStack.shift(); // Remove the oldest state
            }

            window.localStorage.setItem('previous_state', JSON.stringify(previousStateStack));
        }

        // Store the current state
        const currentState = JSON.stringify(this.state);
        window.localStorage.setItem('current_state', currentState || initialState);
    }


    componentDidMount()
    {
        //window.addEventListener('popstate', this.handleBackButton);
    }

    componentWillUnmount()
    {
        //window.removeEventListener('popstate', this.handleBackButton);
    }

    render()
    {
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
