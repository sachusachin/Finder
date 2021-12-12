import React, {useEffect, useState} from 'react';
import userLogo from './img/user1.png'
import Topnav from "./Topnav";
// import './topnav.css'
import './bookinghome.css'

import {BrowserRouter, Link} from "react-router-dom";
import searchImg from "./img/search.png";
import Filter from "./Filter";
import {auth, db, googlelogin} from "./firebase";
import DatePicker from "react-multi-date-picker";
import {cityNames, worksData} from "./Datas";



function Bookinghome() {


    const [filterState,setFilterstate]=useState(false)

    const [dbDetails,setdbDetails]=useState([])

    const [searchResult,setSearchresult]= useState([])


    const [work,setWork] = useState("")

    const [city,setCity] = useState("")

    const [viewProfile,setViewProfile] =useState(false)

    const [bookuser,setBookuser] = useState(false)

    const [bookuserId,setBookuserId]= useState("")

    const [currentView,setCurrentView] = useState("")

    const filterStateHandler = () => {
        window.scrollTo(0,0)
      setFilterstate(!filterState)
    }

    useEffect(()=>{
        db.collection(`users`).onSnapshot(snapshot =>
            (setdbDetails(snapshot.docs.map(doc => doc.data())))
        )
        console.log(dbDetails)
    },[])



    const searchHandler = () => {
        var tempArr =[]
        var tempArr1=[]
        var tempArr2=[]
        var tempArr3 =[]
        var cou = 0
        const str = document.querySelector(".rmdp-input").value
        const dateStrings = str.split("/").reverse().join("-");
        console.log(typeof (dateStrings))
        if (work === "") {
            alert("Select Work ")
        } else if (city === "" && dateStrings === "") {
            console.log("c d no : ",dbDetails)
            tempArr1=[]
            tempArr2=[]
            tempArr3=[]
            dbDetails.map(worker => {
                if (worker.availability !== "unavailable" && worker.verified !== "false" && worker.work === work) {
                    console.log(worker)
                    tempArr?.push(worker)
                   return setSearchresult(tempArr)

                }
            })
        }
        if (city !== "" && dateStrings !== "") {
            tempArr=[]
            tempArr2=[]
            tempArr3=[]
            console.log("c d enter : ",dbDetails)
            dbDetails.map(worker => {
                if (worker.availability !== "unavailable" && worker.verified !== "false" && worker.work === work ) {
                    if(worker.city.toLowerCase().includes(city.toLowerCase())){
                        console.log(worker.city)
                        worker.dates.filter(date => date.includes(dateStrings)).map(date => {
                            console.log(date)
                            tempArr1?.push(worker)
                            console.log(tempArr1)
                            setSearchresult(tempArr1)
                        })
                    }
                }
            })
        }
        if (city !== "" && dateStrings === "") {
            console.log("c n d enter : ",dbDetails)
            tempArr=[]
            tempArr1=[]
            tempArr3=[]
            dbDetails.map(worker => {
                if (worker.availability !== "unavailable" && worker.verified !== "false" && worker.work === work) {
                    console.log("Out : ",worker.city)
                    if(worker.city.toLowerCase().includes(city.toLowerCase())){
                        console.log("In : ",worker.city)
                        tempArr2.push(worker)
                        setSearchresult(tempArr2)
                    }
                }
            })
        }
        if (city === "" && dateStrings !== "") {
            console.log("c enter d n : ",dbDetails)
            tempArr=[]
            tempArr1=[]
            tempArr2=[]
            dbDetails.map(worker => {
                console.log(worker.dates)
                if(worker.availability === "available" && worker.verified !== "false" && worker.work === work) {
                    console.log("if date : ",worker.dates)
                    worker.dates.filter(date => date.includes(dateStrings)).map(date => {
                        tempArr3?.push(worker)
                        console.log(tempArr3)
                        setSearchresult(tempArr3)
                    })
                }
            })
        }
        setFilterstate(false)
    }

    const today = new Date()

    // today.setDate(today.getDate() + 1)

    const [dates, setDates] = useState([today])


    useEffect(()=>{
        console.log("Date ; ",today)
    },[])

    const selectHandler = (event) => {
        setWork(event.target.innerText.trim())
    }
    const workHandler = (e) => {
        const workvalue = e.target.value
        setWork(workvalue)

    }

    const selectHandler1 = (event) => {
        setCity(event.target.innerText.trim())
    }
    const cityHandler = (e) => {
        const cityvalue = e.target.value
        setCity(cityvalue)

    }




    
    const viewHandler = (e) => {
        setCurrentView(e.target.value)
        console.log(e.target.value)
        setViewProfile(true)

    }
    const closeHandler = (event) => {

        setViewProfile(false)

    }



    useEffect(()=>{
        const register = localStorage.getItem('bookuser');
        if(register){
            setBookuser(JSON.parse(register));
            console.log("bookuser : ",bookuser);
        }
    },[])

    useEffect(()=>{
        localStorage.setItem('bookuser',JSON.stringify(bookuser));
    })

    const  unlockHandler = async ()=> {
        try{
            auth.signInWithPopup(googlelogin).then(()=>{
                setBookuser(auth.currentUser);
                console.log(auth.currentUser);
            }).then(()=>{
                setBookuserId( auth.currentUser.uid);
                console.log(auth.currentUser.uid)
            })
                .catch((error)=>console.log(error));
            // setUser(firebase.auth().currentUser);

        }catch (er) {
            console.log(er);
        }
    }

    return(
        <BrowserRouter>
            <div className="bookinghome">
                <Topnav profileurl={userLogo}/>
                <div className="bookinghome__body">
                    {
                        filterState===true?<div className="dates__picker__container">
                                <div className="filter">
                                    <div className="filter__divs dates__div">
                                        <div className="filter__div__head">
                                            <p>Date</p>
                                        </div>
                                        <div className="filter__div__data">
                                            <DatePicker
                                                selected={dates}
                                                placeholder="Select your date..."
                                                minDate={today}
                                            />
                                        </div>
                                    </div>
                                    <div className="filter__divs works__div">
                                        <div className="filter__div__head">
                                            <p>Work</p>
                                        </div>
                                        <div className="filter__div__data">
                                            <div className="input work__input">
                                                <input type="text" value={work} onChange={workHandler} placeholder="Select Work.."/>
                                            </div>
                                            {
                                                (!worksData.includes(work) && work !== "" ) &&

                                                <ul className="works__ul">{
                                                    worksData.map((data)=>{
                                                        if(data.toLocaleLowerCase().trim().includes(work.toLocaleLowerCase().trim())){
                                                            return(
                                                                <li key={data} onClick={selectHandler}>{data}</li>
                                                            )
                                                        }else if(work===""){
                                                            return <>hi</>
                                                        }
                                                    })
                                                }</ul>
                                            }
                                        </div>
                                    </div>
                                    <div className="filter__divs cities__div">
                                        <div className="filter__div__head">
                                            <p>City</p>
                                        </div>
                                        <div className="filter__div__data">
                                            <div className="input work__input">
                                                <input type="text" value={city} onChange={cityHandler} placeholder="Select City.."/>
                                            </div>
                                            {
                                                (!cityNames.includes(city) && city !== "" ) &&

                                                <ul className="works__ul">{
                                                    cityNames.map((data)=>{
                                                        if(data.toLocaleLowerCase().trim().includes(city.toLocaleLowerCase().trim())){
                                                            return(
                                                                <li key={data} onClick={selectHandler1}>{data}</li>
                                                            )
                                                        }else if(city===""){
                                                            return <></>
                                                        }
                                                    })
                                                }</ul>
                                            }
                                        </div>
                                    </div>
                                    <div className="search__close__btns">
                                        <div className="search__btn">
                                            <button onClick={searchHandler}>Search</button>
                                        </div>
                                        <div className="close__btn">
                                            <button onClick={filterStateHandler}>close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :<div className="filter__btn">
                                <button onClick={filterStateHandler}><i className="fal fa-search"> </i></button>
                            </div>

                    }
                    <div className="search__result">
                        {
                            searchResult!==[] &&
                            searchResult.map(result=>{
                                return(
                                    <div className="card" id={result.name}>
                                        <div className="card__left">
                                            <div className="card__image">
                                                <img src={result?.profileImage} alt="John" key={result.profileImage}/>
                                            </div>
                                        </div>
                                        <div className="card__right">
                                            <div className="card__div card__name">
                                                <p key={result.profileImage}>{result.name}</p>
                                            </div>
                                            <div className="card__div card__work">
                                                <p><i className="fas fa-briefcase"></i>  {result.work}</p>
                                            </div>
                                            <div className="card__div card__city">
                                                <p><i className="fal fa-map-marker-alt"></i> {result.city}</p>
                                            </div>
                                            <div className="card__div booking__btn">
                                                {
                                                    bookuser === false &&
                                                    <button onClick={unlockHandler}>Unlock</button>
                                                    ||
                                                    <button onClick={viewHandler} value={result.name}>View</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            ||
                            <div>
                                no result
                            </div>
                        }
                    </div>
                    {
                        bookuser === false &&
                        <div>
                            <p>not register</p>
                        </div>
                    }
                </div>
                {
                    viewProfile&&<Viewprofile  user={currentView} closeHandler={closeHandler} dbDetails={dbDetails}/>
                }
            </div>
        </BrowserRouter>

    )
}

export default Bookinghome;

export function Viewprofile ({user,closeHandler,dbDetails}){

    console.log(user)

    const [tempUser,setTempuser] = useState([])

    useEffect(()=>{
        dbDetails.map(detail=>{
            (detail.name===user )&& setTempuser(detail)
        })
    })

    return(
        <div className="viewprofile">
            <div className="view__profile__body">
                <div className="view__profile__body__top">
                    <div className="top__close__btn">
                        <button onClick={closeHandler}><i className="fal fa-times"> </i></button>
                    </div>
                    <div className="viewprofile__top__image">
                        <div className={tempUser.availability==="available"?"viewprofile__top__imagediv__av":"viewprofile__top__imagediv__nav"}>
                            <img src={tempUser?.profileImage} alt="userlogo" />
                        </div>
                    </div>
                    <div className="viewprofile__top__details">
                        <p className="viewprofile__top__details__name"><span>{tempUser?.name}</span></p>
                        <p className="viewprofile__top__details__work">{tempUser?.work}</p>
                        <div className="viewprofile__top__details__book">
                            <button>BOOK</button>
                        </div>
                    </div>
                </div>
                <div className="view__profile__body__bottom">
                    <div className="details__divs">
                        <div className="details__divs__icons">
                            <i className="fal fa-phone-alt"> </i>
                        </div>
                        <div className="details__divs__contents">
                           <p> {tempUser?.phonenumber}</p>
                        </div>
                    </div>
                    <div className="details__divs">
                        <div className="details__divs__icons">
                            <i className="fal fa-map-marker-alt"> </i>
                        </div>
                        <div className="details__divs__contents">
                            <p> {tempUser?.city} </p>
                        </div>
                    </div>
                    <div className="details__divs">
                        <div className="details__divs__icons">
                            <i className="fal fa-home-lg-alt"> </i>
                        </div>
                        <div className="details__divs__contents">
                            <p>{tempUser?.address}</p>
                        </div>
                    </div>
                    <div className="details__divs">
                        <div className="details__divs__icons">
                            <i className="fal fa-venus-mars"> </i>
                        </div>
                        <div className="details__divs__contents">
                            <p>{tempUser?.gender}</p>
                        </div>
                    </div>
                    <div className="details__divs">
                        <div className="details__divs__icons">
                            <i className="fas fa-at"> </i>
                        </div>
                        <div className="details__divs__contents">
                            <p>{tempUser?.emailid}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
