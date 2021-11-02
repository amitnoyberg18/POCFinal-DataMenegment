import React, { useEffect, useState } from 'react';
import './App.css';
import FirstPage from './Pages/FirstPage/FirstPage';
import {dataCardTree} from "./data/data";
import {CardTree} from './models/cardTree';
import MainPage from './Pages/MainPage/MainPage';
import historyPng from "../src/icons/history.png";
import HomePng from "../src/icons/backHomePage.png";
import BackPng from "./icons/back.png";

interface Istate{
  cardTreeObj :CardTree;
  history:CardTree[];
}

function App() {
  const [isFirstPageActive,setIsFirstPageActive] = useState(true);
  const [isHistoryActive,setIsHistoryActive] = useState(false);
  const [selectValue,setSelectValue] = useState("");
  const [card,setCard]=useState<Istate["cardTreeObj"]>(()=>{
    const newCard = dataCardTree()[0];
    return newCard;
  });
  const [history,setHistory] = useState<Istate["history"]>([]);
  
  //THE BACK FUNCTION AND KEY HANDLE
  
  const backToPrevCard = ()=>{
    setTimeout(() => {
      setCard((theCard : CardTree )=>{
        
        if(theCard?.prevCard!==undefined){   
           setHistory((prevHistory)=>{
            prevHistory.pop()
            // prevHistory.filter( (ele, ind) => ind === prevHistory.findIndex( elem => elem.id === ele.id && elem.id === ele.id))
            return prevHistory;
          })     
          return theCard.prevCard            
        }
        setIsFirstPageActive(true);
        setIsHistoryActive(false);
        // setHistory([]);
        setSelectValue("-1");
        return theCard        
        })
    }, 0);

    
  }
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
},[])

  // THE APP

  return (
    <div className="App">
      {isFirstPageActive &&<FirstPage setCard={setCard} setIsFirstPageActive={setIsFirstPageActive}/>}
      {!isFirstPageActive &&
      <div className="page">
        <div className="buttons">
          {/* <button id="btnPrevQuesiton" className="btnPrev" onClick={backToPrevCard}>&#x21B6;</button> */}
          <button id="btnPrevQuesiton" className="btnPrev" onClick={backToPrevCard}><img src={BackPng} style={{width:"25px"}} alt="Home"></img></button>
          <button className="Home" onClick={()=>{
            setCard(dataCardTree()[0]);
            setHistory([]);
            setIsFirstPageActive(true);
            setSelectValue("-1");
            setIsHistoryActive(false);
          }}><img src={HomePng} style={{width:"25px"}} alt="Home"></img></button>
          <button onClick={()=>setIsHistoryActive((prevIsHistoryActive)=>!prevIsHistoryActive)} className="History"><img style={{width:"25px"}} src={historyPng} alt="history" /></button>
          
          </div>
          {/* the MainPage has the FinalAnswerPage */}
        <MainPage selectValue={selectValue} setSelectValue={setSelectValue} isHistoryActive={isHistoryActive} setIsHistoryActive={setIsHistoryActive} history={history} card={card} setCard={setCard} setHistory={setHistory}/>
      </div>
      
      }
    </div>
  );
}

export default App;
