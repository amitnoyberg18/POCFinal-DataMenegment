import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { QuestionCard ,FinalAnswerCard } from "../../models/cardTree";


interface IProps{
    card:QuestionCard | FinalAnswerCard;
    index:number;
}
const InCargeSelection: React.FC<IProps> = ({card,index}) => {
    
    const  handleKeyPress =  useCallback((e) => {

            if(e.code === 'Digit'+(index+1)){
                window.location.href = `/mainApp/${card.id}`;
                //move the a params url
            }
      }, [index,card]);
    
    
    //in the use effect you added a listener to the keypress
    useEffect(()=>{
        document.addEventListener('keypress',handleKeyPress)
        return () => {
            document.removeEventListener('keypress', handleKeyPress)
        }
    },[handleKeyPress])
    

    return ( 
        <Link to={`/mainApp/${card.id}`}>
            <div id={index.toString()} className="InchargeSelectedCard">
                <p style={{float:"right",marginRight:"10%"}}>({index+1})</p>
                <p style={{marginLeft:"10%"}}>{card.cardTitle}</p>
            </div>
        </Link>
     );
}
 
export default InCargeSelection;