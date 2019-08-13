import Card from "react-bootstrap/Card";
import React from "react";
import {Link} from "react-router-dom";
import {BACKEND_ADDRESS} from "../mainConstants";

export default class PhotoPreviewView extends React.Component {

    render = () => (
        <div className="col-sm-12 col-md-6 my-2">
            <Card className="cursor-pointer"
                  onClick={() => {
                  }}>
                <Link to={`/photo/details/${this.props.photoId}`}>
                    <Card.Img variant="top"
                              src={`${BACKEND_ADDRESS}/get/photo/${this.props.photoId}`}
                              alt="Image preview..."/>
                </Link>
            </Card>
        </div>
    )
}