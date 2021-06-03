import React, { Component } from 'react';
import { Toast } from 'react-bootstrap';

export default class MyToast extends Component {
    render() {
        return ( < div >
            <Toast >
            <Toast.Header className = { "bg-success text-white" } closeButton = {false}>
            <strong className = "mr-auto" > Success </strong>
             </Toast.Header> 
            <Toast.Body >

            </Toast.Body> 
            </Toast>
             </div>


        );

    };

}