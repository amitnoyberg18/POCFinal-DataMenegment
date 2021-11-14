import React, { useEffect, useState } from "react";
import { CardTree } from "../../../../models/cardTree";
import '../MainApp.css'
import Axios from '../../../../customHook/useAxios'



interface Istate{
    data:CardTree[],
    query:string;
}
interface IProps{
    url:string
}



const DataTable : React.FC<IProps>=({url})=>{

    const [data,setData] = useState<Istate["data"]>([]);
    // const [query,setQuery] = useState<Istate["query"]>("");
    const columns = data[0] && Object.keys(data[0])

    useEffect(()=>{
        const arr:CardTree[] = [] 

        Axios(setData,url);
        for (let index = 0; index < data.length; index++) {
            const element:CardTree = data[index]; 
            arr.push(element);     
        }
    },[setData,url])
    

    return (
        <div className="DataTable">
            <table cellPadding={0} cellSpacing={0}>
                <thead>
                    <tr>
                        {data[0] && columns.map((heading,index)=>{
                            if(index !== columns.length-1){
                                return <th key={index}>{heading}</th>
                            }
                            if(!columns.includes('nextCards')){
                                return <th key={index}>{heading}</th>
                            }

                        })}
                        <th key={100}> עריכה</th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((row:CardTree,index:number) =>(
                        <tr key={index}>
                            
                                <td>{row.id}</td>
                                <td>{row.questionText}</td>
                                {row.answers !== undefined && <td>{row.answers?.join()}</td>}
                                <td>{row.clicked}</td>
                                <td>{row.InCargeSelcted? 'True' :'False'}</td>
                                <td className="Edit" onClick={()=>{
                                    console.log(row.id)
                                    alert(`${columns}`);
                                }}> תלחץ עלי כדי לערוך</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default DataTable;