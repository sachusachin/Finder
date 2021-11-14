import React from "react"
import {Link} from "react-router-dom";
import logo from "./img/logo.png";
import './topnav.css'




const Topnav = ({profileurl}) => {

    return (
        <div className="top">
            <div className="top__body">
                <div className="top__head">
                    <button className="profile__img">
                        <div className="image">
                            <Link to="/"><img src={ profileurl } alt="profile"/></Link>
                        </div>
                    </button>
                </div>
                <div className="userhome__logo">
                    <div className="logo__image">
                        <img src={logo} alt="logo"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topnav;