import React , {Component} from 'react';

import {Card,Form,Button,Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPlusSquare } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import NavBarRecep from './NavBarRecep';


export default class Booking extends Component {

   constructor(props) {
     super(props);
     this.state = this.initialState;
     this.orderChange = this.orderChange.bind(this);
     this.submitOrder = this.submitOrder.bind(this);
   }

   initialState = {
     _id:'',
    checkIn:'',
    checkOut:'',
    noOfGuests:'',
    roomNo:'',
    guest:{
      name:'',
      gender:'',
      company:'',
      email:'',
      mobileNo:'',
      address:''
    }
   }
   
   resetOrder = () => {
     this.setState(() => this.initialState);
   }

   submitOrder = event => {
     event.preventDefault();
     const order = {
       checkIn: this.changeDateFormatToBackend(this.state.checkIn),
       checkOut: this.changeDateFormatToBackend(this.state.checkOut),
       noOfGuests: this.state.noOfGuests,
       roomNo: this.state.roomNo,
       guest:{
         name:this.state.name,
         gender:this.state.gender,
         company:this.state.company,
         email:this.state.email,
         mobileNo:this.state.mobileNo,
         address:this.state.address

       }

     };

     axios.post("http://localhost:8082/order",order,
     { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
       .then(response  => {
             if(response.data != null) {
               this.setState(this.initialState);
               alert("Booking Sucessful");
             }
       });

   }
   
   orderChange = event => {
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
          <Card className={"border border-dark bg-white text-black"}>
             <NavBarRecep />
            <Card.Header> <FontAwesomeIcon icon = { faPlusSquare }/>Booking</Card.Header>
            
            <Form onReset={this.resetOrder} onSubmit={this.submitOrder} id="orderFormId" autoComplete="off" >
            <Card.Body>
              <Form.Row>
            <Form.Group as={Col} controlId="formGridcheckIn">
            <Form.Label>CheckIn</Form.Label>
            <Form.Control type="date" name="checkIn" value={this.state.checkIn} onChange={this.orderChange}
             required className={"bg-dark text-white"} placeholder="Enter checkIn" />
            </Form.Group>
            <Form.Group as={Col} >
            <Form.Label>CheckOut</Form.Label>
            <Form.Control type="date" name="checkOut" value={this.state.checkOut} onChange={this.orderChange}
            required className={"bg-dark text-white"} placeholder="Enter checkOut" />
            </Form.Group>
            </Form.Row>
            <Form.Row>
            <Form.Group as={Col}>
            <Form.Label>noOfGuests</Form.Label>
            <Form.Control type="number" name="noOfGuests" value={this.state.noOfGuests} onChange={this.orderChange}
            required className={"bg-dark text-white"} placeholder="Enter Number Of guests" />
            </Form.Group>
            <Form.Group as={Col} >
            <Form.Label>Room Number</Form.Label>
            <Form.Control type="number" name="roomNo" value={this.state.roomNo} onChange={this.orderChange}
            required className={"bg-dark text-white"} placeholder="Enter RoomNumber" />
            </Form.Group>
            </Form.Row>

            <Form.Row>
            <Form.Group as={Col}>
            <Form.Label>Guest name</Form.Label>
            <Form.Control type="text" name="name" value={this.state.name} onChange={this.orderChange}
            required className={"bg-dark text-white"} placeholder="Enter GuestName" />
            </Form.Group>
            <Form.Group as={Col}>
            <Form.Label>Gender</Form.Label>
            <Form.Control type="text" name="gender" value={this.state.gender} onChange={this.orderChange}
            required className={"bg-dark text-white"} placeholder="Enter Gender" />
            </Form.Group>
            </Form.Row>

            <Form.Row>
            <Form.Group as={Col}>
            <Form.Label>Company</Form.Label>
            <Form.Control type="text" name="company" value={this.state.company} onChange={this.orderChange}
            required className={"bg-dark text-white"} placeholder="Enter Company" />
            </Form.Group>
            <Form.Group as={Col}>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={this.state.email} onChange={this.orderChange}
            required className={"bg-dark text-white"} placeholder="Enter Email" />
            </Form.Group>
            </Form.Row>

            <Form.Row>
            <Form.Group as={Col}>
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control type="tel" name="mobileNo" value={this.state.mobileNo} onChange={this.orderChange}
            required className={"bg-dark text-white"} placeholder="Enter MobileNumber" />
            </Form.Group>
            <Form.Group as={Col}>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" value={this.state.address} onChange={this.orderChange}
            required className={"bg-dark text-white"} placeholder="Enter Address" />
            </Form.Group>
            </Form.Row>


            </Card.Body>
            <Card.Footer>
            <Button size="sm" variant="success" type="submit">
               Submit
            </Button>{ ' '}
            <Button size="sm" variant="info" type="reset">
               Reset
            </Button>
            </Card.Footer>
            </Form>
          </Card>

    );

  }
}