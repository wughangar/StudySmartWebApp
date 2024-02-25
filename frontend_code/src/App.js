import React from 'react';
import './App.css';

import MainView from './components/MainView';
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {persistor, store} from "./reducers/index";

class App extends React.Component
{
    render()
    {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <MainView/>
                </PersistGate>
            </Provider>);
    }
}

export default App;
