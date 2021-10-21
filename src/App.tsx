import React, { useEffect, useState } from 'react';
import './App.css';
import FirstPage from './Pages/FirstPage/FirstPage';
import {dataCardTree} from "./data/data";
import {CardTree} from './models/cardTree';
import MainPage from './Pages/MainPage/MainPage';

interface Istate{
  cardTreeObj :CardTree;
  history:CardTree[];
}

function App() {
  const [isFirstPageActive,setIsFirstPageActive] = useState(true);
  const [isHistoryActive,setIsHistoryActive] = useState(false);
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
        // setIsFirstPageActive(true);
        return theCard
  
        })
    }, 0);

    
  }
  useEffect(()=>{
    const handleKeyPress = (e:any) => {
        if(e.keyCode !== undefined){
            if(e.keyCode===27){
              const btnPrev=document.getElementById('btnPrevQuesiton')
              btnPrev?.classList.add("backPrevByKey")
              backToPrevCard();
              setTimeout(() => {
                btnPrev?.classList.remove("backPrevByKey")
              }, 500);
                           
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
      <>
        <div className="buttons">
          <button id="btnPrevQuesiton" className="btnPrev" onClick={backToPrevCard}>&#x21B6;</button>
          <button className="Home" onClick={()=>{
            setCard(dataCardTree()[0]);
            setHistory([]);
            setIsFirstPageActive(true);
            setIsHistoryActive(false);
          }}>בית</button>
          <button onClick={()=>setIsHistoryActive((prevIsHistoryActive)=>!prevIsHistoryActive)} className="History">היסטוריה</button>
          </div>
          {/* the MainPage has the FinalAnswerPage */}
        <MainPage isHistoryActive={isHistoryActive} setIsHistoryActive={setIsHistoryActive} history={history} card={card} setCard={setCard} setHistory={setHistory}/>
      </>
      
      }
    </div>
  );
}

export default App;
