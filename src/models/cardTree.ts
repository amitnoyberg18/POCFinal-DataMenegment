
// export type Card ={
//     id: number;
//     prevCard?: CardTree| FinalAnswerCard;
// }

export type CardTree =  { 
    id: number;
    prevCard?: CardTree;
    questionText: string;
    answers?: string[];
    // nextCards?: (CardTree | FinalAnswerCard)[];
    nextCards?: CardTree[];
    indexSelectedAnswer?: number;
    clicked: number;
    InCargeSelcted: boolean;
}
//read about brand in typescript
// type Brand<T, Brand extends string> = T & Brand
// type Dollar = Brand<number, 'Dollar'>
// type Euro = Brand<number, 'Euro'>
// export type FinalAnswerCard  =  Card & { 
//     field:string;
//     subField:string;
//     question:string;
//     subQuestion:string;
//     solution:string;
// }
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
