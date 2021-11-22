import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DataTable from "./DataTable/DataTable";
import './MainApp.css';
import HomePng from "../../../icons/backHomePage.png";
import { Column } from "material-table";
import { FinalAnswerCard, QuestionCard } from "../../../models/cardTree";


// interface Istate{
//     data:CardTree[],
//     query:string;
// }

const MainApp=()=>{
    const [header,setHeader] = useState("כרטיסים")
    const { page } = useParams(); 
    const [url,setUrl] = useState<string>('http://localhost:8000/api/Cards');
    const [columns,setColumns] = useState<Column<QuestionCard | FinalAnswerCard>[]>([{
        title:'מזהה',
        field: 'id',
        cellStyle:{
            textAlign:'center'
        },
        editable: 'never',
    },
    {
        title:'כמות לחיצות',
        field: 'clicked',
        cellStyle:{
            textAlign:'center'
        },
        editable: 'never'
    },{
        title:'נבחר ע"י האחמ"ש',
        field: 'ahmashSelected',
        cellStyle:{
            textAlign:'center'
        },
        lookup: { 'true': 'true', 'false': 'false' }
    }])

    useEffect(()=>{
        if(page !== undefined){
            if(page === "questions"){
                setUrl("http://localhost:8000/api/card/cardQuestion/all");
                document.getElementById("questions")?.classList.add("active");
                setHeader("שאלות")
                setColumns((prevCol)=>{
                    return [...prevCol,{
                        title:'שאלות',
                        field: 'cardTitle',
                        cellStyle:{
                            textAlign:'center'
                        },
                        validate: rowData => String(rowData.cardTitle) === '' ? 'שאלה לא יכולה להיות ריקה' : ''

                    },{
                        title:'תשובה 1',
                        field: 'answers[0]',
                        cellStyle:{
                            textAlign:'center'
                        },
                        validate: rowData => String((rowData as QuestionCard).answers[0]) === '' ? 'תשובה 1 לא יכולה להיות ריקה' : ''
                    },{
                        title:'תשובה 2',
                        field: 'answers[1]',
                        cellStyle:{
                            textAlign:'center'
                        },
                        validate: rowData => String((rowData as QuestionCard).answers[1]) === '' ? 'תשובה 2 לא יכולה להיות ריקה' : ''
                    },{
                        title:'תשובה 3',
                        field: 'answers[2]',
                        cellStyle:{
                            textAlign:'center'
                        }
                    },{
                        title:'תשובה 4',
                        field: 'answers[3]',
                        cellStyle:{
                            textAlign:'center'
                        }
                    },{
                        title:'תשובה 5',
                        field: 'answers[4]',
                        cellStyle:{
                            textAlign:'center'
                        }
                    },{
                        title:'תשובה 6',
                        field: 'answers[5]',
                        cellStyle:{
                            textAlign:'center'
                        }
                    }]
                })
            }else if(page === "answers"){
                setUrl("http://localhost:8000/api/card/finalAnswer/all");
                document.getElementById("answers")?.classList.add("active")
                setHeader("תשובות סופיות")
                setColumns((prevCol)=>{
                    return [...prevCol,{
                        title:'תחום',
                        field: 'crmField',
                        cellStyle:{
                            textAlign:'center'
                        },
                        validate: rowData => String((rowData as FinalAnswerCard).crmField) === '' ? 'תחום לא יכול להיות ריק' : ''
                    },{
                        title:'תת תחום',
                        field: 'crmSubField',
                        cellStyle:{
                            textAlign:'center'
                        },
                        validate: rowData => String((rowData as FinalAnswerCard).crmSubField) === '' ? 'תת תחום לא יכול להיות ריק' : ''
                    },{
                        title:'שאלה',
                        field: 'crmQuestion',
                        cellStyle:{
                            textAlign:'center'
                        },
                        validate: rowData => String((rowData as FinalAnswerCard).crmQuestion) === '' ? 'שאלה לא יכולה להיות ריקה' : ''
                    },{
                        title:'תת שאלה',
                        field: 'crmSubQuestion',
                        cellStyle:{
                            textAlign:'center'
                        },
                        validate: rowData => String((rowData as FinalAnswerCard).crmSubQuestion) === '' ? 'תת שאלה לא יכולה להיות ריקה' : ''
                    },{
                        title:'איך לטפל בקו ראשון',
                        field: 'cardTitle',
                        cellStyle:{
                            textAlign:'center'
                        },
                        validate: rowData => String((rowData as FinalAnswerCard).cardTitle) === '' ? 'לא יכול להיות ריק' : ''
                    }]
                })
            }else{
                setUrl('http://localhost:8000/api/Cards');
                document.getElementById("cards")?.classList.add("active")
                setHeader("כרטיסים");
                setColumns((prevCol)=>{
                    return [...prevCol,{
                        title:'שאלה/דרך פיתרון',
                        field:'cardTitle',
                        cellStyle:{
                            textAlign:'center'
                        }
                        
                    }]
                })

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
                <DataTable columns={columns} url={url} TableName={header}/>
            </div>
            <br />

        </div>
    )
}
export default MainApp;