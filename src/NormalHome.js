import React, {useEffect, useState} from "react"
// import {Link} from "react-router-dom";
// import logo from "./img/logo.png";
import './topnav.css'
import {db} from "./firebase";


const NormalHome = ({userDetails}) => {

    const [userDb,setUserDb]=useState([]);


    useEffect(()=>{
        db.collection("users")
            .doc(userDetails.uid)
            .onSnapshot(doc => {
                setUserDb(doc.data());
            })

        console.log(userDb)
    },[])

    // console.log("user detail : ",userDb)
    // console.log("user : ",userDetails.uid)


    if (userDb.verified==="true"){
        return (
            <>
                <div className="normalhome">
                    verified
                </div>
            </>
        )
    }else{
        return (
            <>
                <div className="normalhome">
                    not verified
                </div>
            </>
        )
    }
}

export default NormalHome;