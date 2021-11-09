import React from 'react';
import "./loading.css"
import logo from './img/logo.png';




function Loading() {

    return(
        <div className="loading">
            <div className="loading__image">
                <img src={logo} alt="logo"/>
            </div>
        </div>
    )
}

export default Loading;
