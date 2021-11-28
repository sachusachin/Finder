import React, {useEffect, useState} from "react"
// import {Link} from "react-router-dom";
// import logo from "./img/logo.png";
import './topnav.css'
import './settings.css'
import Imagepreview from "./Imagepreview";
import {db, storage} from "./firebase";
import {cityNames, worksData} from "./Datas";

const Settings = ({userDetails,logout}) => {

    const [newimage,setNewimage] = useState("")
    const [previewstate,setPreviewstate] = useState("previewImage deactive")
    const [googleDetails,setGoogledetails]=useState("")
    const [progress,setProgress]=useState(0)

    const [errormsg,setErrormsg]=useState("");
    const[nameError,setNameError]=useState("")
    const[addressError,setAddressError]=useState("")

    const [usernames,setUsernames]=useState([]);
    const [name,setName]=useState(userDetails.name);

    const[gender,setGender]=useState(userDetails.gender)
    const[address,setAddress]=useState(userDetails.address)

    const [phonenumber,setNumber]=useState(userDetails.phonenumber);

    useEffect(()=>{
        window.scroll(0,0)

        const googledetails = localStorage.getItem("user")
        const googleid = JSON.parse(googledetails)
        setGoogledetails(googleid.uid)
        console.log(googleid.uid)
    },[])

  // -------------------- Input tag automatic click --------------- //

    const ProfileImageHandler = () => {
        const x = document.querySelector(".image-upload")
        x.click()

    }

  // -------------------- get ang check image --------------- //

    const imageHandler= (event) =>{
        if (event.target.files && event.target.files.length>0){
            checkImage(event.target.files[0])
        }
    }

    const checkImage = (img) => {
        console.log(img.type)
      if(img.type.includes("image") && !(img.type.includes("gif")) ){
          setNewimage(img)
          setPreviewstate("previewImage active")
      }else{
          ImageMessage("Invalid File")
          setPreviewstate("previewImage deactive")
          setNewimage("")
          setTimeout(()=> document.querySelector(".info__text").style.animation="",4000)
      }
    }

    const ImageMessage = (msg)=>{
        document.querySelector(".info__text").innerText = msg
        document.querySelector(".info__text").style.animation= "msg1 .5s linear forwards"
    }

  // ---------------------- Image preview buttons handler ---------------------- //

    const UploadImage = () => {
      const uploadTask = storage().ref(`${googleDetails}`)
          .child("profile")
          .put(newimage);
      uploadTask.on(
          "state_changed",
          (snapshot)=>{
              const progress = ((snapshot.bytesTransferred/snapshot.totalBytes)*100);
              setProgress(progress)
          },
          (error)=>{
              console.log(error)
              ImageMessage("Not Uploaded")
          },
          ()=>{
              storage().ref(`${googleDetails}`)
                  .child("profile")
                  .getDownloadURL()
                  .then(async (imageUrl) => {

                      const checkDocs = db.doc(`users/${googleDetails}`);

                      const snapshot = await checkDocs.get();

                      if (snapshot.exists) {

                          try {
                              checkDocs.update({
                                  profileImage: imageUrl
                                  }
                              ).then(() => {
                                  ImageMessage("Success")
                                  setPreviewstate("previewImage deactive")
                                  setNewimage("")
                                  setProgress(0)
                                  setTimeout(()=> document.querySelector(".info__text").style.animation="",4000)
                                  console.log(userDetails.profileImage)

                              })
                          } catch (error) {
                              console.log("Error database : ", error);
                              console.log(userDetails.profileImage)
                          }
                      }
                  })
          }
      )
    }
    const CancelImage = () => {
        setPreviewstate("previewImage deactive")
        setNewimage("")
    }



  // -------------------- Details edit Handlers --------------------- //

    useEffect(()=>{
        db.collection(`users`).onSnapshot(snapshot =>
            (setUsernames(snapshot.docs.map(doc => doc.data())))
        )
    },[]);

    const usernameHandler = (e) => {
        const namevalue = e.target.value.trim()
        setName(namevalue)
        if (namevalue===""){
            setNameError("Invalid UserName")

        }else if(!(/^[a-zA-Z0-9]+$/.test(namevalue))){
            setNameError("Invalid UserName")

        }else if (namevalue.length > 15 || namevalue.length < 5){
            setNameError("UserName must be 5 to 15 characters")

        }else if(usernames){
            console.log("inside mother fucker!!!!!")
            let al = 0
            usernames.map((username)=>{
                if(username.name.toLowerCase() === namevalue.toLowerCase() && userDetails.name.toLowerCase() !== namevalue.toLowerCase()){
                    setNameError("username Already exist")
                    al+=1
                }
            })
            if(al===0){
                setNameError("")
            }else{
                setNameError("username Already exist")
            }
        }else{
            setNameError("")
        }
    }

    const mobilenumberHandler = (e) => {
        const numbervalue = e.target.value.trim()
        setNumber(numbervalue)
        if (numbervalue===""){
            setErrormsg("Invalid Mobilenumber")
        }else if (!(/^\d{10}$/.test(numbervalue))){
            setErrormsg("Mobilenumber must be 10 numbers")
        }else if(numbervalue){
            console.log("inside mother fucker!!!!!")
            let al = 0
            usernames.map((usermobile)=>{
                if(usermobile.phonenumber === numbervalue){
                    setErrormsg("Mobilenumber Already exist")
                    al+=1
                }
            })

            if(al===0){
                setErrormsg("")
            }else{
                setErrormsg("Mobilenumber Already exist")
            }
        }else{
            setErrormsg("")
        }
    }
    //
    // const workHandler = (e) => {
    //     const workvalue = e.target.value
    //     setWork(workvalue)
    //     worksData.map((data)=>{
    //         if(data.toLocaleLowerCase().trim()!==work.toLocaleLowerCase()){
    //             setErrormsg("Enter valid Profession")
    //             document.querySelector(".form3__next__btn").style.pointerEvents="none"
    //             document.querySelector("#work").style.border="1px solid red"
    //         }else{
    //             setErrormsg("")
    //             document.querySelector(".form3__next__btn").style.pointerEvents="all"
    //             document.querySelector("#work").style.border="1px solid green"
    //         }
    //     })
    // }
    //
    // const cityHandler = (e) => {
    //     const cityvalue = e.target.value
    //     setCity(cityvalue)
    //     cityNames.map((data)=>{
    //         if(data.toLocaleLowerCase().trim()!==city.toLocaleLowerCase()){
    //             setErrormsg("Enter valid city")
    //             document.querySelector(".form4__next__btn").style.pointerEvents="none"
    //             document.querySelector("#city").style.border="1px solid red"
    //         }else{
    //             setErrormsg("")
    //             document.querySelector(".form4__next__btn").style.pointerEvents="all"
    //             document.querySelector("#city").style.border="1px solid green"
    //         }
    //     })
    // }
    //
    const addressHandler = (e) => {
        const addressvalue = e.target.value.trim()
        setAddress(addressvalue)
        if (addressvalue===""){
            setAddressError("Invalid Address")
        }else if(!(/^[a-zA-Z0-9\s,'-]*$/.test(addressvalue))){
            setAddressError("Invalid Address")
        }else if(addressvalue.length < 5){
            setAddressError("Address must be more than 5 characters")
        }else if(addressvalue.length > 50){
            setAddressError("Address must be less than 50 characters")
        }else{
            setAddressError("")
        }
    }

    const genderHandler =(event)=>{
       const gen = event.target.innerText
        if(gen==="Male"){
            setGender("male")
        }else if(gen === "FeMale"){
            setGender("female")
        }
    }

    return (
        <div className="settings">
            <div className="info__text"> </div>
            <Imagepreview img={newimage} UploadImage={UploadImage} CancelImage={CancelImage} state={previewstate} progress={progress}/>
            <div className="profile__img">
               <div className="image">
                   <img src={userDetails.profileImage} alt="profile" />
               </div>
                <div className="image__set__button">
                    <input type="file" hidden className="image-upload" onChange={imageHandler}/>
                    <button onClick={ProfileImageHandler}>Change Profile Photo</button>
                </div>
            </div>
            <div className="details">
                <Input disabled={false} type={"text"} title={"Username"} value={name} handler={usernameHandler} errormsg={nameError}/>

                <Input disabled={true} type={"text"} title={"Phone Number"} value={phonenumber}  errormsg={errormsg}/>

                <Input disabled={true} type={"email"} title={"Email"} value={userDetails.emailid}/>

                <Input disabled={true} type={"text"} title={"Profession"} value={userDetails.work}/>

                <Input disabled={true} type={"text"} title={"City"} value={userDetails.city}/>

                <Input disabled={false} type={"text"} title={"Address"} value={address} handler={addressHandler} errormsg={addressError}/>

                <div className="input__container radio">
                    <div className="head">
                        <p>Gender</p>
                    </div>
                    <div className="radio_divs">
                        <div className={gender==="male"?"radio male active":"radio male"}  onClick={genderHandler} id="male">
                            <p>Male</p>
                        </div>
                        <div className={gender==="female"?"radio male active":"radio male"} onClick={genderHandler} id="female">
                            <p>FeMale</p>
                        </div>
                    </div>
                </div>

            </div>
            <button onClick={logout}>logout</button>
        </div>
    )
}

export default Settings;


export const Input = ({title,type,value,disabled,handler,errormsg})=>{
    return(
        <div className="input__container">
            <div className="head">
                <p>{title}</p>
            </div>
            <div className="input">
                <input type={type} value={value} disabled={disabled} onChange={handler}/>
            </div>
            <div className="error__message">
                <p>{errormsg}</p>
            </div>
        </div>
    )
}