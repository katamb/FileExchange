import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Link} from "react-router-dom";

/*@connect(
    (state, props) => {
        changePage
    },
    (dispatch) => {
        changePage: () => console.log("wut")
    }

)*/
export default class Home extends React.Component {
    render = () => (
        <div>
            <h1>Home</h1>
            <p>Welcome home!</p>
            <Link to="/">Home</Link> <Link to="/about">Hello</Link>
        </div>
    )
}