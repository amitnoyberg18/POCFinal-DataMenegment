import React from "react";
import { CardTree } from "../../models/cardTree";
import FinalAnswerPage from '../../Pages/FinalAnswerPage.tsx/FinalAnswerPage';
import Answer from "./Answer";
import CommonAnswers from "../MainPage/CommonAnswers/CommonAnswers";
import {dataCardTree} from "../../data/data";
import "./MainPage.css";

interface IProps{
    card:CardTree;
    setCard:Function;
    setHistory:Function;

}
const MainPage: React.FC<IProps> = ({card,setHistory,setCard})=>{
    const getAnswersArr =()=>{
        if(card?.answers!==undefined)
          return card.answers
    
        return []
      }


    return (
        <div className="Main">

        {/* <History history={history} setHistory={setHistory} setCard={setCard} /> */}
      <div className="TheQuestionPage">
      <div className="Search">
            <p className="searchBoxtitle">חיפוש תשובות סופיות:</p>
            <input className="searchBox" type="text" />
        </div>
        {card.nextCards!==undefined && 
        <div className="card">
            <div className="question">
                <p>{card.questionText}</p>
            </div>
          {getAnswersArr().map((answer,index)=>{
            return <Answer setHistory={setHistory} answer={answer} index={index} key={index} setCard={setCard}/>

          })}

          <div className="commonAnswers">
          <hr />
            <h1>תשובות נפוצות</h1>

            {dataCardTree().filter((item:CardTree,index:number)=>item.nextCards === undefined).map((item:CardTree,index:number)=>{
              return <CommonAnswers key={index} setHistory={setHistory} card={item} setCard={setCard}/>
            })}
            </div>
        </div>}        
      </div>
            {card.nextCards === undefined  &&<FinalAnswerPage setHistory={setHistory} theWayToSolve={card.questionText} crmDetails={getAnswersArr()} setCard={setCard}/>}

    </div>
    
    )
}
export default MainPage;