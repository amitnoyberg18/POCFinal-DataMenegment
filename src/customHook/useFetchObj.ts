import { useEffect, useState } from "react";

const useFetch = (url:string)=>{
    const [data, setData] = useState<{
        id:number,
        questionText:string,
        answer: number[];
        clicked: number,
        InCargeSelcted:boolean,
    } | undefined>(undefined);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const abortCont = new AbortController();
        fetch(url,{signal: abortCont.signal}).then(res =>{
            if(!res.ok){
                throw Error('Could not fetch data from that resource')
            }
           return res.json();
        }).then((data)=>{
            setData(data);
            setError(null);
        }).catch((err)=>{
            if(err.name === 'AbortError'){
                console.log('fetch aborted');
            }else{
                setError(err.message);
                setData(undefined);
            }
        })
        return ()=> abortCont.abort();
    }, [url])
    return {data,error};
}
export default useFetch;