import React, { useEffect, useState } from "react";
import { QuestionCard, FinalAnswerCard } from "../../models/cardTree";
import FinalAnswerPage from '../../Pages/FinalAnswerPage.tsx/FinalAnswerPage';
import Answer from "./Answer";
import History from "../History/History";
import CommonAnswers from "../MainPage/CommonAnswers/CommonAnswers";
import SearchBar from "./SearchBar";
import Axios from '../../customHook/useAxios';


import "./MainPage.css";
// import { isTemplateSpan } from "typescript";

interface IProps{
    card?:QuestionCard | FinalAnswerCard;
    isHistoryActive:boolean;
    history:(QuestionCard | FinalAnswerCard)[];
    setCard:Function;
    setHistory:Function;
    setIsHistoryActive:Function;
    firstCard:QuestionCard | undefined;

}
const MainPage: React.FC<IProps> = ({card,setHistory,setCard,history,isHistoryActive,setIsHistoryActive,firstCard})=>{
    const [data,setData] = useState<FinalAnswerCard[]>([])
    const getAnswersArr =()=>{
        if((card as QuestionCard).answers!==undefined)
          return (card as QuestionCard).answers
    
        return []
      }
    
      useEffect(()=>{
        // const arr:(QuestionCard | FinalAnswerCard)[] = [] 
        Axios(setData,`http://localhost:8000/api/MostClicked/${card?.id}`)
    },[card])
    return (
        <div className="Main">

          <div className="TheQuestionPage">
              {/* search bar */}
              <SearchBar setCard={setCard} setHistory={setHistory}/>
              {/* history page  */}
              {isHistoryActive && <History setIsHistoryActive={setIsHistoryActive} history={history} setHistory={setHistory} setCard={setCard} />}
              {!isHistoryActive && card?.nextCards!==undefined && 
                <div className="card">
                    <div className="question">
                        <h2>{card.cardTitle}</h2>
                    </div>
                  {getAnswersArr().map((answer,index)=>{
                    return <Answer setHistory={setHistory} answer={answer} index={index} key={index} setCard={setCard}/>
                  })}
                </div>}   
              {/* TheFinalAnswerPage is here for the styling */}
            {!isHistoryActive && card?.nextCards === undefined  &&<FinalAnswerPage firstCard={firstCard as QuestionCard} setHistory={setHistory} card={card as FinalAnswerCard} setCard={setCard}/>}     
          </div>
          {!isHistoryActive && card?.nextCards!==undefined &&<div style={{marginTop: '10%',marginRight:'10%'}} className="commonAnswers">
            <hr />
              <h1>תשובות נפוצות</h1>
            
              {/* {data.filter((item:CardTree,index:number)=>item.nextCards === undefined &&item.clicked>30).map((item:CardTree,index:number)=>{
                return <CommonAnswers key={index} setHistory={setHistory} card={item} setCard={setCard}/>
              })} */}
              {data !== undefined && <div className="ThecommonAnswers">
                {(data as FinalAnswerCard[]).map((item:FinalAnswerCard,index:number)=>{
                return <CommonAnswers key={index} setHistory={setHistory} item={item} setCard={setCard}/>
                
              })}
              </div>}
              {data === undefined && <h2>Loading...</h2>}
            </div>}
        </div>   
    )
}
export default MainPage;