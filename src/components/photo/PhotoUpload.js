import React from 'react';
import FileUpload from "../common/FileUpload";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default class PhotoUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: []
        }
    }

    addPhotos = (data) => {
        const files = Array.from(data);
        const newList = this.state.photos.concat(files);

        this.setState({photos: newList});
    };

    removePhotos = (toRemoveName) => {
        const newList = this.state.photos.filter(photo => toRemoveName !== photo.name);
        this.setState({photos: newList});
    };

    render = () => (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-10 col-md-9 col-lg-8 col-xl-7">

                    <label className="pt-3">Upload photos</label>
                    <FileUpload addFiles={this.addPhotos}/>
                    <div className="text-center my-3">
                        <Button>Upload images</Button>
                    </div>

                </div>
                <div className="col-sm-12 col-md-11 col-lg-10 col-xl-10">
                    {this.state.photos.length > 0 &&
                    <label>Preview photos (click to remove)</label>}
                    <div className="row justify-content-center">
                        {this.state.photos.map((photo, index) =>
                            <PhotoPreview key={index}
                                          photo={photo}
                                          removePhoto={(name) => this.removePhotos(name)}/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

class PhotoPreview extends React.Component {

    constructor(props) {
        super(props);
        this.loadPreview(props);
        this.state = {
            photoPreview: null
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps !== this.props) this.loadPreview(nextProps);
    }

    loadPreview = (props) => {
        let reader = new FileReader();
        reader.onload = (event) => this.setState({photoPreview: event.target.result});
        reader.readAsDataURL(props.photo);
    };

    render = () => (
        <div className="col-sm-6 col-md-4 mb-2">
            <Card className="cursor-pointer" onClick={() => this.props.removePhoto(this.props.photo.name)}>
                <Card.Img variant="top" src={this.state.photoPreview} alt="Image preview..."/>
                <Card.Body>
                    <Card.Title>{this.props.photo.name}</Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}