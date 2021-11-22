import React, { useEffect, useState } from "react";
import "./FirstPage.css"
import InCargeSelection from "./InChargeSelection";
import { QuestionCard, FinalAnswerCard } from "../../models/cardTree";
import compass from "../../icons/compass.png";
// import App from "../../App";
import { Link } from "react-router-dom";
// import { CSSTransition } from "react-transition-group";
import Axios from '../../customHook/getAxios';


interface Istate{
    cardTreeArray:(QuestionCard | FinalAnswerCard)[];
}


const FirstPage=()=>{
    const [inCargeSelection,setInCargeSelection] = useState<Istate["cardTreeArray"]>([]);

    useEffect(()=>{
        Axios(setInCargeSelection,'http://localhost:8000/api/card/InchargeSelected');
    },[])
    return (
        <div className="FirstPage">
            {/* {<CSSTransition
                in = {Boolean(inCargeSelection)}
                appear = {true}
                timeout = {1600}
                classNames ="fade"
                >    */}
                <img id="compass" src={compass} alt="compass"/>
                <h1>ברוך הבא למערכת לניהול ידע</h1>
                {inCargeSelection !== undefined &&
                <div> 
                    <Link to="/mainApp">
                        <button style={{ marginRight: '4%'}} className="btnStart" >היכנס לאפליקציה</button>
                    </Link>
                    <Link to="/ManagePage">
                        <button style={{ marginRight: '1%'}} className="btnStart" >היכנס לניהול</button>
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