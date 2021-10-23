import React from "react";
import "./FinalAnswerPage.css";
import {dataCardTree} from "../../data/data"

interface IProps{
    // cardQuestionnaire: CardQuestionnaire<string>;
    theWayToSolve: string;
    crmDetails:string[];
    setCard: Function;
    setHistory:Function;
    setSelectValue:Function;
}
const FinalAnswerPage: React.FC<IProps> = ({setSelectValue,theWayToSolve,crmDetails,setCard,setHistory}) => {


    return (    
        <div style={{marginTop:"4%"}}>
                <h1>שם התשובה הסופית</h1>            
                <div className="finalDiv">
                    <h2>תחום: {crmDetails[0]}</h2>
                    <h2>תת תחום: {crmDetails[1]}</h2>
                    <h2>שאלה: {crmDetails[2]}</h2>
                    <h2>תת שאלה: {crmDetails[3]}</h2>
                </div>
         
                <div className="finalDiv">
                    <h2> איך לטפל בקו ראשון: {theWayToSolve}</h2>
                </div>
                <div className="backbutton">
                    <button className="backToStart" 
                    onClick={()=>
                        {
                            setCard(()=>dataCardTree()[0]);
                            setHistory([]);
                            setSelectValue("-1");
                        }
                        }
                        >חזרה לתחילת השאלון</button>
                </div>

        </div>
        
     );
}
 
export default FinalAnswerPage;
