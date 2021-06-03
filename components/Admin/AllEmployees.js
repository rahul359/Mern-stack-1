import React, { Component } from 'react';

import { Card, Table, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faList, faTrash } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from './MyToast';
import axios from 'axios';
import NavigationBar from './NavigationBar';

export default class AllEmployees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: []
        };
    }

    componentDidMount() {
        this.findAllEmployees();

    }

    findAllEmployees() {
        axios.get("http://localhost:9090/user/employee",
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            .then(response => response.data)
            .then((data) => {
                this.setState({ employees: data });
            });

    };

    deleteEmployee = (registeredNo) => {
        axios.delete("http://localhost:9090/user/employee/" + registeredNo,
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}})
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                    this.setState({
                        employees: this.state.employees.filter(employee => employee.registeredNo !== registeredNo)
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
            < MyToast children = {
                { show: this.state.show, message: "Employee Deleted" } }
            /> </div> 
            <Card className = { "border border-dark bg-white text-dark" }>
            <Card.Header> < FontAwesomeIcon icon = { faList }/> Employee List</Card.Header>
            <Card.Body>
            <Table bordered hover striped  >
            <thead>
            <tr>
            <th> Registered No </th> 
        
            <th>Email</th>
            <th> Name </th> 
            <th> Designation </th> 
            <th> Age</th> 
            <th> Salary </th>
            <th> Actions</th>


            </tr> 
            </thead> 
            <tbody> 
                {this.state.employees.length === 0 ?
                <tr align = "center">
                <td colSpan = "8" > Employees Available. </td> 
                </tr> :this.state.employees.map((employee) => ( <tr key = { employee.registeredNo } >

                    
                    <td> { employee.registeredNo } </td>
                
                    <td> { employee.email } </td>  
                    <td> { employee.name } </td> 
                    <td> { employee.designation } </td> 
                    <td> { employee.age } </td> 
                    <td> { employee.salary } </td> 
                    <td>
                    <ButtonGroup>
                    <Link to = { "/admin/update/"+employee.registeredNo } className = "btn btn-sm btn-outline-primary" > < FontAwesomeIcon icon = { faEdit } /></Link> { '' }
                
                  <Button size = "sm"
                    variant = "outline-danger"
                    onClick = { this.deleteEmployee.bind(this, employee.registeredNo) } > < FontAwesomeIcon icon = { faTrash }
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