import React, {useEffect, useState} from "react"
import "./userhome.css";
import {db} from "./firebase";
import {BrowserRouter as Router, Routes, Switch} from "react-router-dom";
// import firebase from "firebase/compat";
import logo from "./img/logo.png";
import Loding from "./Loding";
import Navbar from "./Navbar";
import {Route} from "react-router-dom";
import Topnav from "./Topnav";
import BookingHistory from "./BookingHistory";
import Notification from "./Notification";
import Settings from "./Settings";
import NormalHome from "./NormalHome";
import {doc, getDoc} from "@firebase/firestore";
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';



const Userhome =  ({userDetails, logout}) => {

    const [userDb, setUserDb] = useState("");
    const [profileurl, setProfileurl] = useState("");
    const [useravailable, setUseravailable] = useState(true);


    //To get user Detail from the firestore


    useEffect(()=>{
        db.collection("users")
            .doc(userDetails.uid)
            .onSnapshot(doc => {
                const data = doc.data(); // Current User data from firebase ...
                setUserDb(data);
            });
        setProfileurl(userDetails.photoURL+"?access_token="+userDetails?.stsTokenManager?.accessToken)
    },[])

    console.log("user docs : ",userDb)
    console.log("user : ",userDetails.uid)


    const userAvailableHandler = () => {
        setUseravailable(!useravailable)
    }


    if (userDb === "") {
        return (
            <Loding/>
        )
    } else {
        return (
            <Router>
                <div className="userhome">
                    <Topnav profileurl={profileurl}/>
                    <div className="userhome__body">
                        {/*<div className="summa">*/}
                        {/*    <p>{userDb.name}</p>*/}
                        {/*    <p>{userDb.emailid}</p>*/}
                        {/*    <p>{userDb.phonenumber}</p>*/}
                        {/*    <p>{userDb.work}</p>*/}
                        {/*    <p>{userDb.city}</p>*/}
                        {/*    <p>{userDb.address}</p>*/}
                        {/*    <p>{userDb.gender}</p>*/}
                        {/*    <p>{userDb.verified}</p>*/}
                        {/*    <button onClick={logout}>Logout</button>*/}
                        {/*</div>*/}
                        <Routes>
                            <Route path="/" exact element={<NormalHome userDetails={userDetails}/>}/>
                            <Route path="/notification" element={<Notification userDetails={userDb}/>}/>
                            <Route path="/history" element={<BookingHistory userDetails={userDb}/>}/>
                            <Route path="/settings" element={<Settings userDetails={userDb}/>}/>
                        </Routes>
                    </div>
                    <Navbar/>
                </div>
            </Router>
        )
    }
}

export default Userhome;