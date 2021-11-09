import React, {useEffect, useState} from 'react';
import {db} from "./firebase";
import Register from "./Register";
import Loding from "./Loding";
import Userhome from "./Userhome";
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import ReactDOM from 'react-dom';
// import './signin.css';
// import firebase from "firebase";

function Home({logout,userDetails,userstate,olduser}) {

    const [details,setDetails]=useState([]);
    const [reguser,setRegUser]=useState();

    useEffect(()=>{
        db.collection(`users`).onSnapshot(snapshot =>
            (setDetails(snapshot.docs.map(doc => doc.data())))
        )
    },[]);

    console.log(details)

    useEffect(()=>{
        const register = localStorage.getItem('reg');
        if(register){
            setRegUser(JSON.parse(register));
            console.log("home reg : ",register);
        }
    },[])


    // //Insert new user registration data into the database
    //
    // const dataInsert = async (e) => {
    //     e.preventDefault();
    //
    //     const checkDocs = db.doc(`users/${userDetails.uid}`);
    //
    //     const snapshot = await checkDocs.get();
    //
    //     if (!snapshot.exists){
    //         const username = name;
    //         try{
    //             checkDocs.set({
    //                     name: username
    //                 }
    //             ).then(()=>{
    //                 setName("");
    //                 alert("success");
    //                 localStorage.setItem('olduser',JSON.stringify(true));
    //                 olduser=true;
    //                 setRegUser(true)
    //             })
    //         }catch (error){
    //             console.log(error);
    //         }
    //     }else{
    //         localStorage.setItem('olduser',JSON.stringify(true));
    //         olduser=true;
    //         setRegUser(true)
    //         console.log("He is in document");
    //     }
    // }

    let lc = localStorage.getItem('reg')

    if (userstate === true || olduser === true ){
        return(
            <Userhome logout={logout} userDetails={userDetails}/>
        )
    }else if(userstate === "loading" && lc !== "0"){
         return (
             <>
                <Loding />
                 <button onClick={logout}>logout</button>
             </>
         )
    }else{
        return(
            <Register logout={logout} olduser={olduser} userstate={userstate} userDetails={userDetails}/>
        )
    }
}

export default Home;
