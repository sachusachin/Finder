import React, {useEffect, useState} from "react"
import "./userhome.css";
import {db} from "./firebase";
// import firebase from "firebase/compat";
import logo from "./img/logo.png";
import Loding from "./Loding";


const Userhome = ({userDetails,logout}) => {

    const [userDb,setUserDb]=useState("");



    //To get user Detail from the firestore

    useEffect(()=>{
        db.collection("users")
            .doc(userDetails.uid)
            .get()
            .then(doc => {
                const data = doc.data();
                setUserDb(data); //
            },[]);
    })

    console.log("user docs : ",userDb)
    console.log("user : ",userDetails.uid)



     if (userDb===""){
         return (
             <Loding />
         )
     }else {
         return(
             <div className="userhome">
                 <div className="userhome__body">
                     <div className="userhome__top">
                         <div className="back__btn">
                             <button onClick={logout}>
                                 <i className="fas fa-angle-left"> </i>
                             </button>
                         </div>
                         <div className="logo__image">
                             <div className="image">
                                 <img src={logo} alt="logo"/>
                             </div>
                         </div>
                     </div>
                     <div>
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