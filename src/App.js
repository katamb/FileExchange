import React from 'react';
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
import {Route, Switch} from 'react-router';
import configureStore, {history} from './state/store'
import Home from "./components/Home";
import Navigation from "./components/layout/Navigation";
import VideoPlayer from "./components/video/VideoPlayer";
import ModalRoot from "./components/layout/ModalRoot";
import PageNotFound from "./components/error/PageNotFound";
import VideoUpload from "./components/video/VideoUpload";
import PhotoUpload from "./components/photo/PhotoUpload";
import PhotosPage from "./components/photo/PhotosPage";
import PhotoDetails from "./components/photo/PhotoDetails";

function App() {
    const store = configureStore();

    return (
        <div className="d-flex flex-column flex-grow-1 h-100">
            <Provider store={store}>
                <Navigation/>
                <ModalRoot/>

                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/videos/watch" component={VideoPlayer}/>
                        <Route exact path="/videos/upload" component={VideoUpload}/>
                        <Route exact path="/photos/watch" component={PhotosPage}/>
                        <Route exact path="/photo/details/:photoId" component={PhotoDetails}/>
                        <Route exact path="/photos/upload" component={PhotoUpload}/>
                        <Route path="/*" component={PageNotFound}/>
                    </Switch>
                </ConnectedRouter>

            </Provider>
        </div>
    );
}

export default App;
