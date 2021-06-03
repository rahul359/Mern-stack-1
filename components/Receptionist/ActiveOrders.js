
import React, { Component } from 'react';

import { Card, Table, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faList, faTrash } from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import axios from 'axios';
import NavBarRecep from './NavBarRecep';




export default class AllOrders extends Component {


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


    checkOutOrder = (_id) => {
         
         axios.get("http://localhost:8082/api/hotel/book/get/order/" + _id,
         { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
           .then(res=> {
            console.log('response => ' + JSON.stringify(res));
            let price = res.data.amountDetails.dueAmount;
            console.log(price);
           
            localStorage.setItem('price',price);
           
          
          })
        
       window.location.href = "/receptionist/checkout";
        
        
           
            
    };

    // payOnline = (order) => {

    //     axios.post("http://localhost:8082/payment/createOrder", order,
    //     { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
    //         .then(response => {
    //             var data=response.data;
    //             this.updatePaymentOnServer(data,order);
    //             this.paymentStart(data, order);

    //         }).catch((error) => {
    //             console.error("Error" + error);
    //         });
    // };

    // paymentStart(data, order) {
    //     if (data.status == 'created') {
    //         //open payment form
    //         let options = {
    //             key: 'rzp_test_x40ZKnagweZ0Gi',
    //             src:"https://checkout.razorpay.com/v1/checkout.js",
    //             amount: data.amount,
    //             currency: 'INR',
    //             name: 'SunBeach Resort',
    //             description: 'Book Room',
    //             image: "",
    //             order_id: data.id,
    //             handler: (response) => {
    //                 this.updatePaymentOnServer(response, order);
    //             },
    //             prefill: {
    //                 "name": order.guest.name,
    //                 "email": order.guest.email,
    //                 "contact": order.guest.mobileNo
    //             },
    //             notes: {
    //                 address: "SunBeach Resort, Bengaluru"
    //             },
    //             theme: {
    //                 color: "#F37254"
    //             },
    //         };

    //         var paymentObject = new window.Razorpay(options);
		

    //         paymentObject.paymentObject("payment.failed", (response) => {
    //             // this.paymentErrorUpdate(order);
    //         });

    //         paymentObject.open();
    //     }
    // };

    // updatePaymentOnServer(response, order) {
    //     var paymentResponse = { status: "PAID", paymentId: response.razorpay_payment_id };
    //     axios.post(`http://localhost:8082/payment/result/${order._id}`, paymentResponse,
    //     { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
    //         .then(response => {
    //             alert(response.message);

    //         }).catch((error) => {
    //             console.error("Error" + error);
    //         });

    // };





    render() {
        return (<div>
            <NavBarRecep />
            <div style={
                { "display": this.state.show ? "block" : "none" }} >
                < MyToast children={
                    { show: this.state.show, message: "checkOut successful" }}
                /> </div>
            <Card className={"border border-dark bg-white text-dark"}>
                <Card.Header> < FontAwesomeIcon icon={faList} /> Active Orders </Card.Header>
                <Card.Body>
                    <Table bordered hover striped  >
                        <thead>
                            <tr>
                                <th> Order Id </th>
                                <th> checkIn</th>
                                <th> checkOut</th>
                                <th> noOfGuests </th>
                                <th>CheckOut</th>
                               



                            </tr>
                        </thead>
                        <tbody>
                            {this.state.orders.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6" > Orders  </td>
                                </tr> : this.state.orders.map((order) => (<tr key={order._id} >

                                    <td> {order._id} </td>
                                    <td> {order.checkIn} </td>
                                    <td> {order.checkOut} </td>
                                    <td> {order.noOfGuests} </td>


                                    <td>
                                        <Button variant="outline-primary" onClick={this.checkOutOrder.bind(this, order._id)}>Pay $ : {order.amountDetails.dueAmount}<FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
                                    </td>
                                     {/* <td>
                                        <Button variant="outline-secondary" onClick={this.payOnline.bind(this, order)}>Pay Rs : {order.amountDetails.dueAmount}</Button>
                                    </td> */}

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

