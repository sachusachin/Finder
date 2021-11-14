import React, {useEffect} from "react"
// import {Link} from "react-router-dom";
// import logo from "./img/logo.png";
import './bookinghistory.css'




const BookingHistory = ({userDetails}) => {


    useEffect(()=>{
        window.scroll(0,0)
    },[])


    return (
        <div className="no__bookinghistory">

        </div>
    )
}

export default BookingHistory;