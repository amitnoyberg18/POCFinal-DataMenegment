import React, {useEffect, useState} from "react";
import { CardTree } from "../../models/cardTree";
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Axios from '../../customHook/Axios';


interface IProps{
    setCard:Function;
    setHistory:Function;
}

const SearchBar:React.FC<IProps> = ({setHistory,setCard})=>{
    
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
    //             {dataCardTree(().filter((item:CardTree,index:number)=>item.nextCards === undefined).map((item:CardTree,index:number)=>{
    //                 return <option key={index} value={index.toString()}>{item.questionText}</option>
    //             })}
    //             </select>
    //         </div>)
    const [data,setData] = useState<CardTree[]>([]);
    const [filterData,setFilterData]=useState<CardTree[]>([]);
    const [value,setValue] = useState<string>("");


    useEffect(()=>{
        const arr:CardTree[] = [] 
        // setData(dataCardTree().filter((item:CardTree,index:number)=>item.nextCards === undefined))
        Axios(setData,`http://localhost:8000/api/Answers`)
        for (let index = 0; index < data.length; index++) {
            const element:CardTree = data[index]; 
            arr.push(element);     
        }
        console.log(arr);
        setData(arr);
    },[setData])

    const handleFilter = (e:React.ChangeEvent<HTMLInputElement>)=>{
        console.log(data);
        const newFilter = data.filter((item:CardTree)=>{
            return item.questionText.includes(e.target.value);
        });
        setFilterData(newFilter);
        setValue(e.target.value);
    }

    return <div className="Search">
        <div className="searchInputs">
        {/* <label className="searchBoxtitle">חיפוש תשובות סופיות:</label> */}
            <input type="text" placeholder="חיפוש תשובות סופיות..." value={value} onChange={handleFilter}/>
            <div className="searchIcon">
                {value ? <CloseIcon  id="clearButton" onClick={()=>{
                    setValue("");
                }}/>:<SearchIcon/>}
            </div>
        </div>
        {filterData.length !== 0 && value !=="" &&
        <div className="dataResult">
            {filterData.slice(0,5).map((item:CardTree,index:number)=>{
                    // return <option key={index} value={index.toString()}>{item.questionText}</option>
                    // return <a href="/#" key={index} className="dataItem" onClick={()=>{
                        return <p key={index} className="dataItem" onClick={()=>{
                        setFilterData([]);
                        setCard((prevCard:CardTree)=>{
                            item.prevCard=prevCard;
                            prevCard.indexSelectedAnswer=undefined;
                            setHistory((history:CardTree[])=>{
                                if(history.includes(prevCard)){
                                    const index =history.indexOf(prevCard);
                                    history.splice(index,1);
                                }
                                history.push(prevCard);
                                // let pp = history.filter( (ele, ind) => ind === history.findIndex( elem => elem.id === ele.id && elem.id === ele.id))
                                return history;
                            });
                            return item;
                        });
                        setValue("");
                    }}>{item.questionText}</p>
                 })}
        </div>
}
    </div>
}

export default SearchBar;