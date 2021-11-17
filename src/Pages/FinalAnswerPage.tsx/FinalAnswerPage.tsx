import React, {useState, useEffect, useRef } from "react";
import "./FinalAnswerPage.css";
import copyPasteimg from '../../icons/copy.jpg'
import copySuccessImg from '../../icons/checkIcon.png'
import { setTimeout } from "timers";
import { QuestionCard,FinalAnswerCard } from "../../models/cardTree";
import { Link } from "react-router-dom";


interface IProps{
    card: FinalAnswerCard;
    setCard: Function;
    setHistory:Function;
    firstCard:QuestionCard;
}
const FinalAnswerPage: React.FC<IProps> = ({card,setCard,setHistory,firstCard}) => {
    
     const [isCopy,setIsCopy]=useState<boolean>(false)
     
     useEffect(()=>{
        inputRef.current?.focus();
    },[])


    const copyPasteAnswer =()=>{
        if(card.cardTitle !== undefined){
            navigator.clipboard.writeText(card.cardTitle);
            setIsCopy((prevIsCopy)=>!prevIsCopy)
            if(isCopy){
                setTimeout(()=>copyPasteAnswer(), 3000);
            }
        }
        //שארי כמה שניות ישתנה לתמונה האחרת
    }
    const inputRef=useRef<HTMLButtonElement>(null);

    return (    
        <div style={{marginTop:"4%"}}>
                <h1>שם התשובה הסופית</h1>            
                <div className="finalDiv">
                    <h2>תחום:<span> {card.crmField}</span></h2>      
                    <h2>תת תחום:<span> {card.crmQuestion}</span> </h2>
                    <h2>שאלה: <span> {card.crmSubField}</span></h2>
                    <h2>תת שאלה: <span> {card.crmSubQuestion}</span></h2>
                </div>
         
                <div className="finalDiv">
                        <h2> איך לטפל בקו ראשון: 
                             <br/> <span>{card.cardTitle}</span>
                        
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
