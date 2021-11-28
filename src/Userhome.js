import React, {useEffect, useState} from "react"
import "./userhome.css";
import {db} from "./firebase";
import { Offline, Online } from "react-detect-offline";
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
import Protected from "./Protected";
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
        console.log(userDb.profileImage)
    },[])

    useEffect(()=>{
        setProfileurl(userDb.profileImage)
    })

    console.log("user docs : ",userDb)
    // console.log("user : ",userDetails.photoURL+"?access_token="+userDetails?.stsTokenManager?.accessToken)
    console.log(userDb.profileImage)

    const userAvailableHandler = () => {
        setUseravailable(!useravailable)
    }


    if (userDb === "") {
        return (
            <Loding/>
        )
    } else {
        return (
            <>
                <Online>
                    <Router>
                        <div className="userhome">
                            <Topnav profileurl={profileurl}/>
                            <div className="userhome__body">
                                <Routes>
                                    <Route path="/" exact element={<NormalHome userDetails={userDetails}/>}/>
                                    <Route path="/notification" element={<Notification userDetails={userDb}/>}/>
                                    {/*<Route path="/history" element={<BookingHistory userDetails={userDb}/>}/>*/}
                                    {/*<Route path="/settings" element={<Settings userDetails={userDb} logout={logout}/>}/>*/}
                                    <Route path="/settings" element={<Protected Cmp={Settings} userDetails={userDb} logout={logout} /> } />
                                </Routes>
                            </div>
                            <Navbar/>
                        </div>
                    </Router>
                </Online>
                <Offline>
                    <p>Your currently offline</p>
                </Offline>
            </>
        )
    }
}

export default Userhome;