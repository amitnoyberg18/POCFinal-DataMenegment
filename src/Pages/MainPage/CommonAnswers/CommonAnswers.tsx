import React from "react";
// import CardQuestionnaire from "../classes/cardQuestion"
import { CardTree } from "../../../models/cardTree";

interface IProps{
    card:CardTree;
    setCard:Function;
    setHistory:Function;
    data:CardTree[];
}

const CommonAnswers: React.FC<IProps>=({card,setCard,setHistory,data})=>{
  

    return (
      <div className="answerObj" onClick={()=>{
          setCard((prevCard:CardTree)=>{
              card.prevCard = prevCard;
              prevCard.indexSelectedAnswer=undefined;
              setHistory((history:CardTree[])=>{
                history.push(prevCard);
                // let pp = history.filter( (ele, ind) => ind === history.findIndex( elem => elem.id === ele.id && elem.id === ele.id))
                return history;
              });
              return card;
            })
        }}>
          <p>{card.questionText}</p>
      </div>
    )
}

export default CommonAnswers;