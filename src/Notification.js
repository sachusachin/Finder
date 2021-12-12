import React, {useEffect, useState} from "react"
// import {Link} from "react-router-dom";
// import logo from "./img/logo.png";
import './notification.css'
import {db} from "./firebase";



const Notification = ({profileurl,userDetails}) => {

    const [userId,setUserid] = useState(userDetails.userid)

    const [loginTime,setLogintime] = useState(userDetails.logintime)

    const [bookingdb,setBookingdb] = useState([])

    const [newNotification,setNewnotification] = useState(false)

    useEffect( ()=>{
        console.log("notifi : " ,userId)
        console.log("login : " ,loginTime?.toDate())

        db.collection("booking")
            .doc(userDetails.userid)
            .collection(`${userDetails.work}`).onSnapshot((snap => {
                    const data = snap.docs.map(doc => doc.data())
                    console.log(data)
                   setBookingdb(data)
        }))

        console.log(userDetails.userid)
        window.scroll(0,0)

            console.log("booking : ",bookingdb)

        bookingdb.map((detail)=>{
            var booktime = new Date(detail.bookingtime.toDate());
            var logtime = new Date(loginTime.toDate());
            var Difference_In_Time = logtime.getTime() - booktime.getTime();
            if (Difference_In_Time>=0){
                setNewnotification(false)
            }else{
                setNewnotification(1)
            }
            console.log(Difference_In_Time)
        })


            }, [])

    if(newNotification===false){
        return (
            <div className="no__notification">
            </div>

        )
    }else {
        return (
            <div className="notification">
                {
                    bookingdb!==[]&&
                    bookingdb.map((detail)=>{

                        return(
                            <div>
                                {
                                    detail.email
                                }
                            </div>
                        )
                    })
                }
            </div>

        )
    }

}

export default Notification;