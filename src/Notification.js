import React, {useEffect} from "react"
// import {Link} from "react-router-dom";
// import logo from "./img/logo.png";
import './notification.css'



const Notification = ({profileurl}) => {

    useEffect(()=>{
        window.scroll(0,0)
    },[])

    return (
        <div className="no__notification"> </div>

    )
}

export default Notification;