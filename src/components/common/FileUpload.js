import React from "react";

export default class FileUpload extends React.Component {

    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e.dataTransfer.files)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.props.addFiles(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    render = () => (
        <div className="file-upload text-center cursor-pointer"
             onDragOver={this.handleDrag}
             onDrop={this.handleDrop}>
            <label className="w-100 cursor-pointer"
                   htmlFor="file-upload">
                Drag&Drop <br/>
                or <br/>
                Click Here <br/>
                to upload files

                <input type="file"
                       id="file-upload"
                       className="d-none"
                       onChange={(e) => this.props.addFiles(e.target.files)}
                       multiple/>
            </label>
        </div>
    )
}