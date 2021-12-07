import React, {useState} from 'react';
import userLogo from './img/user1.png'
import Topnav from "./Topnav";
// import './topnav.css'
import './bookinghome.css'

import {BrowserRouter, Link} from "react-router-dom";
import searchImg from "./img/search.png";
import Filter from "./Filter";



function Bookinghome() {


    const [filterState,setFilterstate]=useState(false)
    const filterStateHandler = () => {
        window.scrollTo(0,0)
      setFilterstate(!filterState)
    }
    return(
        <BrowserRouter>
            <div className="bookinghome">
                <Topnav profileurl={userLogo}/>
                <div className="bookinghome__body">
                    {
                        filterState===true?<div className="dates__picker__container"><Filter btn={filterStateHandler}/></div>
                            :<div className="filter__btn">
                                <button onClick={filterStateHandler}><i className="fal fa-search"> </i></button>
                            </div>

                    }
                    {/*<div className="nosearch">*/}
                    {/*    <img src={searchImg} alt="search"/>*/}
                    {/*</div>*/}
                </div>
            </div>
        </BrowserRouter>

    )
}

export default Bookinghome;
