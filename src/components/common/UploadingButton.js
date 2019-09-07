import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

export default class UploadingButton extends React.Component {

    render = () => (
        <div className="text-center my-3">
            <Button disabled>
                <Spinner as="span"
                         animation="border"
                         size="sm"
                         role="status"
                         aria-hidden="true" />
                <span>&nbsp;Uploading...</span>
            </Button>
        </div>
    )
}