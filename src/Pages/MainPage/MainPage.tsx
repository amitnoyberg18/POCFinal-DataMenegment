import React from "react";
import { CardTree } from "../../models/cardTree";
import FinalAnswerPage from '../../Pages/FinalAnswerPage.tsx/FinalAnswerPage';
import Answer from "./Answer";
import History from "../History/History";
import CommonAnswers from "../MainPage/CommonAnswers/CommonAnswers";
import {dataCardTree} from "../../data/data";
import SearchBar from "./SearchBar";

import "./MainPage.css";
// import { isTemplateSpan } from "typescript";

interface IProps{
    selectValue:string;
    setSelectValue:Function;
    card?:CardTree;
    isHistoryActive:boolean;
    history:CardTree[];
    setCard:Function;
    setHistory:Function;
    setIsHistoryActive:Function;

}
const MainPage: React.FC<IProps> = ({selectValue,setSelectValue,card,setHistory,setCard,history,isHistoryActive,setIsHistoryActive})=>{
    const getAnswersArr =()=>{
        if(card?.answers!==undefined)
          return card.answers
    
        return []
      }
      
    return (
        <div className="Main">

          <div className="TheQuestionPage">
              {/* search bar */}
              <SearchBar selectValue={selectValue} setSelectValue={setSelectValue} setCard={setCard} setHistory={setHistory}/>
              {/* history page  */}
              {isHistoryActive && <History setIsHistoryActive={setIsHistoryActive} history={history} setHistory={setHistory} setCard={setCard} />}
              {!isHistoryActive && card?.nextCards!==undefined && 
                <div className="card">
                    <div className="question">
                        <h2>{card.questionText}</h2>
                    </div>
                  {getAnswersArr().map((answer,index)=>{
                    return <Answer card={card} setHistory={setHistory} answer={answer} index={index} key={index} setCard={setCard}/>
                  })}
                </div>}   
              {/* TheFinalAnswerPage is here for the styling */}
              {!isHistoryActive && card?.nextCards === undefined  &&<FinalAnswerPage setSelectValue={setSelectValue} setHistory={setHistory} theWayToSolve={card?.questionText} crmDetails={getAnswersArr()} setCard={setCard}/>}     
          </div>
          {!isHistoryActive && card?.nextCards!==undefined &&<div className="commonAnswers">
            <hr />
              <h1>תשובות נפוצות</h1>

              {dataCardTree().filter((item:CardTree,index:number)=>item.nextCards === undefined &&item.clicked>30).map((item:CardTree,index:number)=>{
                return <CommonAnswers key={index} setHistory={setHistory} card={item} setCard={setCard}/>
              })}
            </div>}
        </div>   
    )
}
export default MainPage;