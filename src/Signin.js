import React, {useEffect, useState} from "react"
import "./signin.css"
import bg from './img/home.jpg';
import logo from './img/logo.png';
import worker from './img/worker.png';
import user from './img/find.jpg';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Bookinghome from "./Bookinghome";

const Signin = ({googleLogin,bookingstateHandler}) => {

    const [bookingState,setBookingstate] = useState(false)

    const [type,setType]=useState("")
    const page2Handler = ()=>{
        document.querySelector(".page1").classList.add("anime")
        document.querySelector(".page2").classList.add("anime")
        setTimeout(()=>{
            window.scrollTo(0,0)
        },500)
    }
    const page1Handler = ()=>{
        // alert("back")
        document.querySelector(".page1").classList.remove("anime")
        document.querySelector(".page2").classList.remove("anime")
        window.scrollTo(0,0)
    }
    const userHandler = (types) => {
        setType("user");
        document.querySelector(".type__worker").classList.remove ("active")
        document.querySelector(".type__user").classList.add("active")
    }
    const workerHandler = (types) => {
        setType("worker");
        document.querySelector(".type__worker").classList.add("active")
        document.querySelector(".type__user").classList.remove("active")
    }

    // const navigate = useNavigate();

    //
    // useEffect(()=>{
    //     if (localStorage.getItem("user")==="false"){
    //         navigate('/')
    //     }
    // },[])

    const bookingpage = () => {
        setBookingstate(true)
    }
    return (
        <BrowserRouter>
            <div className="welcome__page">
                    <div className="center">
                        <div className='page1'>
                            <span className="round__bg"> </span>
                            <div className='page1__top'>
                                <div className="logo__image">
                                    <img src={logo} alt="logo"/>
                                </div>
                            </div>
                            <div className='page1__img'>
                                <div className="image">
                                    <img src={bg} alt="bg"/>
                                </div>
                            </div>
                            <div className="page1__content">
                                <div className="content__head">
                                    Work on Time
                                </div>
                                <div className="content__text">
                                    Lorem ipsum dolor sit amet,
                                    consectetur adipisicing elit.
                                    Lorem ipsum dolor sit amet,
                                    consectetur adipisicing elit.
                                </div>
                            </div>
                            <div className="page1__next">
                                <button onClick={page2Handler}><i className="fas fa-angle-right"> </i></button>
                            </div>
                        </div>
                        <div className='page2'>
                            <div className='page2__top'>
                                <div className="page2__back">
                                    <button onClick={page1Handler}><i className="fas fa-angle-left"> </i></button>
                                </div>
                                <div className="page2__head">
                                    <p>Profile Type</p>
                                </div>
                            </div>
                            <div className="page2__text">
                                <p>"One man's wage increase is another man's price increase"</p>
                            </div>
                            <div className="page2__type">
                                <div className="type__worker" onClick={workerHandler}>
                                    <div className="worker__img">
                                        <div className="image">
                                            <img src={worker} />
                                        </div>
                                    </div>
                                    <div className="worker__text">
                                        <div className="worker__text__head">
                                            <p>as a <span>Worker</span></p>
                                        </div>
                                        <div className="worker__text__content">
                                            <p>
                                                Craete & Manage Your    Worker Profile
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="type__user" onClick={userHandler}>
                                    <div className="user__img">
                                        <div className="image">
                                            <img src={user} />
                                        </div>
                                    </div>
                                    <div className="user__text">
                                        <div className="user__text__head">
                                            <p>for  <span>Booking</span></p>
                                        </div>
                                        <div className="user__text__content">
                                            <p>
                                                Book Workers For Your Work and finish your work fast
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="page2__next">
                                {
                                    type!==""?
                                        (type==="user" &&
                                            <button className="btn__1" onClick={bookingstateHandler}>Get Started<i className="fas fa-angle-right"> </i></button>
                                        ) ||
                                        (type==="worker" &&
                                            <button className="btn__2" onClick={googleLogin}>Continue with Google<i className="fab fa-google"> </i></button>
                                        ):<> </>
                                }
                            </div>
                        </div>
                    </div>
                    {/*<button onClick={googleLogin}>Google</button>*/}
                </div>

        </BrowserRouter>
    )
}

export default Signin;