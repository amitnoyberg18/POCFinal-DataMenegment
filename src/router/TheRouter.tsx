import React, { useState } from "react";
import {BrowserRouter as Router,Route,Routes as Switch} from 'react-router-dom';
import FirstPage from "../Pages/FirstPage/FirstPage";
import App from "../App";
import { CardTree } from "../models/cardTree";
import { dataCardTree } from "../data/data";

interface Istate{
    cardTreeObj:CardTree;
}

const TheRouter = () =>{
    const [card,setCard]=useState<Istate["cardTreeObj"]>(
        ()=>{
        const newCard = dataCardTree()[0];
        return newCard;
      });  
    return <Router>
        <Switch>
            <Route path="/" element={<FirstPage setCard={setCard}/>}/>
            <Route path = "/mainApp" element = {<App setCard={setCard} card={card}/>}/>
        </Switch>
    </Router>
}
export default TheRouter;