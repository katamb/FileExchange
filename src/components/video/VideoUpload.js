import React from 'react';
import FileUpload from "../common/FileUpload";

export default class VideoUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: []
        }
    }

    addVideos = (data) => {
        //const files = data.map(file => file[0])
//
        //let newList = this.state.videos.concat(files);
        //console.log(newList)
        //this.setState({videos: newList});
    };

    render = () => (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5">

                    <FileUpload addFiles={this.addVideos}/>
                </div>
            </div>
        </div>
    )
}