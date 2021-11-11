import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
// import FirstPage from './Pages/FirstPage/FirstPage';
import {CardTree} from './models/cardTree';
import MainPage from './Pages/MainPage/MainPage';
import historyPng from "../src/icons/history.png";
import HomePng from "../src/icons/backHomePage.png";
import BackPng from "./icons/back.png";
// import {CSSTransition} from 'react-transition-group';
import { Link,useParams } from "react-router-dom";
import Axios from './customHook/Axios'



interface Istate{
  cardTreeObj: CardTree;
}

const App = () =>{
  const { CardId } = useParams() 
  const [firstCard,setFirstCard] = useState<Istate["cardTreeObj"]>();
  const [card,setCard]=useState<Istate["cardTreeObj"]>(()=>{
    const c1: CardTree = {id:0,questionText:"0",answers:[ "0"],clicked:0,InCargeSelcted:false}
    return c1;
  });
  const [isHistoryActive,setIsHistoryActive] = useState(false);
  // const [card,setCard]=useState<Istate["cardTreeObj"]>(()=>{
  //   const newCard = dataCardTree()[0];
  //   return newCard;
  // });
  const [history,setHistory] = useState<CardTree[]>([]);
  //Fetching data
  useEffect(()=>{
    console.log(CardId);
    if(CardId){
      Axios(setCard,`http://localhost:8000/api/TheCard/${CardId}`);
      Axios(setFirstCard,`http://localhost:8000/api/TheCard/${CardId}`);
    }else{
      Axios(setCard,'http://localhost:8000/api/');
      Axios(setFirstCard,'http://localhost:8000/api/');
    }
},[CardId])

  // We need to add here a useEffect that will check if there are params


  //THE BACK FUNCTION AND KEY HANDLE
  
  const backToPrevCard = useCallback(()=>{
    // setTimeout(() => {
      setCard((theCard : CardTree )=>{
        
        if(theCard?.prevCard!==undefined){   
           setHistory((prevHistory)=>{
            prevHistory.pop()
            console.log(prevHistory);
            // prevHistory.filter( (ele, ind) => ind === prevHistory.findIndex( elem => elem.id === ele.id && elem.id === ele.id))
            return prevHistory;
          })     
          return theCard.prevCard            
        }
        setIsHistoryActive(false);
        // setHistory([]);
        return theCard        
        })
    // }, 0);

    
  },[setCard,setHistory])
  useEffect(()=>{
    const handleKeyPress = (e:any) => {
        if(e.keyCode !== undefined){
            if(e.keyCode===27){
              // if(isHistoryActive){
              //   console.log(isHistoryActive);
              //   setIsHistoryActive((prevIsHistoryActive)=>!prevIsHistoryActive)
              // }else{
                backToPrevCard();
                const btnPrev=document.getElementById('btnPrevQuesiton')
                btnPrev?.classList.add("backPrevByKey")
                // if(card === dataCardTree()[0]){
                //   setSelectValue("-1");
                // }
                setTimeout(() => {
                  btnPrev?.classList.remove("backPrevByKey")
                }, 400);
              // }
              //  const select = document.getElementById("answersSelect");  
              //  select.selectedIndex === "-1"; 

              // const answersList = dataCardTree().filter((item:CardTree,index:number)=>item.nextCards === undefined); 
              // if(card.prevCard !== undefined){
              //   if(answersList.indexOf(card.prevCard)){
              //     setSelectValue((prevSelectValue)=>{
              //       const thisCard = answersList[Number(prevSelectValue)];
              //       const prevCard = thisCard.prevCard;
              //       if(prevCard !== undefined){
              //         return answersList.indexOf(prevCard).toString();
              //       }
              //       return prevSelectValue
              //     }) 
              //     }
              // }

             
            }
        }

    }
    document.addEventListener('keyup',(e)=>{
        handleKeyPress(e);
    })
    return () => {
        document.removeEventListener('keyup', (e)=>{
            handleKeyPress(e);
        })
    }
},[backToPrevCard])

  // THE APP

  return (
    <div className="App">
      <div className="page">
        <div className="buttons">
          {/* <button id="btnPrevQuesiton" className="btnPrev" onClick={backToPrevCard}>&#x21B6;</button> */}
          <button id="btnPrevQuesiton" className="btnPrev" onClick={backToPrevCard}><img src={BackPng} style={{width:"25px"}} alt="Home"></img></button>
          <Link to='/'>
            <button className="Home" onClick={()=>{
              if(firstCard !== undefined){
                setCard(firstCard);
              }
              setHistory([]);
              setIsHistoryActive(false);
            }}><img src={HomePng} style={{width:"25px"}} alt="Home"></img></button>
          </Link>
          <button onClick={()=>setIsHistoryActive((prevIsHistoryActive)=>!prevIsHistoryActive)} className="History"><img style={{width:"25px"}} src={historyPng} alt="history" /></button>
          
          </div>
          {/* the MainPage has the FinalAnswerPage */}
        <MainPage firstCard={firstCard} isHistoryActive={isHistoryActive} setIsHistoryActive={setIsHistoryActive} history={history} card={card} setCard={setCard} setHistory={setHistory}/>
      </div>     
    </div>
  );
}

export default App;
