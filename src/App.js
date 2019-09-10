import React from 'react';
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import configureStore, {history} from './state/store'
import Home from "./components/Home";
import Navigation from "./components/layout/Navigation";
import ModalRoot from "./components/layout/ModalRoot";
import PageNotFound from "./components/error/PageNotFound";
import FileUpload from "./components/upload/FileUpload";
import FilesList from "./components/file/FilesList";
import {Route, Switch} from "react-router-dom";
import FileDetails from "./components/file/FileDetails";
import SchoolView from "./components/school/SchoolView";

function App() {
    const store = configureStore();

    return (
        <div className="main-content">
            <Provider store={store}>
                <Navigation/>
                <ModalRoot/>

                <div className="min-h-100">
                    <ConnectedRouter history={history}>
                        <Switch>
                            <Route exact path="/" component={Home}/>

                            <Route exact path="/files/upload" component={FileUpload}/>
                            <Route exact path="/files/access" component={FilesList}/>
                            <Route exact path="/file/details/:fileId" component={FileDetails}/>

                            <Route exact path="/school" component={SchoolView}/>

                            <Route path="/*" component={PageNotFound}/>
                        </Switch>
                    </ConnectedRouter>
                </div>

            </Provider>
        </div>
    );
}

export default App;
