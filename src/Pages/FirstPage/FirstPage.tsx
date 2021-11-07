import React, { useState } from "react";
import "./FirstPage.css"
import {dataCardTree} from '../../data/data';
import InCargeSelection from "./InChargeSelection";
import { CardTree } from "../../models/cardTree";
import compass from "../../icons/compass.png";
// import App from "../../App";
import { Link } from "@material-ui/core";



interface IProps{
    setCard:Function;
}

const FirstPage: React.FC<IProps>=({setCard})=>{
    // const [card,setCard]=useState<Iprops>(
    //         ()=>{
    //         const newCard = dataCardTree()[0];
    //         return newCard;
    //       });  
    const [inCargeSelection,setInCargeSelection] = useState<CardTree[]>([dataCardTree()[0],dataCardTree()[2],dataCardTree()[4],dataCardTree()[6]])
    console.log(inCargeSelection);
    return (
        <div className="FirstPage">
            <img id="compass" src={compass} alt="compass"/>
            <h1>ברוך הבא למערכת לניהול ידע</h1>
            <Link href="/mainApp">
                <button className="btnStart" >היכנס לאפליקציה</button>
            </Link>
            <div className="InCargeSelection">
                <hr />
                <h2>בחירת האחמ"ש :</h2>
                {inCargeSelection.map((item,index)=>{
                    return <InCargeSelection key={index} card={item} setCard={setCard} index={index}/>
                })}
            </div>
        </div>
    )
}

export default FirstPage;