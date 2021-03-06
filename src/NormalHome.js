import React, {useEffect, useState} from "react"
// import {Link} from "react-router-dom";
// import logo from "./img/logo.png";
import './normalhome.css'
import DatePicker from "react-multi-date-picker"
import {auth, db} from "./firebase";
import firebase from "firebase/compat";
import transition from "react-element-popper/animations/transition"
import "react-multi-date-picker/styles/layouts/mobile.css"
import "react-multi-date-picker/styles/colors/purple.css"
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"

// import {useNavigate} from "react-router-dom";


const NormalHome = ({userDetails}) => {

    const [userDb, setUserDb] = useState([]);
    const [error,setError] = useState("");
    const [phnumber, setPhnumber] = useState("");
    const [coderesult,setCoderesult] = useState("")
    const [verificationcode,setVerificationcode] = useState("")

    const today = new Date()

    // today.setDate(today.getDate() + 1)

    const [dates, setDates] = useState([today])
    const [dbdates, setDbDates] = useState([])

 // ------------------ Otp phone number and otp input validator ----------------------------------------- //

    const numberHandler = (event)=>{
        const numbervalue = event.target.value.trim()
        setPhnumber(numbervalue)
        if(numbervalue === ""){
            setError("Empty Number")
            document.querySelector("#send__otp").style.pointerEvents="none";
        }else if (!(/^\d{10}$/.test(numbervalue))){
            setError("invalid")
            document.querySelector("#send__otp").style.pointerEvents="none";
        }else{
            setError("")
            document.querySelector("#send__otp").style.pointerEvents="all";
        }
    }
    const codeHandler = (event)=>{
        const codevalue = event.target.value.trim()
        setVerificationcode(codevalue)
        if(codevalue === ""){
            setError("Empty Otp")
            document.querySelector("#verify__otp").style.pointerEvents="none";
        }else if (!(/^\d{6}$/.test(codevalue))){
            setError("invalid Otp")
            document.querySelector("#verify__otp").style.pointerEvents="none";
        }else{
            setError("")
            document.querySelector("#verify__otp").style.pointerEvents="all";
        }
    }



 // --------------------------- Code verification ----------------------------------------- //


     useEffect(()=>{
             window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
     },[])

    function phoneAuth(event) {
        event.preventDefault();
        const number2 = "+91" + phnumber;
        document.querySelector("#send__otp").style.pointerEvents="none";
            //it takes two parameter first one is number and second one is recaptcha
            firebase.auth().signInWithPhoneNumber(number2, window.recaptchaVerifier)
                .then(function(confirmationResult) {
                //s is in lowercase
                window.confirmationResult = confirmationResult;
                    setCoderesult(window.confirmationResult)
                console.log(window.confirmationResult);
                    document.querySelector(".form1").classList.add("active")
                    document.querySelector(".form2").classList.remove("active")
            }).catch(function(error) {
                alert(error.message);
                document.querySelector("#send__otp").style.pointerEvents="all";
            });
        }

    function codeverify(event) {
        event.preventDefault()
            coderesult.confirm(verificationcode).then(function(result) {
                var user = result.user;
                console.log(user);
                veriyInsert().then(r => console.log("r : ",r));
                setError("Success");
            }).catch(function(error) {
                if (error.message === "The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.") {
                    setError("invalid otp")
                }
                setError("invalid otp")
            });
        }


 // ------------------ Getting current user data ----------------------------------------- //


    useEffect(() => {
        db.collection("users")
            .doc(userDetails.uid)
            .onSnapshot(doc => {
                setUserDb(doc.data());
            })
        console.log(userDb)
    }, [])

    // console.log("user detail : ",userDb)
    // console.log("user : ",userDetails.uid)

    const verifyHandler = () => {
      document.querySelector(".verification__div").classList.toggle("active")
    }


//--------------------  Update user profile to Verify in Firebase   ----------------------- //

    const veriyInsert = async () => {

        const checkDocs = db.doc(`users/${userDetails.uid}`);

        const snapshot = await checkDocs.get();

        if (snapshot.exists){
            try{
                checkDocs.update({
                        verified:"true",
                        phonenumber:phnumber
                    }
                ).then(()=>{
                    // alert("success");
                    console.log("Data stored successfully");
                })
            }catch (error){
                console.log("Error database : ",error);
            }
        }
    }

    // const availableHandler = async ()=> {
    //
    //     const checkDocs = db.doc(`users/${userDetails.uid}`);
    //
    //     const snapshot = await checkDocs.get();
    //
    //     if (snapshot.exists){
    //         try{
    //             checkDocs.update({
    //                 availability:"available"
    //                 }
    //             ).then(()=>{
    //                 // alert("success");
    //                 document.querySelector(".btns.available__btn").classList.add("active")
    //                 document.querySelector(".btns.unavailable__btn").classList.remove("active")
    //                 console.log("user available stored");
    //             })
    //         }catch (error){
    //             console.log("Error database : ",error);
    //         }
    //     }
    // }
 //--------------------   Check if the user is available or not   ----------------------- //

    const availableHandler = async ()=> {
        if(userDb.availability==="unavailable"){
            var av = "available"
        }else if(userDb.availability==="available"){
            av = "unavailable"
        }
        const checkDocs = db.doc(`users/${userDetails.uid}`);

        const snapshot = await checkDocs.get();

        if (snapshot.exists){

            try{
                checkDocs.update({
                        availability:av
                    }
                ).then(()=>{
                    console.log("user unavailable stored");
                })
            }catch (error){
                console.log("Error database : ",error);
            }
        }
    }

    // ----------------------- Date update Handler ------------------ //

    const dateHandler = async ()=> {

        const date =  document.querySelector(".custom-input").value.split(",");


        if (date.length > 7 || userDb.dates.length > 7){
            dateMessage("7 days only acceptable","red");
            setTimeout(()=> document.querySelector(".schedule__input__info.active").style.animation="",4000)

        }else{
            const checkDocs = db.doc(`users/${userDetails.uid}`);

            const snapshot = await checkDocs.get();

            if (snapshot.exists){

                try{
                    checkDocs.update({
                            dates:document.querySelector(".custom-input").value.split(",")
                        }
                    ).then(()=>{
                        dateMessage("UPDATED","green");
                        const doc = document.querySelector(".schedule__input__info.active")
                        setTimeout(()=>{doc !==null && (doc.style.animation="")},3000)
                        console.log("user dates stored : ",userDb.dates);
                    })
                }catch (error){
                    console.log("Error database : ",error);
                    console.log(userDb.dates)
                }
            }
        }
    }

    const dateMessage =(message,color)=>{
        document.querySelector(".schedule__input__info.active").style.animation="dateani1 .3s linear forwards";
        document.querySelector(".schedule__input__info.active").style.color=color;
        document.querySelector(".schedule__input__info.active").innerText=message
    }

    const datesetHandler = (event) => {
        setDbDates(document.querySelector(".custom-input").value.split(","))
      // const date = document.querySelector(".custom-input").value.split(",")
      //   console.log("da :",date)
      //   setDbDates(date)
      //   console.log(dbdates)
    }

 console.log("dates : ",dates)
    if (userDb?.verified === "true") {
        return (
            <>
                <div className="normalhome">
                    <div className="availability__div">
                        <div className="availability__div__body">
                            <div className="text">
                                <p>Status</p>
                            </div>
                            <div className="box">
                                <div className="box__text">
                                    <p>{userDb?.availability}</p>
                                </div>
                                <div className="box__btn">
                                    <label className="switch">
                                        <input type="checkbox" onClick={availableHandler} checked={userDb.availability==="available"&&"checked"} />
                                        <span className="slider"> </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="schedule__div">
                        <div className="schedule__body">

                            <div className="schedule__head">
                                <p>Choose Dates</p>
                            </div>

                            <div className="schedule__input">
                                <p className="schedule__input__info active"> </p>
                                <DatePicker
                                    animations={[
                                        transition({
                                            from: 35,
                                            transition: "all 400ms cubic-bezier(0.335, 0.010, 0.030, 1.360)",
                                        }),
                                    ]}
                                    className="rmdp-mobile bg-dark"
                                    inputClass="custom-input"
                                    mobileLabels={{
                                        OK: "Accept",
                                        CANCEL: "Close",
                                    }}
                                    multiple
                                    value={dates}
                                    onChange={datesetHandler}
                                    minDate={today}
                                    format="DD-MM-YYYY"
                                />
                            </div>
                            <div className="schedule__button">
                                <button onClick={dateHandler}>Update</button>
                            </div>
                        </div>
                    </div>
                    <div className="dates__div">
                        <div className="dates__div__body">
                            <div className="head">
                                <p>Available Dates</p>
                            </div>
                            <div className="dates">
                                {
                                    userDb.dates.map((date)=>{
                                        return <p>
                                            {date}
                                        </p>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <div className="normalhome not__verified">
                    <div className="not__verified__div__center">
                        <div className="not__verified__div">
                            <p>Your Account is Not Verified <button onClick={verifyHandler}>Click here</button></p>
                        </div>
                    </div>
                    <div className="verification__div">
                        <div className="verification__form">
                            <form onSubmit={phoneAuth} id="form1" className="form1">
                                <div className="number">
                                    <input type="text" value={phnumber} placeholder="Your Number"
                                           onChange={numberHandler}/>
                                </div>
                                <div className="captcha__div">
                                    <div id="recaptcha-container"></div>
                                </div>

                                <div className="send__otp__btn">
                                    <button type="submit" id="send__otp"> Send Otp</button>
                                </div>

                                <div className="error">
                                    <p>{error}</p>
                                </div>
                            </form >
                            <form onSubmit={codeverify} id="form2" className="form2 active">
                                <div className="verify__code">
                                    <input type="text" value={verificationcode} placeholder="6-Digit Otp"
                                           onChange={codeHandler}/>
                                </div>
                                <div className="error">
                                    <p>{error}</p>
                                </div>
                                <div className="verify__otp__btn">
                                    <button type="submit" id="verify__otp">Verify Otp</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default NormalHome;
