import axios from 'axios';
import { FinalAnswerCard, QuestionCard } from '../models/cardTree';

const dataCardTree = async function getData(data:QuestionCard | FinalAnswerCard,url:string){
    try{
        console.log(data)
        await axios.patch(url ,{updateTitle:data})
    }catch(error){
      console.log(error)
    }
}
export default dataCardTree;