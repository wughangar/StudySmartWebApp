import React from 'react';
import './App.css';

import MainView from './components/MainView'
import {StoreProvider} from './components/StoreProvider';


function App() {

    return (
        <StoreProvider>
            <MainView/>
        </StoreProvider>
    );
}

export default App;
