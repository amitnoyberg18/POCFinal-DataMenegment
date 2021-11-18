import React, { useEffect, useState } from "react";
import { QuestionCard , FinalAnswerCard } from "../../../../models/cardTree";
import '../MainApp.css'
import Axios from '../../../../customHook/useAxios';
import MaterialTable from 'material-table'



interface Istate{
    data:(QuestionCard | FinalAnswerCard)[],
    query:string;
}
interface IProps{
    url:string,
    TableName:string
}



const DataTable : React.FC<IProps>=({url,TableName})=>{

    const [data,setData] = useState<Istate["data"]>([]);
    // const Thecolumns = data[0] && Object.keys(data[0]);
    const [columns,setColumns] = useState([{
        title:'מזהה',
        field: 'id',
        cellStyle:{
            textAlign:'center'
        }
    },{
        title:'שאלה',
        field: 'questionText',
        cellStyle:{
            textAlign:'center'
        }
    },
    {
        title:'תשובות',
        field: 'answers',
        cellStyle:{
            textAlign:'center'
        }
    },
    {
        title:'כמות לחיצות',
        field: 'clicked',
        cellStyle:{
            textAlign:'center'
        }
    },{
        title:'נבחר ע"י האחמ"ש',
        field: 'InCargeSelcted',
        cellStyle:{
            textAlign:'center'
        }
    }]);//by knowing the url we will present different columns

    useEffect(()=>{
        const arr:(QuestionCard | FinalAnswerCard)[] = [] 
        Axios(setData,url).then(()=>setData((data)=>{
            data.map((item)=>{
                return {...data,'id': 1}
            })   
            console.log(data);
            return data; 
        }));
        for (let index = 0; index < data.length; index++) {
            const element:QuestionCard | FinalAnswerCard = data[index]; 
            arr.push(element);     
        }


    },[setData,url])


    return (
        <div className="DataTable">
            <MaterialTable title={TableName}
                data={data}
                columns={[{
                        title:'מזהה',
                        field: 'id',
                        editable:'never',
                        cellStyle:{
                            textAlign:'center'
                        },
                    },{
                        title:'שאלה',
                        field: 'questionText',
                        cellStyle:{
                            textAlign:'center'
                        }
                    },
                    // {
                    //     title:'תשובות',
                    //     field: 'answers',
                    //     cellStyle:{
                    //         textAlign:'center'
                    //     }
                    // },
                    {
                        title:'כמות לחיצות',
                        field: 'clicked',
                        editable:'never',

                        cellStyle:{
                            textAlign:'center'
                        }
                    },{
                        title:'נבחר ע"י האחמ"ש',
                        field: 'InCargeSelcted',
                        editable:'never',
                        cellStyle:{
                            textAlign:'center'
                        }
                    }]}
                options={{
                    filtering:true,
                    exportButton:true,
                    grouping: true,
                    selection: true,
                    headerStyle:{
                        textAlign:'center'

                    }
                }}
                editable={{
                    onRowAdd:(newRow)=>new Promise((resolve,reject)=>{
                        const updatedData=[...data,newRow]//will send a post request to the server 
                        setTimeout(() => {
                            // setData - doesnt supposed to be relevent
                            console.log(updatedData);
                            // resolve()
                        }, 2000);
                    }),
                    onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        const dataUpdate = [...data];
                        // const index = oldData.tableData.id;
                        // dataUpdate[index] = newData;
                        // setData([...dataUpdate]);
          
                        // resolve();
                      }, 1000)
                    }),
                  onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        // const dataDelete = [...data];
                        // const index = oldData.tableData.id;
                        // dataDelete.splice(index, 1);
                        // setData([...dataDelete]);
          
                        // resolve();
                      }, 1000)
                    }),
                }}
                style={{fontSize:'small',textAlign:'center'}}
            />
        </div>
    )
}
export default DataTable;