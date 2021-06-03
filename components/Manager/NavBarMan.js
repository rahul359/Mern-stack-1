import React,  { Component }  from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../images/sun5.jpg';
import {FaAlignRight} from 'react-icons/fa';

class NavBarMan extends Component {
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
          <Link to="/manager">
            <img src={logo} alt="SunBeach Resort" />
          </Link>
          <button type="button" className="nav-btn" onClick={this.handleToggle}>
            <FaAlignRight className="nav-icon" />
          </button>
          </div>
          <ul className={this.state.isOpen?"nav-links show-nav":"nav-links"}>
            <li>
              <Link to="/manager">Home</Link>
            </li>
             <li>
              <Link to="/manager/allrooms">Room List</Link>
            </li>
            <li>
              <Link to="/manager/currentorders">ActiveBookings</Link>
            </li>
            <li>
              <Link to="/manager/orders">TotalBookings</Link>
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


export default NavBarMan;