import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DataTable from "./DataTable/DataTable";
import './MainApp.css';
import HomePng from "../../../icons/backHomePage.png";




// interface Istate{
//     data:CardTree[],
//     query:string;
// }

const MainApp=()=>{
    const [header,setHeader] = useState("כרטיסים")
    const { page } = useParams(); 
    const [url,setUrl] = useState<string>('http://localhost:8000/api/InchargeSelected');
    useEffect(()=>{
        if(page !== undefined){
            if(page === "questions"){
                setUrl("");
                document.getElementById("questions")?.classList.add("active");
                setHeader("שאלות")
            }else if(page === "answers"){
                setUrl("http://localhost:8000/api/MostClicked/1");
                document.getElementById("answers")?.classList.add("active")
                setHeader("תשובות")
            }else{
                setUrl('http://localhost:8000/api/InchargeSelected');
                document.getElementById("cards")?.classList.add("active")
                setHeader("כרטיסים");

            }
        }
    },[setUrl,page])
    return (
        <div className="MainApp">
            <h1 className="header">{header}</h1>
                    <Link to='/'>
                        <button className="TheHome"><img src={HomePng} style={{width:"25px"}} alt="Home"></img></button>
                    </Link>
            <div className="navbar">
                <ul>
                    <li id="cards"><a href="/ManagePage/MainApp/cards">כרטיסים</a></li>
                    <li id="questions"><a href="/ManagePage/MainApp/questions">שאלות</a></li>
                    <li id="answers"><a href="/ManagePage/MainApp/answers">תשובות</a></li>
                </ul>
            </div>
            <div className="TheData">
                <DataTable url={url} TableName={header}/>
            </div>
            <br />

        </div>
    )
}
export default MainApp;