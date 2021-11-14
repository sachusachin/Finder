import React, {useState} from "react"
import "./navbar.css"
import {BrowserRouter as Router} from "react-router-dom";
import { NavLink } from 'react-router-dom'
// import bg from './img/home.jpg';
// import logo from './img/logo.png';
// import worker from './img/worker.png';
// import user from './img/find.jpg';

const Navbar = ({googleLogin}) => {

    return (
            <div className="navbar">
                <div className="navbar__center">
                    <div className="option history">
                        <NavLink to="/history" >
                            <div className="icon">
                                <i className="fal fa-history"> </i>
                            </div>
                            <div className="text">
                                History
                            </div>
                        </NavLink>
                    </div>

                    <div className="option notification">
                        <NavLink  to="/notification">
                            <div className="icon">
                                <i className="fal fa-bell"> <span> </span> </i>
                            </div>
                            <div className="text">
                                notification
                            </div>
                        </NavLink>
                    </div>

                    <div className="option settings">
                        <NavLink to="/settings">
                            <div className="icon">
                                <i className="fal fa-cog"> </i>
                            </div>
                            <div className="text">
                                Settings
                            </div>
                        </NavLink>
                    </div>
                </div>
            </div>
    )
}

export default Navbar;