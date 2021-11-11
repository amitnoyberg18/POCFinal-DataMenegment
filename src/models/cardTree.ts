import { FinalAnswerCard } from "./FinalAnswerCard";

export type CardTree ={ 
    id:Number;
    questionText:string;
    answers ? :string[];
    prevCard ? :CardTree;
    nextCards ? :CardTree[] | FinalAnswerCard[];
    indexSelectedAnswer ?:number;
    clicked:number;
    InCargeSelcted:boolean;
}
// export const CardTreeFunction = {
//     setAnswers : (answers:string[],newAnswers:string[])=>{
//         answers = answers?.concat(...newAnswers);
//     },
//     setPrevCard : (prevCard,newPrevCard)=>{
//         this.prevCard = prevCard;
//     },
//     setNext = (nextCards:Tree<T>[])=>{
//         this.nextCards = nextCards;
//     },
//     setIndexSelectedAnswer = (indexSelectedAnswer:number)=>{
//         this.indexSelectedAnswer = indexSelectedAnswer;
//     },

//     getQuestionText = ()=>{
//         return this.questionText;
//     },
//     getAnwers = ()=>{
//         if(this.answers !== undefined){
//             return this.answers;
//         }
//         return [];
//     },


//     getNextSelectedCard = ()=>{
//         if(this.nextCards){
//             if(this.indexSelectedAnswer !== undefined){
//                 return this.nextCards[this.indexSelectedAnswer];
//             }
//         }
//     }
//     hasNext =()=>{
//         if(this.nextCards !== undefined){
//             return true;
//         }
//         return false;
//     }
// } 
