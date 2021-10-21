import React, { useState } from "react";
import "./FirstPage.css"
import {dataCardTree} from '../../data/data';
import InCargeSelection from "./InChargeSelection";
import { CardTree } from "../../models/cardTree";


interface IProps{
    setIsFirstPageActive:Function;
    setCard:Function;
}

const FirstPage: React.FC<IProps>=({setIsFirstPageActive,setCard})=>{
    
    const [inCargeSelection,setInCargeSelection] = useState<CardTree[]>([dataCardTree()[0],dataCardTree()[2],dataCardTree()[4],dataCardTree()[6]])
    console.log(inCargeSelection);
    return (
        <div className="FirstPage">
            <h1>ברוך הבא למערכת לניהול ידע</h1>
            <button className="btnStart" onClick={()=>{
                setIsFirstPageActive(false)
                setCard(dataCardTree()[0]);
            }}
                 >היכנס לאפליקציה</button>
            <div className="InCargeSelection">
                <hr />
                <h2>בחירת האחמ"ש :</h2>
                {inCargeSelection.map((item,index)=>{
                    return <InCargeSelection key={index} card={item} setIsFirstPageActive={setIsFirstPageActive} setCard={setCard} index={index}/>
                })}
            </div>
        </div>
    )
}

export default FirstPage;