import React, {useEffect, useState} from "react"
import "./userhome.css";
import {db} from "./firebase";
// import firebase from "firebase/compat";
import logo from "./img/logo.png";
import Loding from "./Loding";
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';



const Userhome = ({userDetails,logout}) => {

    const [userDb,setUserDb]=useState("");
    const [profileurl,setProfileurl] = useState("");
    const [useravailable,setUseravailable] = useState(true);


    //To get user Detail from the firestore

    useEffect(()=>{
        db.collection("users")
            .doc(userDetails.uid)
            .get()
            .then(doc => {
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



     if (userDb===""){
         return (
             <Loding />
         )
     }else {
         return(
             <div className="userhome">
                 <div className="userhome__body">
                     <div className="userhome__top">
                         <div className="top__head">
                             <button className="menu"><i className="fal fa-cog"> </i> </button>
                             <button className="notification"><i className="fal fa-bell"> </i> <span></span> </button>
                         </div>
                         <div className="center__image">
                             <div className="image">
                                 <img src={ profileurl } alt="profile" />
                             </div>
                             <div className="user__name">
                                 <p>{userDb.name}</p>
                             </div>
                         </div>
                         <div className="userhome__details">

                         </div>
                     </div>
                     <div className="summa">
                         <p>{userDb.name}</p>
                         <p>{userDb.emailid}</p>
                         <p>{userDb.phonenumber}</p>
                         <p>{userDb.work}</p>
                         <p>{userDb.city}</p>
                         <p>{userDb.address}</p>
                         <p>{userDb.gender}</p>
                         <p>{userDb.verified}</p>
                         <button onClick={logout}>Logout</button>
                     </div>
                 </div>
             </div>
         )
     }
}

export default Userhome;