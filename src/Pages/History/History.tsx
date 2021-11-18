import React from "react";
import { QuestionCard, FinalAnswerCard } from "../../models/cardTree";
import "./History.css"

interface IProps{
    history: (QuestionCard | FinalAnswerCard)[];
    setCard:Function;
    setHistory:Function;
    setIsHistoryActive:Function;
}
const History: React.FC<IProps>=({history,setCard,setHistory,setIsHistoryActive})=>{


    const handleBackInHistory = (item:QuestionCard | FinalAnswerCard ,index:number)=>{
        setCard(item);
        setHistory((prevHistory:(QuestionCard | FinalAnswerCard)[])=>{
          const newHistory = prevHistory.filter((ele, ind) => ind === prevHistory.findIndex(elem => elem.id === ele.id && elem.id === ele.id));
          newHistory.splice(index,newHistory.length);
          return newHistory;
        })
      }

    return (
        <div className="history">
            <div className="hasHistory">
                <button className="historyCloseButton" onClick={()=>setIsHistoryActive(false)}>X</button>
                {history.filter( (ele, ind) => ind === history.findIndex( elem => elem.id === ele.id && elem.id === ele.id)).map((item:QuestionCard | FinalAnswerCard,index:number)=>{
                    return <div className="historyItem" style={{cursor: "pointer"}} key={index} onClick={()=>{
                        handleBackInHistory(item,index);
                        setIsHistoryActive(false);
                        }}>
                        <h3>{item.cardTitle}</h3>
                        {item.type ==='QuestionCard' && item.indexSelectedAnswer !== undefined &&<p>{item.answers[item.indexSelectedAnswer]}</p>}
                        {/* the next code needs to run when he picks a answer from the common answers */}
                        {(item as QuestionCard).indexSelectedAnswer === undefined && (item as QuestionCard).nextCards !== undefined && <p key={index}>לא נבחרה תשובה</p>}

                    </div>})}
            </div>
            {history.filter( (ele, ind) => ind === history.findIndex( elem => elem.id === ele.id && elem.id === ele.id)).length === 0 && 
            <div className="hasNoHistory">
                <h1>No History</h1>
            </div>}
      </div>
    )
}

export default History;