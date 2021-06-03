import React from 'react';
import './dashboard-section.css';
import { Link } from 'react-router-dom';
import NavBarRecep from './Receptionist/NavBarRecep';

export default function Dashboard() {
    return (
        <>
        <NavBarRecep />
            <section className="dashboard-sections">
                <div className="section-1-container mt-5">
                    <h1 className="text-center">Our Rooms</h1>

                    <div className="wrapper d-flex justify-content-center flex-wrap">

                        <div className="section-1-content room-img-1">
                            <Link to="/receptionist/gallery"> <span className="btn-light btn-sm btn">REGULAR</span></Link>
                        </div>
                        <div className="section-1-content room-img-2">
                            <Link to="/receptionist/gallery"><span className="btn-light btn-sm btn">DELUXE</span></Link>
                        </div>
                        <div className="section-1-content room-img-3">
                            <Link to="/receptionist/gallery"><span className="btn-light btn-sm btn">SUPER DELUXE</span></Link>
                        </div>
                        <div className="section-1-content room-img-4">
                            <Link to="/receptionist/gallery"><span className="btn-light btn-sm btn">PREMIUM</span></Link>
                        </div>
                    </div>
                </div>
            </section>
            </>
    )
}
