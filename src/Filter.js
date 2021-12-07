import React, {useEffect, useState} from 'react';
import "./filter.css"
import logo from './img/logo.png';
// import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-multi-date-picker";


function Filter({btn}) {
    const today = new Date()

    // today.setDate(today.getDate() + 1)

    const [dates, setDates] = useState([today])

    const [searchDate,setSearchDate]=useState()

    useEffect(()=>{
        console.log("Date ; ",today)
    },[])

    return(
        <div className="filter">
            <div className="filter__divs dates__div">
                <div className="filter__div__head">
                    <p>Select date</p>
                </div>
                <div className="filter__div__data">
                    <DatePicker
                        selected={dates}
                        placeholder="Select your date..."
                        minDate={today}
                    />
                </div>
            </div>
            <div className="filter__divs dates__div">
                <div className="filter__div__head">
                    <p>Select Profession</p>
                </div>
                <div className="filter__div__data">

                </div>
            </div>
            <div>
                <button onClick={btn}>close</button>
            </div>
        </div>
    )
}

export default Filter;
