import React, { useEffect, useState } from "react";
import { QuestionCard , FinalAnswerCard } from "../../../../models/cardTree";
import '../MainApp.css'
import getAxios from '../../../../customHook/getAxios';
import MaterialTable, { Column } from 'material-table';
import patchAxios from '../../../../customHook/patchAxios';



interface Istate{
    data:(QuestionCard | FinalAnswerCard)[],
    query:string;
}
interface IProps{
    url:string,
    TableName:string,
    columns:Column<QuestionCard | FinalAnswerCard>[]
}



const DataTable : React.FC<IProps>=({url,TableName,columns})=>{

    const [data,setData] = useState<Istate["data"]>([]);
    // const Thecolumns = data[0] && Object.keys(data[0]);


    useEffect(()=>{
        // const arr:(QuestionCard | FinalAnswerCard)[] = [] 
        getAxios(setData,url)
        // .then(()=>setData((data)=>{
        //     data.map((item)=>{
        //         return {...data,'id': 1}
        //     })   
        //     console.log(data);
        //     return data; 
        // }));
        // for (let index = 0; index < data.length; index++) {
        //     const element:QuestionCard | FinalAnswerCard = data[index]; 
        //     arr.push(element);     
        // }


    },[setData,url])


    return (
        <div className="DataTable">
            <MaterialTable title={TableName} onChangePage={()=>{
                console.log("d")
            }}
                data={data}
                columns={columns}
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
                        const c1:QuestionCard = {id:data[data.length-1].id+1,cardTitle:newRow.cardTitle,type:"QuestionCard",clicked:0,ahmashSelected:newRow.ahmashSelected,nextCards:[],answers:[]}
                        const updatedData=[...data,c1]//will send a post request to the server 
                        setTimeout(() => {
                            // setData - doesnt supposed to be relevent
                            console.log(updatedData);
                            // resolve()
                        }, 2000);
                    }),
                    onRowUpdate: (newData, oldData) =>
                    new Promise<void>((resolve, reject) => {
                      setTimeout(() => {
                          console.log(newData)
                        // const index = oldData.tableData.id;
                        // dataUpdate[index] = newData;
                        patchAxios(newData,'http://localhost:8000/api/updateCard')
                        window.location.href='http://localhost:3000/ManagePage/MainApp/cards'
                        resolve();
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