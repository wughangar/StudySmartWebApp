import React from 'react';
import './App.css';

import MainView from './components/MainView';
import {StoreProvider} from './components/StoreProvider';

class App extends React.Component
{


    render()
    {
        return (
            <StoreProvider>
                <MainView/>
            </StoreProvider>
        );
    }
}

export default App;
