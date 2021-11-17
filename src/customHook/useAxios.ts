import axios from 'axios';

const dataCardTree = async function getData(setState:Function,url:string){
    try{
      const data = (await axios.get(url).then((res)=>{
        setState(res.data);
    }))}catch(error){
      console.log(error)
    }
}
export default dataCardTree;