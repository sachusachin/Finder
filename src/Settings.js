import React, {useEffect} from "react"
// import {Link} from "react-router-dom";
// import logo from "./img/logo.png";
import './topnav.css'

const Settings = ({userDetails,logout}) => {

    useEffect(()=>{
        window.scroll(0,0)
    },[])


    return (
        <>
            Settings
            <button onClick={logout}>logout</button>
        </>
    )
}

export default Settings;