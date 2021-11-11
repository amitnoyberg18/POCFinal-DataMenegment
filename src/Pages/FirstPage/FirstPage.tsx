import React, { useEffect, useState } from "react";
import "./FirstPage.css"
import InCargeSelection from "./InChargeSelection";
import { CardTree } from "../../models/cardTree";
import compass from "../../icons/compass.png";
// import App from "../../App";
import { Link } from "react-router-dom";
// import { CSSTransition } from "react-transition-group";
import Axios from '../../customHook/Axios';


interface Istate{
    cardTreeArray:CardTree[];
}


const FirstPage=()=>{
    const [inCargeSelection,setInCargeSelection] = useState<Istate["cardTreeArray"]>([]);

    useEffect(()=>{
        Axios(setInCargeSelection,'http://localhost:8000/api/InchargeSelected');
    },[])
    return (
        <div className="FirstPage">
            {/* {<CSSTransition
                in = {Boolean(inCargeSelection)}
                appear = {true}
                timeout = {1600}
                classNames ="fade"
                >    */}
                {inCargeSelection !== undefined &&<div> 
                    <img id="compass" src={compass} alt="compass"/>
                    <h1>ברוך הבא למערכת לניהול ידע</h1>
                    <Link to="/mainApp">
                        <button className="btnStart" >היכנס לאפליקציה</button>
                    </Link>
                    <div className="InCargeSelection">
                        <hr />
                        <h2>בחירת האחמ"ש :</h2>
                        {inCargeSelection.map((item,index)=>{
                            return <InCargeSelection key={index} card={item} index={index}/>
                        })}
                </div>
            </div>}
            {inCargeSelection === undefined && <h2>Loading...</h2>}
            {/* </CSSTransition>} */}
        </div>
    )
}

export default FirstPage;