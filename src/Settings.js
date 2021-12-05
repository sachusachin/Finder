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

    const [work,setWork] = useState(userDetails.work)

//-----------------  upade button state ---------------------------------- //

    const [namebtnState,setnameBtnState] = useState(false)
    const [addressbtnState,setaddresssetBtnState] = useState(false)
    const [genderbtnState,setgenderetBtnState] = useState(false)
    const [profbtnState,setprofbtnState] = useState(false)

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
        var nameErr = "yes"
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
                nameErr=""
            }else{
                setNameError("username Already exist")
            }
        }else{
            setNameError("")
            nameErr=""
        }

        if((namevalue.toLowerCase() !== userDetails.name.toLowerCase()) && nameErr===""){
            setnameBtnState(true)
        }else{
            setnameBtnState(false)
        }
    }

    //
    const workHandler = (e) => {
        const workvalue = e.target.value
        setWork(workvalue)
        worksData.map((data)=>{
            if(data.toLocaleLowerCase().trim()!==work.toLocaleLowerCase()){
                setErrormsg("Enter valid Profession")
            }else{
                setErrormsg("")
            }
        })
    }
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
        var addressErr = "yes";
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
            addressErr=""
        }

        if((addressvalue.toLowerCase() !== userDetails.address.toLowerCase()) && addressErr===""){
                setaddresssetBtnState(true)
        }else{
            setaddresssetBtnState(false)
        }

    }

    const genderHandler =(event)=>{
       const gen = event.target.innerText
        if(gen==="Male"){
            setGender("male")
        }else if(gen === "FeMale"){
            setGender("female")
        }
        if(gen.toLowerCase() !== userDetails.gender){
            setgenderetBtnState(true)
        }else{
            setgenderetBtnState(false)
        }
    }

    const selectHandler = (event) => {
        setWork(event.target.innerText.trim())
        setprofbtnState(true)
        setErrormsg("")
    }

    const detailsUpdateHandler = async (event) => {
      const value  = event.target.value
        console.log(googleDetails)
        const checkDocs = db.doc(`users/${googleDetails}`);

        const snapshot = await checkDocs.get();

        if(value === "username"){

            if (snapshot.exists){
                try{
                    checkDocs.update({
                            name:name
                        }
                    ).then(()=>{
                        // alert("success");
                        ImageMessage("Updated successfully");
                        setTimeout(()=> document.querySelector(".info__text").style.animation="",4000)
                        setnameBtnState(false)
                    })
                }catch (error){
                    console.log("Error database : ",error);
                }
            }
        }else if(value === "address"){
            if (snapshot.exists){
                try{
                    checkDocs.update({
                            address:address
                        }
                    ).then(()=>{
                        // alert("success");
                        ImageMessage("Updated successfully");
                        setTimeout(()=> document.querySelector(".info__text").style.animation="",4000)
                        setnameBtnState(false)
                    })
                }catch (error){
                    console.log("Error database : ",error);
                }
            }
        }else if(value === "gender"){
            if (snapshot.exists){
                try{
                    checkDocs.update({
                            gender:gender
                        }
                    ).then(()=>{
                        // alert("success");
                        ImageMessage("Updated successfully");
                        setTimeout(()=> document.querySelector(".info__text").style.animation="",4000)
                        setgenderetBtnState(false)
                    })
                }catch (error){
                    console.log("Error database : ",error);
                }
            }
        }else if(value === "profession"){
            if (snapshot.exists){
                try{
                    checkDocs.update({
                            work:work
                        }
                    ).then(()=>{
                        // alert("success");
                        ImageMessage("Updated successfully");
                        setTimeout(()=> document.querySelector(".info__text").style.animation="",4000)
                        setprofbtnState(false)
                    })
                }catch (error){
                    console.log("Error database : ",error);
                }
            }
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
                <Button handler={detailsUpdateHandler} value={'username'} state={namebtnState}/>

                <Input disabled={true} type={"text"} title={"Phone Number"} value={phonenumber}  />

                <Input disabled={true} type={"email"} title={"Email"} value={userDetails.emailid}/>

                <Input
                    disabled={false}
                    type={"text"}
                    title={"Profession"}
                    value={work}
                    handler={workHandler}
                    errormsg={errormsg}
                    selectHandler={selectHandler}
                    work={work}
                    userDetails={userDetails.work}
                />

                <Button handler={detailsUpdateHandler} value={'profession'} state={profbtnState}/>
                <Input disabled={true} type={"text"} title={"City"} value={userDetails.city}/>

                <Input disabled={false} type={"text"} title={"Address"} value={address} handler={addressHandler} errormsg={addressError}/>
                <Button handler={detailsUpdateHandler} value={'address'} state={addressbtnState}/>
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
                <Button handler={detailsUpdateHandler} value={"gender"} state={genderbtnState}/>
            </div>
            <div className="log__out">
                <button onClick={logout} className="settings__logout"><i className="far fa-sign-out"> </i>   logout</button>
            </div>
        </div>
    )
}

export default Settings;


export const Input = ({title,type,value,disabled,handler,errormsg,selectHandler,work,userDetails})=>{
    return(
        <div className="input__container">
            <div className="head">
                <p>{title}</p>
            </div>
            <div className="input">
                <input type={type} value={value} disabled={disabled} onChange={handler}/>
            </div>
            {
                (work!==userDetails && !worksData.includes(work) ) &&

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
            <div className="error__message">
                <p>{errormsg}</p>
            </div>
        </div>
    )
}

export const Button =({handler,value,state})=>{
    return(
        <div className={state&&"details__update active"||"details__update"}>
            <button className="update__btn" onClick={handler} value={value}>Update</button>
        </div>
    )
}