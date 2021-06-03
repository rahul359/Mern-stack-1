import React,  { Component }  from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../images/sun5.jpg';
import {FaAlignRight} from 'react-icons/fa';

class NavigationBar extends Component {
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
          <Link to="/admin">
            <img src={logo} alt="SunBeach Resort" />
          </Link>
          <button type="button" className="nav-btn" onClick={this.handleToggle}>
            <FaAlignRight className="nav-icon" />
          </button>
          </div>
          <ul className={this.state.isOpen?"nav-links show-nav":"nav-links"}>
            <li>
              <Link to="/admin">Home</Link>
            </li>
            <li>
              <Link to="/admin/employee">Employee</Link>
            </li>
             <li>
              <Link to="/admin/allemployee">Employee List</Link>
            </li>
             <li>
              <Link to="/admin/rooms">Add Room</Link>
            </li>
             <li>
              <Link to="/admin/allrooms">RoomList</Link>
            </li>

              <li>
              <Link to="/admin/Orders">TotalOrders</Link>
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


export default NavigationBar;