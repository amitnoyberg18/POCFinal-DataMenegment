import React from "react";
// import CardQuestionnaire from "../classes/cardQuestion"
import { QuestionCard,FinalAnswerCard } from "../../../models/cardTree";

interface IProps{
    item:FinalAnswerCard;
    setCard:Function;
    setHistory:Function;
}

const CommonAnswers: React.FC<IProps>=({item,setCard,setHistory})=>{
  

    return (
      <div className="answerObj" onClick={()=>{
          setCard((prevCard:QuestionCard | FinalAnswerCard)=>{
              item.prevCard = prevCard;
              (prevCard as QuestionCard).indexSelectedAnswer=undefined;
              setHistory((history:(QuestionCard | FinalAnswerCard)[])=>{
                history.push(prevCard);
                // let pp = history.filter( (ele, ind) => ind === history.findIndex( elem => elem.id === ele.id && elem.id === ele.id))
                return history;
              });
              return item;
            })
        }}>
          <p>{item.cardTitle}</p>
      </div>
    )
}

export default CommonAnswers;