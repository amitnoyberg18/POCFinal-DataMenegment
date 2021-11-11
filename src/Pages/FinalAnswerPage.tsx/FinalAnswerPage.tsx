import React, {useState, useEffect, useRef } from "react";
import "./FinalAnswerPage.css";
import copyPasteimg from '../../icons/copy.jpg'
import copySuccessImg from '../../icons/checkIcon.png'
import { setTimeout } from "timers";
import { CardTree } from "../../models/cardTree";
import { Link } from "react-router-dom";


interface IProps{
    // cardQuestionnaire: CardQuestionnaire<string>;
    theWayToSolve?: string;
    crmDetails:string[];
    setCard: Function;
    setHistory:Function;
    firstCard:CardTree | undefined
}
const FinalAnswerPage: React.FC<IProps> = ({theWayToSolve,crmDetails,setCard,setHistory,firstCard}) => {
    
     const [isCopy,setIsCopy]=useState<boolean>(false)
     
     useEffect(()=>{
        inputRef.current?.focus();
    },[])


    const copyPasteAnswer =()=>{
        if(theWayToSolve !== undefined){
            navigator.clipboard.writeText(theWayToSolve);
            setIsCopy((prevIsCopy)=>!prevIsCopy)
            if(isCopy){
                setTimeout(()=>copyPasteAnswer(), 3000);
            }
        }
        //שארי כמה שניות ישתנה לתמונה האחרת
    }
    const inputRef=useRef<HTMLButtonElement>(null);


    // const copyPasteImgFun=()=>{
    //     return copyPasteimg;
    // }


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
                            <img alt="copyImg" src={isCopy ? copySuccessImg : copyPasteimg} style={{width:"20px",height:"18px"}} ></img>
                            </button>

                      
                </div>
                <div className="backbutton">
                <Link to='/mainApp'>
                    <button ref={inputRef} className="backToStart" 
                    onClick={()=>
                        {
                            setCard(()=>firstCard);
                            setHistory([]);
                        }}
                        >חזרה לתחילת השאלון</button>
                </Link>

                </div>

        </div>
        
     );
}
 
export default FinalAnswerPage;
