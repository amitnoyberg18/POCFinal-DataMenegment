import React from "react";
import { CardTree } from "../../models/cardTree";
import "./History.css"

interface IProps{
    history: CardTree[];
    setCard:Function;
    setHistory:Function;
    setIsHistoryActive:Function;
}
const History: React.FC<IProps>=({history,setCard,setHistory,setIsHistoryActive})=>{


    const handleBackInHistory = (item:CardTree,index:number)=>{
        setCard(item);
        setHistory((prevHistory:CardTree[])=>{
          const newHistory = prevHistory.filter((ele, ind) => ind === prevHistory.findIndex(elem => elem.id === ele.id && elem.id === ele.id));
          newHistory.splice(index,newHistory.length);
          return newHistory;
        })
      }

    return (
        <div className="history">
            <div className="hasHistory">
                <button className="historyCloseButton" onClick={()=>setIsHistoryActive(false)}>X</button>
                {history.filter( (ele, ind) => ind === history.findIndex( elem => elem.id === ele.id && elem.id === ele.id)).map((item,index)=>{
                if(item.answers !== undefined ){
                    return <div className="historyItem" style={{cursor: "pointer"}} key={index} onClick={()=>{
                        handleBackInHistory(item,index);
                        setIsHistoryActive(false);
                        }}>
                    <h3>{item.questionText}</h3>
                    {item.indexSelectedAnswer!==undefined &&<p>{item.answers[item.indexSelectedAnswer]}</p>}
                    {/* the next code needs to run when he picks a answer from the common answers */}
                    {item.indexSelectedAnswer === undefined && item.nextCards !== undefined && <p key={index}>לא נבחרה תשובה</p>}

                    </div>
                }
                    return <></>
                })}
            </div>
            {history.filter( (ele, ind) => ind === history.findIndex( elem => elem.id === ele.id && elem.id === ele.id)).length === 0 && 
            <div className="hasNoHistory">
                <h1>No History</h1>
            </div>}
      </div>
    )
}

export default History;