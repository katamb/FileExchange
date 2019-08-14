import React from 'react'
import {Doughnut} from 'react-chartjs-2';
import {BACKEND_ADDRESS} from "./mainConstants";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.getFreeSpace();
        this.geTotalSpace();
        this.state = {
            freeSpace: 0,
            totalSpace: 0,
        }
    }

    getFreeSpace = () => {
        fetch(`${BACKEND_ADDRESS}/get/available/disk/space`, {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({freeSpace: parseFloat(json).toFixed(2)});
        })
    };

    geTotalSpace = () => {
        fetch(`${BACKEND_ADDRESS}/get/total/disk/space`, {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((json) => {
            this.setState({totalSpace: parseFloat(json).toFixed(2)});

        })
    };

    render = () => (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <h1>File exchanging app</h1>

                    <h3 className="pt-3">Available space on device</h3>
                    <div className="graph-wrapper mx-auto">
                        <Doughnut data={{
                            datasets: [{
                                data: [
                                    this.state.freeSpace,
                                    (this.state.totalSpace - this.state.freeSpace).toFixed(2)
                                ],
                                backgroundColor: [
                                    '#00e5ff',
                                    '#ff9100'
                                ]
                            }],
                            labels: [
                                'Free space (gb)',
                                'Used space (gb)'
                            ]
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
