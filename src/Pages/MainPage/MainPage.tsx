import React from "react";
import { CardTree } from "../../models/cardTree";
import FinalAnswerPage from '../../Pages/FinalAnswerPage.tsx/FinalAnswerPage';
import Answer from "./Answer";
import History from "../History/History";
import CommonAnswers from "../MainPage/CommonAnswers/CommonAnswers";
import {dataCardTree} from "../../data/data";


import "./MainPage.css";

interface IProps{
    selectValue:string;
    setSelectValue:Function;
    card:CardTree;
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
            <div className="Search">
                  <label className="searchBoxtitle">חיפוש תשובות סופיות:</label>
                  {/* <input className="searchBox" type="text" /> */}
                  <select value={selectValue} id="answersSelect" style={{width:"20%"}} onChange={(e)=>{
                    if(e.target.value === "-1"){
                      setCard(dataCardTree()[0]);
                      setHistory([]);
                      
                    }else{
                      setCard((prevCard:CardTree)=>{
                        const newCard = dataCardTree().filter((item:CardTree,index:number)=>item.nextCards === undefined)[Number(e.target.value)];
                        newCard.prevCard = prevCard;
                        prevCard.indexSelectedAnswer=undefined;
                        setHistory((history:CardTree[])=>{
                          history.push(prevCard);
                          // let pp = history.filter( (ele, ind) => ind === history.findIndex( elem => elem.id === ele.id && elem.id === ele.id))
                          return history;
                        });
                        return newCard;
                      })
                    }
                    setSelectValue(e.target.value);
                    }}>
                    <option key="-1" value="-1"></option>
                    {dataCardTree().filter((item:CardTree,index:number)=>item.nextCards === undefined).map((item:CardTree,index:number)=>{
                      return <option key={index} value={index.toString()}>{item.questionText}</option>
                    })}
                  </select>
              </div>
              {/* history page  */}
              {isHistoryActive && <History setIsHistoryActive={setIsHistoryActive} history={history} setHistory={setHistory} setCard={setCard} />}
              {!isHistoryActive && card.nextCards!==undefined && 
                <div className="card">
                    <div className="question">
                        <h2>{card.questionText}</h2>
                    </div>
                  {getAnswersArr().map((answer,index)=>{
                    return <Answer setHistory={setHistory} answer={answer} index={index} key={index} setCard={setCard}/>
                  })}
                </div>}   
              {/* TheFinalAnswerPage is here for the styling */}
              {!isHistoryActive && card.nextCards === undefined  &&<FinalAnswerPage setSelectValue={setSelectValue} setHistory={setHistory} theWayToSolve={card.questionText} crmDetails={getAnswersArr()} setCard={setCard}/>}     
          </div>
          {!isHistoryActive && card.nextCards!==undefined &&<div className="commonAnswers">
            <hr />
              <h1>תשובות נפוצות</h1>

              {dataCardTree().filter((item:CardTree,index:number)=>item.nextCards === undefined).map((item:CardTree,index:number)=>{
                return <CommonAnswers key={index} setHistory={setHistory} card={item} setCard={setCard}/>
              })}
            </div>}
        </div>   
    )
}
export default MainPage;