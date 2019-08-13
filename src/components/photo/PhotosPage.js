import React from 'react'
import PhotoPreviewView from "./PhotoPreviewView";
import {BACKEND_ADDRESS} from "../mainConstants";

export default class PhotosPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: []
        }
    }

    componentDidMount() {
        fetch(`${BACKEND_ADDRESS}/get/photos`, {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({photos: json});
        })
    }

    render = () => (
        <div className="container-fluid">
            <div className="row justify-content-center">
                {this.state.photos.map((photoId, index) =>
                    <PhotoPreviewView key={index} photoId={photoId}/>)}
            </div>
        </div>
    )
}

