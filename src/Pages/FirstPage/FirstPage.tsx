import React, { useEffect, useState } from "react";
import "./FirstPage.css"
import {dataCardTree} from '../../data/data';
import InCargeSelection from "./InChargeSelection";
import { CardTree } from "../../models/cardTree";
import compass from "../../icons/compass.png";
// import App from "../../App";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";



interface Istate{
    cardTreeArray:CardTree[];
}

const FirstPage=()=>{
    const [inCargeSelection,setInCargeSelection] = useState<Istate["cardTreeArray"]>([])
    console.log(inCargeSelection);

    //fetch the inChargeData
    useEffect(()=>{
        setInCargeSelection([dataCardTree()[0],dataCardTree()[2],dataCardTree()[4],dataCardTree()[6]]);
    },[setInCargeSelection])
    return (
        <div className="FirstPage">
            {/* {<CSSTransition
                in = {Boolean(inCargeSelection)}
                appear = {true}
                timeout = {1600}
                classNames ="fade"
                >    */}
                <div> 
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
            </div>
            {/* </CSSTransition>} */}
        </div>
    )
}

export default FirstPage;