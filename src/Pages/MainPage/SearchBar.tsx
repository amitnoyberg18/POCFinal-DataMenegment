import React, {useState} from "react";
import { CardTree } from "../../models/cardTree";
import {dataCardTree} from "../../data/data";
import SearchIcon from '@material-ui/icons/Search'

interface IProps{
    selectValue:string;
    setSelectValue:Function;
    setCard:Function;
    setHistory:Function;
}

const SearchBar:React.FC<IProps> = ({selectValue,setSelectValue,setHistory,setCard})=>{
    
    // return <div className="Search">
    //             <label className="searchBoxtitle">חיפוש תשובות סופיות:</label>
    //             {/* <input className="searchBox" type="text" /> */}
    //             <select value={selectValue} id="answersSelect" style={{width:"20%"}} onChange={(e)=>{
    //             if(e.target.value === "-1"){
    //                 setCard(dataCardTree()[0]);
    //                 setHistory([]);
                    
    //             }else{
    //                 setCard((prevCard:CardTree)=>{
    //                 const newCard = dataCardTree().filter((item:CardTree,index:number)=>item.nextCards === undefined)[Number(e.target.value)];
    //                 newCard.prevCard = prevCard;
    //                 prevCard.indexSelectedAnswer=undefined;
    //                 setHistory((history:CardTree[])=>{
    //                     history.push(prevCard);
    //                     // let pp = history.filter( (ele, ind) => ind === history.findIndex( elem => elem.id === ele.id && elem.id === ele.id))
    //                     return history;
    //                 });
    //                 return newCard;
    //                 })
    //             }
    //             setSelectValue(e.target.value);
    //             }}>
    //             <option key="-1" value="-1"></option>
    //             {dataCardTree().filter((item:CardTree,index:number)=>item.nextCards === undefined).map((item:CardTree,index:number)=>{
    //                 return <option key={index} value={index.toString()}>{item.questionText}</option>
    //             })}
    //             </select>
    //         </div>
    
    return <div className="Search">
        <div className="searchInputs">
            <input type="text" placeholder="חיפוש..." />
            <div className="searchIcon">
                <SearchIcon />
            </div>
        </div>
        <div className="dataResult">
            {dataCardTree().filter((item:CardTree,index:number)=>item.nextCards === undefined).map((item:CardTree,index:number)=>{
                    // return <option key={index} value={index.toString()}>{item.questionText}</option>
                    return <a key={index} className="dataItem" onClick={()=>{
                        setCard(item)
                    }}>{item.questionText}</a>
                 })}
        </div>
    </div>
}

export default SearchBar;