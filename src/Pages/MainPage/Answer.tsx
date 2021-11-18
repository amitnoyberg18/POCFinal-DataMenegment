import React, { useCallback, useEffect, useRef } from "react";
// import CardQuestionnaire from "../classes/cardQuestion"
import { QuestionCard, FinalAnswerCard } from "../../models/cardTree";
// import {CSSTransition,TransitionGroup} from 'react-transition-group';



interface IProps{
    answer: string;
    index:number;
    setCard:Function;
    setHistory:Function;

}
const Answer: React.FC<IProps> = ({answer,setCard,index,setHistory}) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const onSelectAnswer = useCallback(()=>{
        setCard((prevCard:QuestionCard) =>{
            prevCard.indexSelectedAnswer=index;
            prevCard.nextCards[index].prevCard=prevCard;   
            setHistory((history:(QuestionCard | FinalAnswerCard)[])=>{
                history.push(prevCard);
                return history;
            })
            return prevCard.nextCards[index];
        
        })
    },[index,setCard,setHistory])
    const  handleKeyPress =  useCallback((e) => {
            if(e.code === 'Digit'+(index+1)){
                // const btnAns=document.getElementById(index.toString())
                // btnAns?.classList.add("answerSelectedByKey")
                onSelectAnswer();
                // setTimeout(() => {
                //     onSelectAnswer(); 
                //     inputRef.current?.focus();

                //     // btnAns?.classList.remove("answerSelectedByKey")
                //   }, 0);            
            }
      }, [index,onSelectAnswer]);
    
    
    
    useEffect(()=>{
        document.addEventListener('keypress',handleKeyPress)
        // if(card.prevCard?.indexSelectedAnswer !== null){
        //     if(card.prevCard?.indexSelectedAnswer === index+1){
        //         inputRef.current?.classList.add("wasSelected");
        //     }
        // }
        return () => {
            document.removeEventListener('keypress', handleKeyPress)
        }
    },[handleKeyPress])
    
    return ( 
        // <TransitionGroup className="answer-container">
        //     <CSSTransition
        //         key={card.id}
        //         timeout={1000}
        //         classNames="fade"
        //     >
                <div ref={inputRef} id={index.toString()} onClick={onSelectAnswer} className="answer">
                    <p style={{float:"right",marginRight:"10%"}}>({index+1})</p>
                    <p style={{marginLeft:"10%"}}>{answer}</p>
                </div>
        //     </CSSTransition>
        // </ TransitionGroup>

     );
}
 
export default Answer;
