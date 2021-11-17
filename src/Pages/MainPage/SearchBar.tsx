import React, {useEffect, useState} from "react";
import { QuestionCard ,FinalAnswerCard } from "../../models/cardTree";
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import Axios from '../../customHook/useAxios';

// create a new check box

interface IProps{
    setCard:Function;
    setHistory:Function;
}

const SearchBar:React.FC<IProps> = ({setHistory,setCard})=>{
    
    const [data,setData] = useState<(QuestionCard | FinalAnswerCard)[]>([]);
    const [filterData,setFilterData]=useState<(QuestionCard | FinalAnswerCard)[]>([]);
    const [value,setValue] = useState<string>("");


    useEffect(()=>{
        const arr:(QuestionCard | FinalAnswerCard)[] = [] 
        // setData(dataCardTree().filter((item:CardTree,index:number)=>item.nextCards === undefined))
        Axios(setData,`http://localhost:8000/api/Answers`)
        for (let index = 0; index < data.length; index++) {
            const element:QuestionCard | FinalAnswerCard = data[index]; 
            arr.push(element);     
        }
        console.log(arr);
        setData(arr);
    },[setData])

    const handleFilter = (e:React.ChangeEvent<HTMLInputElement>)=>{
        console.log(data);
        const newFilter = data.filter((item:QuestionCard | FinalAnswerCard)=>{
            return item.cardTitle.includes(e.target.value);
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
            {filterData.slice(0,5).map((item:QuestionCard | FinalAnswerCard,index:number)=>{
                    // return <option key={index} value={index.toString()}>{item.questionText}</option>
                    // return <a href="/#" key={index} className="dataItem" onClick={()=>{
                        return <p key={index} className="dataItem" onClick={()=>{
                        setFilterData([]);
                        setCard((prevCard:QuestionCard | FinalAnswerCard)=>{
                            item.prevCard=prevCard;
                            (prevCard as QuestionCard).indexSelectedAnswer=undefined;
                            setHistory((history:(QuestionCard | FinalAnswerCard)[])=>{
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
                    }}>{item.cardTitle}</p>
                 })}
        </div>
}
    </div>
}

export default SearchBar;