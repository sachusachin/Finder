import React, {useEffect, useState} from 'react';
// import {BrowserRouter as Router} from "react-router-dom";
// import { Route,Switch } from "react-router";
// import Signin from "./signin";
import './App.css';
import {auth, googlelogin,db} from "./firebase";
import Home from "./Home";
import Signin from "./Signin";

function App() {
    const [user,setUser] = useState(false);
    const [olduser,setOlduser]=useState(false);
    // const[localUser,setLocalUser] = useState(false);
    const [userstate,setUserstate] = useState("loading");

    useEffect(()=>{
        const user = localStorage.getItem('user');
        if(user){
            setUser(JSON.parse(user));
            console.log("user : ",user);
        }

    },[])

    useEffect(()=>{
        localStorage.setItem('user',JSON.stringify(user));
    })

    useEffect(()=>{
        const Olduser = localStorage.getItem('olduser');
        if(Olduser){
            setOlduser(JSON.parse(Olduser));
            console.log("oldUser : ",Olduser);
        }
    },[])

    useEffect(()=>{
        localStorage.setItem('olduser',JSON.stringify(olduser));
    })

    // Logout function

    const logout = async ()=>{
        try {
            await auth.signOut();
            setUser(false);
            setOlduser(false);
            console.log('e');
            localStorage.clear();

        } catch (e){
            console.log("error",e);
        }
    }

    // Login function

    const googleLogin = async ()=>{
        try{
            auth.signInWithPopup(googlelogin).then(()=>{
                            setUser(auth.currentUser);
                            console.log(auth.currentUser.uid);
                        }).then(()=>{
                databaseHandler( auth.currentUser.uid);
            })
                .catch((error)=>console.log(error));

            // setUser(firebase.auth().currentUser);

        }catch (er) {
            console.log(er);
        }
    }

    // Database checking

    var count = 0;
    const databaseHandler = async (userId) => {
        const checkDocs = db.doc(`users/${userId}`);
        // console.log("userid : ",db.doc(`users/${userId}`));

        const snapshot = await checkDocs.get();
        // console.log("snap : ",snapshot)

        if (snapshot.exists){
            setUserstate(true)
            setOlduser(true)
        }else if(!snapshot.exists){
            setUserstate(count)
        }
    }


    if (user!==false){
        return(
            <div>
                <Home logout={logout} userDetails={user} userstate={userstate} olduser={olduser}/>
            </div>
        )
    }else {
        return (
            <div>
                <Signin googleLogin={googleLogin}/>
            </div>
        )
    }
}

export default App;