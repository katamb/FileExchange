import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import fileIcon from "./../../assets/file.svg"
import {BACKEND_ADDRESS} from "../mainConstants";
import {IMG_FILE_TYPE} from "../common/constants";

export default class FileListPreview extends React.Component {

    constructor(props) {
        super(props);
        this.getFileInfo();
        this.state = {
            filePreview: fileIcon,
            file: {}
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.getFileInfo();
        }
    }

    getFileType = (file) => {
        return (file !== undefined) ? file.fileType.split("/")[0] : "";
    };

    getFileInfo = () => {
        fetch(`${BACKEND_ADDRESS}/info/file/${this.props.fileId}`, {
            method: 'GET'
        }).then((response) => {
            if (response.status !== 200) {
                this.props.openErrorModal(response.message);
            } else {
                response.json().then((json) => {
                    if (this.getFileType(json) === IMG_FILE_TYPE) {
                        this.setState({
                            filePreview: `${BACKEND_ADDRESS}/get/file/${this.props.fileId}`,
                            file: json
                        });
                    } else {
                        this.setState({
                            file: json
                        });
                    }
                });
            }
        })
    };

    render = () => (
        <div className="col-sm-4 col-md-3 col-lg-2 mb-2">
            <Card className="cursor-pointer">
                <Link to={`/file/details/${this.props.fileId}`}>
                    <Card.Img variant="top"
                              src={this.state.filePreview}
                              alt="File preview..."/>
                    {false &&
                        <h3 className="protruding-on-svg">{this.state.file.originalFileName}</h3>}
                    <Card.Title>{this.state.file.originalFileName}</Card.Title>
                </Link>
            </Card>
        </div>
    )

}
