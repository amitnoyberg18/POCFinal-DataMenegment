import React, { useCallback, useEffect } from "react";
// import CardQuestionnaire from "../classes/cardQuestion"
import { CardTree } from "../../models/cardTree";


interface IProps{
    answer: string;
    index:number;
    setCard:Function;
    setHistory:Function;

}
const Answer: React.FC<IProps> = ({answer,setCard,index,setHistory}) => {

    const onSelectAnswer = useCallback(()=>{
        setCard((prevCard:CardTree) =>{
            prevCard.indexSelectedAnswer=index;
            if(prevCard.nextCards!==undefined){
                prevCard.nextCards[index].prevCard=prevCard;   
                setHistory((history:CardTree[])=>{
                    history.push(prevCard);
                    return history;
                })
                return prevCard.nextCards[index];
        
            }

                return undefined;
        })
    },[index,setCard,setHistory])
    const  handleKeyPress =  useCallback((e) => {
            if(e.code === 'Digit'+(index+1)){
                // const btnAns=document.getElementById(index.toString())
                // btnAns?.classList.add("answerSelectedByKey")
                onSelectAnswer();
                // setTimeout(() => {
                //     onSelectAnswer(); 
                //     btnAns?.classList.remove("answerSelectedByKey")
                //   }, 500);            
            }
      }, [index,onSelectAnswer]);
    
    
    
    useEffect(()=>{
        document.addEventListener('keypress',handleKeyPress)
        return () => {
            document.removeEventListener('keypress', handleKeyPress)
        }
    },[handleKeyPress])
    
    return ( 
        <div id={index.toString()} onClick={onSelectAnswer} className="answer">
            <p style={{float:"right",marginRight:"10%"}}>({index+1})</p>
            <p style={{marginLeft:"10%"}}>{answer}</p>
        </div>
     );
}
 
export default Answer;
