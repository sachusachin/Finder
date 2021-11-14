import React, {useEffect} from "react"
import {
    useNavigate
} from 'react-router-dom';

const Protected = ({Cmp,userDetails,logout}) => {

    const navigate = useNavigate();

    useEffect(()=>{
        if (localStorage.getItem("user")==="false"){
            navigate('/')
        }
    },[])


    return (
        <>
            <Cmp userDetails={userDetails} logout={logout}/>
        </>
    )
}

export default Protected;