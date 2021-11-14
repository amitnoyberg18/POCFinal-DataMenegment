import React, { useEffect, useState } from "react";
import { CardTree } from "../../models/cardTree";
import FinalAnswerPage from '../../Pages/FinalAnswerPage.tsx/FinalAnswerPage';
import Answer from "./Answer";
import History from "../History/History";
import CommonAnswers from "../MainPage/CommonAnswers/CommonAnswers";
import SearchBar from "./SearchBar";
import Axios from '../../customHook/useAxios';


import "./MainPage.css";
// import { isTemplateSpan } from "typescript";

interface IProps{
    card?:CardTree;
    isHistoryActive:boolean;
    history:CardTree[];
    setCard:Function;
    setHistory:Function;
    setIsHistoryActive:Function;
    firstCard:CardTree | undefined;

}
const MainPage: React.FC<IProps> = ({card,setHistory,setCard,history,isHistoryActive,setIsHistoryActive,firstCard})=>{
    const [data,setData] = useState<CardTree[]>([])
    const getAnswersArr =()=>{
        if(card?.answers!==undefined)
          return card.answers
    
        return []
      }
    
      useEffect(()=>{
        const arr:CardTree[] = [] 
        // setData(dataCardTree().filter((item:CardTree,index:number)=>item.nextCards === undefined))
        Axios(setData,`http://localhost:8000/api/MostClicked/${card?.id}`)
        for (let index = 0; index < data.length; index++) {
            const element:CardTree = data[index]; 
            arr.push(element);     
        }
        console.log(arr)
        setData(arr);
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
                        <h2>{card.questionText}</h2>
                    </div>
                  {getAnswersArr().map((answer,index)=>{
                    return <Answer card={card} setHistory={setHistory} answer={answer} index={index} key={index} setCard={setCard}/>
                  })}
                </div>}   
              {/* TheFinalAnswerPage is here for the styling */}
            {!isHistoryActive && card?.nextCards === undefined  &&<FinalAnswerPage firstCard={firstCard} setHistory={setHistory} theWayToSolve={card?.questionText} crmDetails={getAnswersArr()} setCard={setCard}/>}     
          </div>
          {!isHistoryActive && card?.nextCards!==undefined &&<div style={{marginTop: '10%',marginRight:'10%'}} className="commonAnswers">
            <hr />
              <h1>תשובות נפוצות</h1>
            
              {/* {data.filter((item:CardTree,index:number)=>item.nextCards === undefined &&item.clicked>30).map((item:CardTree,index:number)=>{
                return <CommonAnswers key={index} setHistory={setHistory} card={item} setCard={setCard}/>
              })} */}
              {data !== undefined && <div className="ThecommonAnswers">
                {data.map((item:CardTree,index:number)=>{
                return <CommonAnswers data={data} key={index} setHistory={setHistory} card={item} setCard={setCard}/>
                
              })}
              </div>}
              {data === undefined && <h2>Loading...</h2>}
            </div>}
        </div>   
    )
}
export default MainPage;