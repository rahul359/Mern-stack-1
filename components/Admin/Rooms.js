import React, { Component } from 'react';

import { Card, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faUndo } from '@fortawesome/free-solid-svg-icons';
import NavigationBar from './NavigationBar';

import axios from 'axios';

export default class Rooms extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.roomChange = this.roomChange.bind(this);
        this.submitRoom = this.submitRoom.bind(this);

    }

    initialState = {
       roomNo: '',
        type: '',
        noOfGuests: '',
        pricePerDay: '',
        status: ''
    }


    componentDidMount() {
        const roomNo =+this.props.match.params.roomNo;
        if(roomNo){
               this.findRoomByroomNo(roomNo);
        }
    }


    findRoomByroomNo = (roomNo) => {
        axios.get("http://localhost:9090/room/room/"+roomNo,
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response => {
              if(response.data != null) {
                  this.setState({
                      roomNo: response.data.roomNo,
                      type: response.data.type,
                      noOfGuests: response.data.noOfGuests,
                      pricePerDay: response.data.pricePerDay,
                      status: response.data.status
                  });
              }
        }).catch((error) => {
            console.error("Error" +error);
        });

    }

    resetRoom = () => {
        this.setState(() => this.initialState);
    }

    submitRoom = event => {

        event.preventDefault();

        const room = {
            roomNo: this.state.roomNo,
            type: this.state.type,
            noOfGuests: this.state.noOfGuests,
            pricePerDay: this.state.pricePerDay,
            status: this.state.status

        };

        axios.post("http://localhost:9090/room/room", room,
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            .then(response => {
                if (response.data != null) {
                    this.setState(this.initialState);
                    alert("Room Saved Successfully");
                }

            });

    }

    roomChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }



    render() {
        

        return (
            
             <Card className = { "border border-dark bg-white text-dark" }>
             <NavigationBar />
            <Card.Header> <FontAwesomeIcon icon = { faPlusSquare }/>Add Room </Card.Header >
            <Form onReset = { this.resetRoom }
            onSubmit = { this.submitRoom }
            id = "RoomFormId">
            <Card.Body>
            <Form.Row>
            <Form.Group as = { Col }
            controlId = "formGridRoomNumber" >
            <Form.Label> Room Number </Form.Label> 
            <Form.Control required autoComplete = "off"
            type = "number"
            name = "roomNo"
            value = { this.state.roomNo }
            onChange = { this.roomChange }
            className = { "bg-dark text-white" }
            placeholder = "Enter RoomNumber"/>
            </Form.Group> <Form.Group as = { Col }
            controlId = "formGridType" >
            <Form.Label> Room Type </Form.Label> 
            <Form.Control required type = "text"
            autoComplete = "off"
            name = "type"
            value = { this.state.type }
            onChange = { this.roomChange }
            className = { "bg-dark text-white" }
            placeholder = "Enter RoomType" />
            </Form.Group> 
            </Form.Row> 
            <Form.Row >
            <Form.Group as = { Col }
            controlId = "formGridNumberOfGuests" >
            <Form.Label> Capacity </Form.Label> <Form.Control required autoComplete = "off"
            type = "number"
            name = "noOfGuests"
            value = { this.state.noOfGuests }
            onChange = { this.roomChange }
            className = { "bg-dark text-white" }
            placeholder = "Enter Capacity" />
            </Form.Group> <Form.Group as = { Col }
            controlId = "formGridPricePerDay" >
            <Form.Label > Price Per Day </Form.Label> <Form.Control required autoComplete = "off"
            type = "number"
            name = "pricePerDay"
            value = {this.state.pricePerDay }
            onChange = { this.roomChange }
            className = { "bg-dark text-white" }
            placeholder = "Enter Price Per Day" />
            </Form.Group> </Form.Row> 
            <Form.Row>
            <Form.Group as = { Col }
            controlId = "formGridStatus" >
            <Form.Label> Status </Form.Label> 
            <Form.Control required autoComplete = "off"
            type = "boolean"
            name = "status"
            value = { this.state.status }
            onChange = { this.roomChange }
            className = { "bg-dark text-white" }
            placeholder = "Status"/>
            </Form.Group >
             </Form.Row> 
             </Card.Body> <Card.Footer style = {
                { "textAlign": "right" } } >
            <Button size = "sm"
            variant = "success"
            type = "submit" >
            <FontAwesomeIcon icon = {faSave}/> Submit </Button> { ' '} 
            <Button size = "sm" variant = "info" type = "reset" >
            <FontAwesomeIcon icon = { faUndo }/>Reset  </Button> 
            </Card.Footer> 
            </Form> 
            </Card>
        );
    }

}