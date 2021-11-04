import React, {useState, useEffect, useRef } from "react";
import "./FinalAnswerPage.css";
import {dataCardTree} from "../../data/data"
import copyPasteimg from '../../icons/copy.jpg'
import copySuccessImg from '../../icons/checkIcon.png'
import { setTimeout } from "timers";

interface IProps{
    // cardQuestionnaire: CardQuestionnaire<string>;
    theWayToSolve: string;
    crmDetails:string[];
    setCard: Function;
    setHistory:Function;
    setSelectValue:Function;
}
const FinalAnswerPage: React.FC<IProps> = ({setSelectValue,theWayToSolve,crmDetails,setCard,setHistory}) => {
    
     const [isCopy,setIsCopy]=useState<boolean>(false)
     
     useEffect(()=>{
        inputRef.current?.focus();
    },[])


    const copyPasteAnswer =()=>{
        navigator.clipboard.writeText(theWayToSolve);
            setIsCopy(!isCopy)
        if(isCopy){
            setTimeout(()=>copyPasteAnswer(), 3000);
        }

        //שארי כמה שניות ישתנה לתמונה האחרת
    }
    const inputRef=useRef<HTMLButtonElement>(null);


    const copyPasteImgFun=()=>{
        return copyPasteimg;
    }


    return (    
        <div style={{marginTop:"4%"}}>
                <h1>שם התשובה הסופית</h1>            
                <div className="finalDiv">
                    <h2>תחום:<span> {crmDetails[0]}</span></h2>
                    
                    <h2>תת תחום:<span> {crmDetails[1]}</span> </h2>
                    <h2>שאלה: <span> {crmDetails[2]}</span></h2>
                    <h2>תת שאלה: <span> {crmDetails[3]}</span></h2>
                </div>
         
                <div className="finalDiv">
                        <h2> איך לטפל בקו ראשון: 
                             <br/> <span>{theWayToSolve}</span>
                        
                        </h2>
                        <button onClick={copyPasteAnswer}>
                            <img src={isCopy ? copySuccessImg : copyPasteimg} style={{width:"20px",height:"18px"}} ></img>
                            </button>

                      
                </div>
                <div className="backbutton">
                    <button ref={inputRef} className="backToStart" 
                    onClick={()=>
                        {
                            setCard(()=>dataCardTree()[0]);
                            setHistory([]);
                            setSelectValue("-1");
                        }}
                        >חזרה לתחילת השאלון</button>
                </div>

        </div>
        
     );
}
 
export default FinalAnswerPage;
