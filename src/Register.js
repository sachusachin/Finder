import React, {useEffect, useState} from "react"
import { Offline, Online } from "react-detect-offline";
import {db} from "./firebase";
import "./register.css";
import logo from './img/logo.png';
import userimg from './img/username.jpg';
import callimg from './img/call.jpg';
import working from './img/workimg.png';
import cityimg from './img/cityimg.png';
import maleimg from './img/maleimg.png';
import femaleimg from './img/female.png';
import addressimg from './img/address.png';
import {worksData,cityNames} from "./Datas";
import Loding from "./Loding";
// import haversine from 'haversine-distance';
// import Loding from "./Loding";
// import {set} from "firebase/firebase-database";

const Register = ({logout,userDetails,userstate,olduser}) => {

    const [reguser,setRegUser]=useState(null);
    const [errormsg,setErrormsg]=useState("");


    // const userId = userDetails.uid
    const [name,setName] = useState("");
    const [usernames,setUsernames]=useState([]);
    const [phonenumber,setNumber]=useState([]);
    const [work,setWork]=useState("");
    const [city,setCity]=useState("");
    const [address,setAddress] = useState("");
    const [gender,setGender] = useState("");

    const [dbload,setDbload] = useState(false);

    const [isLoaded, setIsLoaded] = useState(false);
    const [isPageLoaded, setIsPageLoaded] = useState(false); //this helps

    useEffect(() => {
        setIsLoaded(true);
    }, []);


    useEffect(() => {
        if (isLoaded) {
            setIsPageLoaded(true);
        }
    }, [isLoaded]);


    useEffect(()=>{
        const register = localStorage.getItem('reg');
        if(register){
            setRegUser(JSON.parse(register));
            console.log("reg : ",register);
        }
    },[])

    useEffect(()=>{
        localStorage.setItem('reg',JSON.stringify(0));
    })

    console.log(reguser)


    // const a = { latitude: 11.0168445, longitude: 76.9558321 }
    // const b = { latitude:  9.9252007, longitude: 78.1197754 }
    //
    // console.log(haversine(a, b))

    console.log(userDetails)


    //Insert new user registration data into the database

    const dataInsert = async () => {

        const checkDocs = db.doc(`users/${userDetails.uid}`);

        const snapshot = await checkDocs.get();

        if (!snapshot.exists){
            setDbload(true)
            const username = name;
            try{
                checkDocs.set({
                        name: username,
                        gender: gender,
                        city:city,
                        address:address,
                        phonenumber:phonenumber,
                        work:work,
                        verified:"false",
                        emailid:userDetails.email
                    }
                ).then(()=>{
                    setName("");
                    setCity("");
                    setAddress("");
                    setErrormsg("");
                    setNumber("");
                    setGender("");
                    // alert("success");
                    console.log("Data stored successfully");
                    localStorage.setItem('olduser',JSON.stringify(true));
                    localStorage.setItem('reg',JSON.stringify(null));
                    olduser=true
                    userstate=true
                    window.location.reload()
                })
            }catch (error){
                console.log("Error database : ",error);
            }
        }else{
            localStorage.setItem('olduser',JSON.stringify(true));
            localStorage.setItem('reg',JSON.stringify(null));
            olduser=true;
            userstate=true
            console.log("He is in document");
            window.location.reload()
        }
    }


    // -----------------  Data Validation functions start  ------------- //

    var aluser = 0

    const usernameHandler = (e) => {
     const namevalue = e.target.value.trim()
       setName(namevalue)
       if (namevalue===""){
           setErrormsg("Invalid UserName")
           document.querySelector(".form__next__btn").style.pointerEvents="none"
           document.querySelector("#username").style.border="1px solid red"
       }else if(!(/^[a-zA-Z0-9]+$/.test(namevalue))){
           setErrormsg("Invalid UserName")
           document.querySelector(".form__next__btn").style.pointerEvents="none"
           document.querySelector("#username").style.border="1px solid red"
       }else if (namevalue.length > 15 || namevalue.length < 5){
           setErrormsg("UserName must be 5 to 15 characters")
           document.querySelector(".form__next__btn").style.pointerEvents="none"
           document.querySelector("#username").style.border="1px solid red"
       }else if(usernames){
           console.log("inside mother fucker!!!!!")
           let al = 0
           usernames.map((username)=>{
               if(username.name.toLowerCase() === namevalue.toLowerCase()){
                   setErrormsg("username Already exist")
                   document.querySelector(".form__next__btn").style.pointerEvents="none"
                   document.querySelector("#username").style.border="1px solid red"
                   al+=1
               }
           })
           if(al===0){
               setErrormsg("")
               document.querySelector(".form__next__btn").style.pointerEvents="all"
               document.querySelector("#username").style.border="1px solid green"
           }else{
               setErrormsg("username Already exist")
               document.querySelector(".form__next__btn").style.pointerEvents="none"
               document.querySelector("#username").style.border="1px solid red"
           }
       }else{
           setErrormsg("")
           document.querySelector(".form__next__btn").style.pointerEvents="all"
           document.querySelector("#username").style.border="1px solid green"
       }
   }

    const mobilenumberHandler = (e) => {
        const numbervalue = e.target.value.trim()
        setNumber(numbervalue)
        if (numbervalue===""){
            setErrormsg("Invalid Mobilenumber")
            document.querySelector(".form2__next__btn").style.pointerEvents="none"
            document.querySelector("#mobilenumber").style.border="1px solid red"
        }else if (!(/^\d{10}$/.test(numbervalue))){
            setErrormsg("Mobilenumber must be 10 numbers")
            document.querySelector(".form2__next__btn").style.pointerEvents="none"
            document.querySelector("#mobilenumber").style.border="1px solid red"
        }else if(numbervalue){
            console.log("inside mother fucker!!!!!")
            let al = 0
            usernames.map((usermobile)=>{
                if(usermobile.phonenumber === numbervalue){
                    setErrormsg("Mobilenumber Already exist")
                    document.querySelector(".form2__next__btn").style.pointerEvents="none"
                    document.querySelector("#mobilenumber").style.border="1px solid red"
                    al+=1
                }
            })

            if(al===0){
                setErrormsg("")
                document.querySelector(".form2__next__btn").style.pointerEvents="all"
                document.querySelector("#mobilenumber").style.border="1px solid green"
            }else{
                setErrormsg("Mobilenumber Already exist")
                document.querySelector(".form2__next__btn").style.pointerEvents="none"
                document.querySelector("#mobilenumber").style.border="1px solid red"
            }
        }else{
            document.querySelector(".form2__next__btn").style.pointerEvents="all"
            document.querySelector("#mobilenumber").style.border="1px solid green"
        }
    }

    const workHandler = (e) => {
        const workvalue = e.target.value
        setWork(workvalue)
        worksData.map((data)=>{
            if(data.toLocaleLowerCase().trim()!==work.toLocaleLowerCase()){
                setErrormsg("Enter valid Profession")
                document.querySelector(".form3__next__btn").style.pointerEvents="none"
                document.querySelector("#work").style.border="1px solid red"
            }else{
                setErrormsg("")
                document.querySelector(".form3__next__btn").style.pointerEvents="all"
                document.querySelector("#work").style.border="1px solid green"
            }
      })
    }

    const cityHandler = (e) => {
        const cityvalue = e.target.value
        setCity(cityvalue)
        cityNames.map((data)=>{
            if(data.toLocaleLowerCase().trim()!==city.toLocaleLowerCase()){
                setErrormsg("Enter valid city")
                document.querySelector(".form4__next__btn").style.pointerEvents="none"
                document.querySelector("#city").style.border="1px solid red"
            }else{
                setErrormsg("")
                document.querySelector(".form4__next__btn").style.pointerEvents="all"
                document.querySelector("#city").style.border="1px solid green"
            }
        })
    }

    const addressHandler = (e) => {
        const addressvalue = e.target.value.trim()
        setAddress(addressvalue)
        if (addressvalue===""){
            setErrormsg("Invalid Address")
            document.querySelector(".form5__next__btn").style.pointerEvents="none"
            document.querySelector("#address").style.border="1px solid red"
        }else if(!(/^[a-zA-Z0-9\s,'-]*$/.test(addressvalue))){
            setErrormsg("Invalid Address")
            document.querySelector(".form5__next__btn").style.pointerEvents="none"
            document.querySelector("#address").style.border="1px solid red"
        }else if(addressvalue.length < 5){
            setErrormsg("Address must be more than 5 characters")
            document.querySelector(".form5__next__btn").style.pointerEvents="none"
            document.querySelector("#address").style.border="1px solid red"
        }else if(addressvalue.length > 50){
            setErrormsg("Address must be less than 50 characters")
            document.querySelector(".form5__next__btn").style.pointerEvents="none"
            document.querySelector("#address").style.border="1px solid red"
        }else{
            setErrormsg("")
            document.querySelector(".form5__next__btn").style.pointerEvents="all"
            document.querySelector("#address").style.border="1px solid green"
        }
    }


    // const getLocation = (e)=> {
    //     e.preventDefault()
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(success,error);
    //     } else {
    //         alert("Geolocation is not supported by this browser.");
    //     }
    // }
    //
    // const success = (position)=>{
    //     console.log(position)
    //     console.log(position.coords.latitude)
    //     console.log(position.coords.longitude)
    // }
    //
    // const error = (position)=>{
    //     console.log("oops")
    // }


    // -----------------   Selection handle functions start  ------------- //

  const selectHandler = (e) => {
    setWork(e.target.innerText.trim())
      setErrormsg("")
      document.querySelector(".form3__next__btn").style.pointerEvents="all"
      document.querySelector("#work").style.border="1px solid green"
  }

  const cityselectHandler = (e) => {
      setCity(e.target.innerText.trim())
      setErrormsg("")
      document.querySelector(".form4__next__btn").style.pointerEvents="all"
      document.querySelector("#city").style.border="1px solid green"
  }

  const genderselectHandler = (e) => {
        const gendervalue = e.target.alt

      if(gendervalue === "male"){
          setGender(gendervalue)
          document.querySelector(".form6__next__btn").style.pointerEvents="all"
          document.querySelector(".image.male__image").classList.add("active")
          document.querySelector(".image.female__image").classList.remove("active")
      }
      if(gendervalue === "female"){
          setGender(gendervalue)
          document.querySelector(".form6__next__btn").style.pointerEvents="all"
          document.querySelector(".image.male__image").classList.remove("active")
          document.querySelector(".image.female__image").classList.add("active")
      }
      console.log(gender)
    }


   // -----------------   Form handle functions start  ------------- //



    const form1Handler = (e) => {
        e.preventDefault()
        document.querySelector("#registerForm").style.transform="translateX(-300px)";
   }

    const form2Handler = (e) => {
        e.preventDefault()
        document.querySelector("#registerForm").style.transform="translateX(-600px)";
    }

    const form3Handler = (e) => {
        e.preventDefault()
        document.querySelector("#registerForm").style.transform="translateX(-900px)";
    }

    const form4Handler = (e) => {
        e.preventDefault()
        document.querySelector("#registerForm").style.transform="translateX(-1200px)";
    }

    const form5Handler = (e) => {
        e.preventDefault()
        document.querySelector("#registerForm").style.transform="translateX(-1500px)";
    }

    const form6Handler = (e) => {
        e.preventDefault()
        dataInsert()
        // document.querySelector("#registerForm").style.transform="translateX(-1800px)";
    }




    //---------------   Get all Users Data from the firebase Start ------------ //


    useEffect(()=>{
        db.collection(`users`).onSnapshot(snapshot =>
            (setUsernames(snapshot.docs.map(doc => doc.data())))
        )
    },[]);


    console.log(usernames)


    // --------- Final return Statement ------------ //


    if(dbload===true){
        return (
            <>
                <Loding />
            </>
        )
    }else{
        return (
           <>
               <Online>
                   <div className="register">
                       <div className="register__body">
                           <div className="register__top">
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
                           <div className="register__form">
                               <div className="register__form__head">
                                   <p>create account</p>
                               </div>
                               <div className="register__form__body">
                                   <form id="registerForm" autoComplete="off">
                                       <div className="username__form">
                                           <div className="form__divs">
                                               <div className="div__image">
                                                   <div className="image">
                                                       <img src={userimg} alt="user"/>
                                                   </div>
                                               </div>
                                               <div className="div__input">
                                                   <div className="input__text">
                                                       <p>User name</p>
                                                   </div>
                                                   <div className="input__box">
                                                       <input type="text" onChange={usernameHandler} id="username" value={name} placeholder="Username"/>
                                                   </div>
                                               </div>
                                               <div className="div__error">
                                                   <p>{errormsg}</p>
                                               </div>
                                               <div className="div__next">
                                                   <button className="form__next__btn" onClick={form1Handler}>Next</button>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="phonenumber__form">
                                           <div className="form__divs">
                                               <div className="div__image">
                                                   <div className="image">
                                                       <img src={callimg} alt="user"/>
                                                   </div>
                                               </div>
                                               <div className="div__input">
                                                   <div className="input__text">
                                                       <p>Mobile Number</p>
                                                   </div>
                                                   <div className="input__box">
                                                       <input
                                                           type="text"
                                                           onChange={mobilenumberHandler}
                                                           id="mobilenumber"
                                                           value={phonenumber}
                                                           placeholder="10-digit number"
                                                       />
                                                   </div>
                                               </div>
                                               <div className="div__error">
                                                   <p>{errormsg}</p>
                                               </div>
                                               <div className="div__next">
                                                   <button className="form2__next__btn" onClick={form2Handler}>Next</button>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="working__form">
                                           <div className="form__divs">
                                               <div className="div__image">
                                                   <div className="image">
                                                       <img src={working} alt="work"/>
                                                   </div>
                                               </div>
                                               <div className="div__input">
                                                   <div className="input__text">
                                                       <p>Profession </p>
                                                   </div>
                                                   <div className="input__box work">
                                                       <input
                                                           type="text"
                                                           onChange={workHandler}
                                                           id="work"
                                                           value={work}
                                                           placeholder="ex-Cleaner"
                                                       />
                                                       {
                                                           work!=="" &&
                                                           <ul className="works__ul">{
                                                               worksData.map((data)=>{
                                                                   if(data.toLocaleLowerCase().trim().includes(work.toLocaleLowerCase().trim())){
                                                                       return(
                                                                           <li key={data} onClick={selectHandler}>{data}</li>
                                                                       )
                                                                   }else if(work===""){
                                                                       return <></>
                                                                   }
                                                               })
                                                           }</ul>
                                                       }
                                                   </div>
                                               </div>
                                               <div className="div__error">
                                                   <p>{errormsg}</p>
                                               </div>
                                               <div className="div__next">
                                                   <button className="form3__next__btn" onClick={form3Handler}>Next</button>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="city__form">
                                           <div className="form__divs">
                                               <div className="div__image">
                                                   <div className="image">
                                                       <img src={cityimg} alt="work"/>
                                                   </div>
                                               </div>
                                               <div className="div__input">
                                                   <div className="input__text">
                                                       <p>City</p>
                                                   </div>
                                                   <div className="input__box work">
                                                       <input
                                                           type="text"
                                                           onChange={cityHandler}
                                                           id="city"
                                                           value={city}
                                                           placeholder="ex-Pollachi"
                                                       />
                                                       {
                                                           city!=="" &&
                                                           <ul className="works__ul">{
                                                               cityNames.map((data)=>{
                                                                   if(data.toLocaleLowerCase().trim().includes(city.toLocaleLowerCase().trim())){
                                                                       return(
                                                                           <li key={data} onClick={cityselectHandler}>{data}</li>
                                                                       )
                                                                   }else if(city===""){
                                                                       return <></>
                                                                   }
                                                               })
                                                           }</ul>
                                                       }
                                                   </div>
                                               </div>
                                               <div className="div__error">
                                                   <p>{errormsg}</p>
                                               </div>
                                               <div className="div__next">
                                                   <button className="form4__next__btn" onClick={form4Handler}>Next</button>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="address__form">
                                           <div className="form__divs">
                                               <div className="div__image">
                                                   <div className="image">
                                                       <img src={addressimg} alt="user"/>
                                                   </div>
                                               </div>
                                               <div className="div__input">
                                                   <div className="input__text">
                                                       <p>Address</p>
                                                   </div>
                                                   <div className="input__box">
                                                       <input
                                                           type="text"
                                                           onChange={addressHandler}
                                                           id="address"
                                                           value={address}
                                                           placeholder="Full Address"
                                                       />
                                                   </div>
                                               </div>
                                               <div className="div__error">
                                                   <p>{errormsg}</p>
                                               </div>
                                               <div className="div__next">
                                                   <button className="form5__next__btn" onClick={form5Handler}>Next</button>
                                               </div>
                                           </div>
                                       </div>
                                       <div className="gender__form">
                                           <div className="form__divs">
                                               <div className="div__image gender">
                                                   <div className="image">
                                                       <p>Gender</p>
                                                   </div>
                                               </div>
                                               <div className="gender__type__div">
                                                   <div className="type__option" id="male" onClick={genderselectHandler}>
                                                       <div className="image male__image">
                                                           <img src={maleimg} alt="male"/>
                                                       </div>
                                                   </div>
                                                   <div className="type__option" id="female" onClick={genderselectHandler}>
                                                       <div className="image female__image">
                                                           <img src={femaleimg} alt="female"/>
                                                       </div>
                                                   </div>
                                               </div>
                                               <div className="div__next">
                                                   <button className="form6__next__btn" onClick={form6Handler}>Next</button>
                                               </div>
                                           </div>
                                       </div>
                                   </form>
                               </div>
                           </div>
                       </div>
                       {/*<div className="register__form">*/}
                       {/*    <form>*/}
                       {/*        <div className="form__divs">*/}
                       {/*            <div className="input">*/}
                       {/*                <input type="text" onChange={usernameHandler}/>*/}
                       {/*            </div>*/}
                       {/*            <div className="error">*/}
                       {/*                {name}*/}
                       {/*            </div>*/}
                       {/*        </div>*/}
                       {/*        <div className="form__divs">*/}

                       {/*        </div>*/}
                       {/*        <div className="form__divs">*/}

                       {/*        </div>*/}
                       {/*    </form>*/}
                       {/*</div>*/}
                       {/*<p>new register</p>*/}
                       {/*<p>{olduser}</p>*/}
                       {/*<form onSubmit={dataInsert}>*/}
                       {/*    <input*/}
                       {/*        type="text"*/}
                       {/*        value={name}*/}
                       {/*        onChange={(e)=>setName(e.target.value)}*/}
                       {/*    />*/}
                       {/*    <button type="submit">onclick</button>*/}
                       {/*</form>*/}
                       {/*<button onClick={logout}>logout</button>*/}
                   </div>
               </Online>
               <Offline>
                   <div className="offline__div">
                       <div className="reload__btn">
                           <button onClick={()=>window.history.reload()}>Retry</button>
                       </div>
                   </div>
               </Offline>
           </>
        )
    }


}

export default Register;