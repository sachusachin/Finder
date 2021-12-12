import React, {useEffect, useState} from 'react';
import "./filter.css"
import logo from './img/logo.png';
// import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-multi-date-picker";
import {Input} from "./Settings";
import {cityNames, worksData} from "./Datas";
import {db} from "./firebase";


function Filter({btn,searchHandler,work,setWork,city,setCity}) {
    const today = new Date()

    // today.setDate(today.getDate() + 1)

    const [dates, setDates] = useState([today])


    useEffect(()=>{
        console.log("Date ; ",today)
    },[])

    const selectHandler = (event) => {
        setWork(event.target.innerText.trim())
    }
    const workHandler = (e) => {
        const workvalue = e.target.value
        setWork(workvalue)
    }

    const selectHandler1 = (event) => {
        setCity(event.target.innerText.trim())
    }
    const cityHandler = (e) => {
        const cityvalue = e.target.value
        setCity(cityvalue)
    }






    return(
        <div className="filter">
            <div className="filter__divs dates__div">
                <div className="filter__div__head">
                    <p>Date</p>
                </div>
                <div className="filter__div__data">
                    <DatePicker
                        selected={dates}
                        placeholder="Select your date..."
                        minDate={today}
                    />
                </div>
            </div>
            <div className="filter__divs works__div">
                <div className="filter__div__head">
                    <p>Work</p>
                </div>
                <div className="filter__div__data">
                    <div className="input work__input">
                        <input type="text" value={work} onChange={workHandler} placeholder="Select Work.."/>
                    </div>
                    {
                        (!worksData.includes(work) && work !== "" ) &&

                        <ul className="works__ul">{
                            worksData.map((data)=>{
                                if(data.toLocaleLowerCase().trim().includes(work.toLocaleLowerCase().trim())){
                                    return(
                                        <li key={data} onClick={selectHandler}>{data}</li>
                                    )
                                }else if(work===""){
                                    return <>hi</>
                                }
                            })
                        }</ul>
                    }
                </div>
            </div>
            <div className="filter__divs cities__div">
                <div className="filter__div__head">
                    <p>City</p>
                </div>
                <div className="filter__div__data">
                    <div className="input work__input">
                        <input type="text" value={city} onChange={cityHandler} placeholder="Select City.."/>
                    </div>
                    {
                        (!cityNames.includes(city) && city !== "" ) &&

                        <ul className="works__ul">{
                            cityNames.map((data)=>{
                                if(data.toLocaleLowerCase().trim().includes(city.toLocaleLowerCase().trim())){
                                    return(
                                        <li key={data} onClick={selectHandler1}>{data}</li>
                                    )
                                }else if(city===""){
                                    return <></>
                                }
                            })
                        }</ul>
                    }
                </div>
            </div>
            <div className="search__close__btns">
                <div className="search__btn">
                    <button onClick={searchHandler}>Search</button>
                </div>
                <div className="close__btn">
                    <button onClick={btn}>close</button>
                </div>
            </div>
        </div>
    )
}


export default Filter;
