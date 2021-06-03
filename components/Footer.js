import { Fragment } from "react";
import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";



export default function Footer() {
    return (
        <Fragment>
            <footer className="footer">
                <div className="mt-5 d-flex footer-main justify-content-around bg-light">
                    <div className="footer-content">
                        <h3>
                            SunBeach Resort
                        </h3>
                        <div>
                            {/* <i className="fa fa-envelope" /> */}
                            <p>
                                <Link to="#">
                                    support@sunbeachresort.com
                            </Link>
                            </p>
                        </div>

                      

                        <p>Copyright &copy; 2021 SunBeachResort.com</p>
                    </div>

                    <div className="footer-content">
                        <div>
                            {/* <i className="fa fa-map-marker" /> */}
                            <p>
                                <span>SunBeach Resort Pvt. Ltd., Mumbai </span>, India
                    </p>
                        </div>

                        <div>
                            {/* <i className="fa fa-phone" /> */}
                            <p>+1 555 123456</p>
                        </div>
                        <div>
                            {/* <i className="fa fa-phone" /> */}
                            <p>Reception 24 H</p>
                        </div>

                 
                    </div>

                    <div className="footer-content footer-right">

                        <h6 className="font-weight-bold">About the company</h6>
                        <p>Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
                        euismod convallis velit, eu auctor lacus vehicula sit amet.
                        </p>

                        <div className="footer-icons">
                            <Link to="#">
                                {/* <i className="fa fa-facebook" /> */}
                            </Link>
                            <Link to="#">
                                {/* <i className="fa fa-twitter" /> */}
                            </Link>
                            <Link to="#">
                                {/* <i className="fa fa-linkedin" /> */}
                            </Link>
                            <Link to="#">
                                {/* <i className="fa fa-github" /> */}
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </Fragment>
    );
}