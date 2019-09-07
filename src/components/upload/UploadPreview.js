import React from "react";
import Card from "react-bootstrap/Card";
import fileIcon from "../../assets/file.svg"
import {IMG_FILE_TYPE} from "../common/constants";

export default class UploadPreview extends React.Component {

    constructor(props) {
        super(props);
        const fileExtension = this.getExtensionFromName(props.file);
        const fileType = this.getFileType(props.file);
        this.state = {
            defaultPreview: true,
            fileExtension: fileExtension,
            fileType: fileType,
            filePreview: fileIcon
        }
    }

    componentDidMount() {
        if (this.state.fileType === IMG_FILE_TYPE) this.loadPreview();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.file !== this.props.file) {
            const fileExtension = this.getExtensionFromName(this.props.file);
            const fileType = this.getFileType(this.props.file);
            if (fileType === IMG_FILE_TYPE) this.loadPreview();
            this.setState({
                fileExtension: fileExtension,
                defaultPreview: true,
                fileType: fileType
            });
        }
    }

    getExtensionFromName = (file) => {
        return (file !== undefined) ? file.name.split(".").pop() : "";
    };

    getFileType = (file) => {
        return (file !== undefined) ? file.type.split("/")[0] : "";
    };

    loadPreview = () => {
        let reader = new FileReader();
        reader.onload = (event) => {
            this.setState({
                defaultPreview: false,
                filePreview: event.target.result
            });
        };
        reader.readAsDataURL(this.props.file);
    };

    render = () => (
        <div className="col-sm-4 col-md-4 col-lg-3 mb-2">
            <Card className="cursor-pointer border-danger-on-hover"
                  onClick={() => this.props.removeFile(this.props.keyProp)}>
                {!this.state.defaultPreview &&
                <Card.Img variant="top" src={this.state.filePreview} alt="File preview..."/>}

                {this.state.defaultPreview &&
                <div>
                    <Card.Img className="upload-preview" variant="top" src={this.state.filePreview} alt="File preview..."/>
                    <div className="on-top-file">
                        <h3>{this.state.fileExtension}</h3>
                    </div>
                </div>}

                <Card.Body className="p-2 text-center">
                    <Card.Title className="m-0">{this.props.file.name}</Card.Title>
                </Card.Body>
            </Card>
        </div>
    )
}
