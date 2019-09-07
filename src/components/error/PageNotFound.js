import React from 'react';
import {Link} from "react-router-dom";

export default class PageNotFound extends React.Component {

    render = () => (
        <div className="error-background">
            <div className="text-center">
                <h2 className="padding-10-percent">404</h2>
                <h2>Page not found</h2>
                <br/>
                <Link className="btn btn-light" to="/">
                    Return to Home Page
                </Link>
            </div>
        </div>
    )
}