
import React, { Component } from 'react';

import { Card, Table, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faList, faTrash } from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import axios from 'axios';
import NavBarMan from './NavBarMan';

export default class CurrentBookings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        };
    }

    componentDidMount() {
        this.findAllOrders();

    }

    findAllOrders() {
        axios.get("http://localhost:8082/api/hotel/book/get/order/active",
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            .then(response => response.data)
            .then((data) => {
                this.setState({ orders: data });
            });

    };








    render() {
        return ( <div>
        <NavBarMan />
            <div style = {
                { "display": this.state.show ? "block" : "none" } } >
            <MyToast children = {
                { show: this.state.show, message: "checkOut successful" } }/> </div> 
            <Card className = { "border border-dark bg-white text-dark" }>
            <Card.Header> < FontAwesomeIcon icon = { faList }/> Active Orders </Card.Header>
            <Card.Body>
            <Table bordered hover striped  >
            <thead>
            <tr>
            <th> Order Id </th> 
            <th> checkIn</th> 
            <th> checkOut</th> 
            <th> noOfGuests </th> 
            
        


            </tr> 
            </thead> 
            <tbody> 
                {this.state.orders.length === 0 ?
                <tr align = "center">
                <td colSpan = "6" > Orders  </td> 
                </tr> :this.state.orders.map((order) => ( <tr key = { order._id } >

                    <td> { order._id } </td> 
                    <td> { order.checkIn } </td> 
                    <td> { order.checkOut } </td> 
                    <td> { order.noOfGuests } </td> 

                  
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

