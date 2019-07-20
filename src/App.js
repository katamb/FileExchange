import React from 'react';
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import {Router, Route, Switch} from 'react-router';
import configureStore, {history} from './state/store'
import Home from "./components/Home";
import About from "./components/About";

function App() {
    const store = configureStore();

    return (
        <div>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/about" component={About}/>
                        <Route path="/*" component={() => 'NOT FOUND'}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        </div>
    );
}

export default App;
