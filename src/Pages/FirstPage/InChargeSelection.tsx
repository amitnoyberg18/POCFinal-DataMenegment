import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { CardTree } from "../../models/cardTree";


interface IProps{
    card:CardTree;
    index:number;
}
const InCargeSelection: React.FC<IProps> = ({card,index}) => {
    //the next function shows the card that the in charge selected


    // const onSelectAnswer = useCallback(()=>{
    //     setCard(card)
    // },[card,setCard])



    //this function handles the key press


    const  handleKeyPress =  useCallback((e) => {

            if(e.code === 'Digit'+(index+1)){
                console.log(`/mainPage/:${card.id}`)
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
        <Link to = {`/mainPage/:${card.id}`}>
            <div id={index.toString()} className="InchargeSelectedCard">
                <p style={{float:"right",marginRight:"10%"}}>({index+1})</p>
                <p style={{marginLeft:"10%"}}>{card.questionText}</p>
            </div>
        </Link>
     );
}
 
export default InCargeSelection;