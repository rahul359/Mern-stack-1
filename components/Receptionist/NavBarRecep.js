import React,  { Component }  from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../images/sun5.jpg';
import {FaAlignRight} from 'react-icons/fa';

class NavBarRecep extends Component {
    state={
        isOpen:false
      }
      handleToggle = () =>{
        this.setState({isOpen:!this.state.isOpen})
      }
    render() {
        return ( 
                <nav className="navbar">
      <div className="nav">
        <div className="nav-header">
          <Link to="/receptionist">
            <img src={logo} alt="SunBeach Resort" />
          </Link>
          <button type="button" className="nav-btn" onClick={this.handleToggle}>
            <FaAlignRight className="nav-icon" />
          </button>
          </div>
          <ul className={this.state.isOpen?"nav-links show-nav":"nav-links"}>
            <li>
              <Link to="/receptionist">Home</Link>
            </li>
             <li>
              <Link to="/receptionist/gallery">Gallery</Link>
            </li>
             <li>
              <Link to="/receptionist/totalrooms">Rooms</Link>
            </li>
            <li>
              <Link to="/receptionist/search">AvailableRooms</Link>
            </li>
            <li>
              <Link to="/receptionist/Booking">Booking</Link>
            </li>
                        <li>
              <Link to="/receptionist/activeorders">ActiveOrders</Link>
            </li>
                        <li>
              <Link to="/receptionist/Orders">TotalOrders</Link>
            </li>
            <li>
              <Link to="/">LogOut</Link>
            </li>
          </ul>
      </div>
       </nav>
            
            


        );
    }
}


export default NavBarRecep;