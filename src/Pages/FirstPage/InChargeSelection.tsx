import React, { useCallback, useEffect } from "react";
import { CardTree } from "../../models/cardTree";


interface IProps{
    card:CardTree;
    index:number;
    setCard:Function;//this will come from app or i will use a router
    setIsFirstPageActive:Function;
}
const InCargeSelection: React.FC<IProps> = ({card,index,setCard,setIsFirstPageActive}) => {
    //the next function shows the card that the in charge selected


    const onSelectAnswer = useCallback(()=>{
        setCard(card)
        setIsFirstPageActive(false);
    },[card,setIsFirstPageActive,setCard])



    //this function handles the key press


    const  handleKeyPress =  useCallback((e) => {

            if(e.code === 'Digit'+(index+1)){
                onSelectAnswer();
            }
      }, [index,onSelectAnswer]);
    
    
    //in the use effect you added a listener to the keypress
    useEffect(()=>{
        document.addEventListener('keypress',handleKeyPress)
        return () => {
            document.removeEventListener('keypress', handleKeyPress)
        }
    },[handleKeyPress])
    

    return ( 
        <div id={index.toString()} onClick={onSelectAnswer} className="InchargeSelectedCard">
            <p style={{float:"right",marginRight:"10%"}}>({index+1})</p>
            <p style={{marginLeft:"10%"}}>{card.questionText}</p>
        </div>
     );
}
 
export default InCargeSelection;