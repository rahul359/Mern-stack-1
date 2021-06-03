import React, { Component } from 'react';

import { Card, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faUndo } from '@fortawesome/free-solid-svg-icons';
import NavigationBar from './NavigationBar';

import axios from 'axios';

export default class Employee extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.employeeChange = this.employeeChange.bind(this);
        this.submitEmployee = this.submitEmployee.bind(this);

    }

    initialState = {
       registeredNo: '',
       password:'',
       email:'',
        name: '',
        designation: '',
        age: '',
        salary: '',
        status:''
    }


    componentDidMount() {
        const registeredNo =+this.props.match.params.registeredNo;
        if(registeredNo){
               this.findEmployeeByregisteredNo(registeredNo);
        }
    }


    findEmployeeByregisteredNo = (registeredNo) => {
        axios.get("http://localhost:9090/user/employee/"+registeredNo,
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
        .then(response => {
              if(response.data != null) {
                  this.setState({
                      registeredNo: response.data.registeredNo,
                      password: response.data.password,
                      email: response.data.email,
                      name: response.data.name,
                      designation: response.data.designation,
                      age: response.data.age,
                      salary: response.data.salary,
                      status: response.data.status
                  });
              }
        }).catch((error) => {
            console.error("Error" +error);
        });

    }

    resetEmployee = () => {
        this.setState(() => this.initialState);
    }

    submitEmployee = event => {

        event.preventDefault();

        const employee = {
            registeredNo: this.state.registeredNo,
            password: this.state.password,
            email: this.state.email,
            name: this.state.name,
            designation: this.state.designation,
            age: this.state.age,
            salary: this.state.salary,
            status: this.state.status

        };

        axios.post("http://localhost:9090/user/employee", employee,
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}} )
            .then(response => {
                if (response.data != null) {
                    this.setState(this.initialState);
                    alert("Employee Saved Successfully");
                }

            });

    }

    employeeChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }



    render() {
        

        return (
               
             <Card className = { "border border-dark bg-white text-dark" }>
                 <NavigationBar />
            <Card.Header> <FontAwesomeIcon icon = { faPlusSquare }/>Add Employee </Card.Header >
            <Form onReset = { this.resetEmployee }
            onSubmit = { this.submitEmployee }
            id = "EmployeeFormId">
            <Card.Body>
            <Form.Row>
            <Form.Group as = { Col }
            controlId = "formGridRegisteredNumber" >
            <Form.Label> Registered Number </Form.Label> 
            <Form.Control required autoComplete = "off"
            type = "number"
            name = "registeredNo"
            value = { this.state.registeredNo }
            onChange = { this.employeeChange }
            className = { "bg-dark text-white" }
            placeholder = "Enter Registered Number"/>
            </Form.Group>
             <Form.Group as = { Col }
            controlId = "formGridRegisteredNumber" >
            <Form.Label> Password </Form.Label> 
            <Form.Control required autoComplete = "off"
            type = "password"
            name = "password"
            value = { this.state.password }
            onChange = { this.employeeChange }
            className = { "bg-dark text-white" }
            placeholder = "Enter password"/> 
            </Form.Group>
              </Form.Row> 

            <Form.Row>
            <Form.Group as = { Col }
            controlId = "formGridType" >
            <Form.Label> Email </Form.Label> 
            <Form.Control required type = "email"
            autoComplete = "off"
            name = "email"
            value = { this.state.email }
            onChange = { this.employeeChange }
            className = { "bg-dark text-white" }
            placeholder = "Enter Email" />
            </Form.Group> 
             <Form.Group as = { Col }
            controlId = "formGridType" >
            <Form.Label> Name </Form.Label> 
            <Form.Control required type = "text"
            autoComplete = "off"
            name = "name"
            value = { this.state.name }
            onChange = { this.employeeChange }
            className = { "bg-dark text-white" }
            placeholder = "Enter Name" />
            </Form.Group>
            </Form.Row>


            <Form.Row >
            <Form.Group as = { Col }
            controlId = "formGridNumberOfGuests" >
            <Form.Label> Designation </Form.Label> <Form.Control required autoComplete = "off"
            type = "text"
            name = "designation"
            value = { this.state.designation }
            onChange = { this.employeeChange }
            className = { "bg-dark text-white" }
            placeholder = "Enter Designation" />
            </Form.Group> <Form.Group as = { Col }
            controlId = "Age" >
            <Form.Label > Age </Form.Label> <Form.Control required autoComplete = "off"
            type = "number"
            name = "age"
            value = {this.state.age }
            onChange = { this.employeeChange }
            className = { "bg-dark text-white" }
            placeholder = "Enter Age" />
            </Form.Group> </Form.Row> 
            <Form.Row>
           <Form.Group as = { Col }
            controlId = "salary" >
            <Form.Label > Salary </Form.Label> <Form.Control required autoComplete = "off"
            type = "number"
            name = "salary"
            value = {this.state.salary }
            onChange = { this.employeeChange }
            className = { "bg-dark text-white" }
            placeholder = "Enter Salary" />
            </Form.Group>
            <Form.Group as = { Col }
            controlId = "formGridStatus" >
            <Form.Label> Status </Form.Label> 
            <Form.Control required autoComplete = "off"
            type = "boolean"
            name = "status"
            value = { this.state.status }
            onChange = { this.employeeChange }
            className = { "bg-dark text-white" }
            placeholder = "Status"/>
            </Form.Group >
             </Form.Row> 
             </Card.Body> <Card.Footer style = {
                { "textAlign": "right" } } >
            <Button size = "sm"
            variant = "success"
            type = "submit" >
            <FontAwesomeIcon icon = {faSave}/> {this.state.registeredNo ? "Submit" : "Submit"} </Button> { ' '} 
            <Button size = "sm" variant = "info" type = "reset" >
            <FontAwesomeIcon icon = { faUndo }/>Reset  </Button> 
            </Card.Footer> 
            </Form> 
            </Card>
        );
    }

}