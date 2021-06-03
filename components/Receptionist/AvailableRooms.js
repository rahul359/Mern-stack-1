import React, { Component } from 'react';

import { Card, Form, Button,Table, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faList,faPlusSquare, faUndo } from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import NavBarRecep from './NavBarRecep';


import axios from 'axios';

export default class AvailableRooms extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.roomChange = this.roomChange.bind(this);
        this.submitRoom = this.submitRoom.bind(this);
        
    }

    initialState = {
      rooms: [],
      
       checkIn: '',
        checkOut: '',
        noOfGuests: ''
        
    }


    resetRoom = () => {
        this.setState(() => this.initialState);
    }

    submitRoom = event => {

        event.preventDefault();

        const room = {
            checkIn: this.changeDateFormatToBackend(this.state.checkIn),
            checkOut: this.changeDateFormatToBackend(this.state.checkOut),
            noOfGuests: this.state.noOfGuests

        };
            
        axios.post("http://localhost:9090/search/room", room,
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response => response.data)
        .then((data) => {
          this.setState({ rooms: data });
           });
    }

    roomChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    changeDateFormatToBackend(dateString) {
      let dateArray = dateString.split("-");
      let year = dateArray[0];
      let month = dateArray[1];
      let date = dateArray[2];
      return `${date}/${month}/${year}`;
    }

    render() {

        return (

             
             <Card className = { "border border-dark bg-white text-black" }>
             <NavBarRecep />
            <Card.Header> <FontAwesomeIcon icon = { faPlusSquare }/>Available Rooms </Card.Header >
            <Form onReset = { this.resetRoom }
            onSubmit = { this.submitRoom }
            id = "RoomFormId">
            <Card.Body>
            <Form.Row>
            <Form.Group as = { Col }
            controlId = "formGridRoomNumber" >
            <Form.Label> Check-In </Form.Label> 
          
            <Form.Control required autoComplete = "off"
            name = "checkIn"
            type="date"
            value = { this.state.checkIn }
            onChange = { this.roomChange }
            className = { "bg-dark text-white" }
            placeholder = "Enter CheckIn"/>
            </Form.Group> <Form.Group as = { Col }
            controlId = "formGridType" >
            <Form.Label> Check-Out </Form.Label> 
            <Form.Control required type = "date"
            autoComplete = "off"
            name = "checkOut"
            value = { this.state.checkOut }
            onChange = { this.roomChange }
            className = { "bg-dark text-white" }
            placeholder = "Enter Check-Out" />
            </Form.Group> 
            </Form.Row> 
            <Form.Row >
            <Form.Group as = { Col }
            controlId = "formGridNumberOfGuests" >
            <Form.Label> Number Of Guests </Form.Label> <Form.Control required autoComplete = "off"
            type = "number"
            name = "noOfGuests"
            value = { this.state.noOfGuests }
            onChange = { this.roomChange }
            className = { "bg-dark text-white" }
            placeholder = "Enter Num of Guests" />
            </Form.Group> 
            </Form.Row>
             </Card.Body>             
              <Card.Footer style = {
                { "textAlign": "right" } } >
            <Button size = "sm"
            variant = "success"
            type = "submit" >
            <FontAwesomeIcon icon = {faSave}/> {this.state.roomNo ? "Update" : "Submit"} </Button> { ' '} 
            <Button size = "sm" variant = "info" type = "reset" >
            <FontAwesomeIcon icon = { faUndo }/>Reset  </Button> 
            </Card.Footer> 
            </Form>        
            <div style = {
                { "display": this.state.show ? "block" : "none" } } >
            <
            MyToast children = {
                { show: this.state.show, message: "" } }
            /> </div> 
            <Card className = { "border border-dark bg-white text-dark" }>
            <Card.Header> < FontAwesomeIcon icon = { faList }/> Room List</Card.Header>
            <Card.Body>
            <Table bordered hover striped variant >
            <thead>
            <tr>
            <th> Type </th> 
            <th> Room Number</th> 
            <th> Capacity</th> 
            <th> Price </th> 
            </tr> 
            </thead> 
            <tbody> 
                {this.state.rooms.length === 0 ?
                <tr align = "center">
                <td colSpan = "6" > Rooms  </td> 
                </tr> :this.state.rooms.map((room) => ( <tr key = { room.roomNo } >
                    <td> { room.type } </td> 
                    <td> { room.roomNo } </td> 
                    <td> { room.noOfGuests } </td> 
                    <td> { room.pricePerDay } </td>
                    </tr>
                ))
            } </tbody> 
            </Table>
            </Card.Body>
             </Card>
            </Card>
       

    

        );
    }

}