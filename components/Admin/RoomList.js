import React, { Component } from 'react';

import { Card, Table, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faList, faTrash } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from './MyToast';
import axios from 'axios';
import NavigationBar from './NavigationBar';

export default class RoomList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        };
    }

    componentDidMount() {
        this.findAllRooms();

    }

    findAllRooms() {
        axios.get("http://localhost:9090/room/room",
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            .then(response => response.data)
            .then((data) => {
                this.setState({ rooms: data });
            });

    };

    deleteRoom = (roomNo) => {
        axios.delete("http://localhost:9090/room/room/" + roomNo,
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                    this.setState({
                        rooms: this.state.rooms.filter(room => room.roomNo !== roomNo)
                    });
                } else {
                    this.setState({ "show": false });
                }
            });
    };


    render() {
        return ( <div>
        <NavigationBar />
            <div style = {
                { "display": this.state.show ? "block" : "none" } } >
            <
            MyToast children = {
                { show: this.state.show, message: "Room Deleted" } }
            /> </div> 
            <Card className = { "border border-dark bg-white text-dark" }>
            <Card.Header> < FontAwesomeIcon icon = { faList }/> Room List</Card.Header>
            <Card.Body>
            <Table bordered hover striped  >
            <thead>
            <tr>
            <th> Room Number </th> 
            <th> Room Type </th> 
            <th> Max Capacity </th> 
            <th> Price Per Day ($) </th> 
            <th> Actions </th>


            </tr> 
            </thead> 
            <tbody> 
                {this.state.rooms.length === 0 ?
                <tr align = "center">
                <td colSpan = "6" > Rooms Available. </td> 
                </tr> :this.state.rooms.map((room) => ( <tr key = { room.roomNo} >

                    
                    <td> { room.roomNo } </td> 
                    <td> { room.type } </td> 
                    <td> { room.noOfGuests } </td> 
                    <td> { room.pricePerDay } </td> 
                    <td>
                    <ButtonGroup>
                    <Link to = { "/admin/edit/"+room.roomNo } className = "btn btn-sm btn-outline-primary" > < FontAwesomeIcon icon = { faEdit } /></Link> { '' }
                
                  <Button size = "sm"
                    variant = "outline-danger"
                    onClick = { this.deleteRoom.bind(this, room.roomNo) } > < FontAwesomeIcon icon = { faTrash }
                    /></Button >
                    </ButtonGroup> </td>

                    </tr>

                ))

            } </tbody> 
            </Table> 
            </Card.Body>
             </Card> 
             </div>


        );
    }

}