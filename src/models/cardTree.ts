
export type Card ={
    id: number;
    prevCard?: QuestionCard| FinalAnswerCard;
    cardTitle: string;
    clicked: number;
    ahmashSelected: boolean;
    
    // type: 'QuestionCard' | 'FinalAnswerCard'
}
export type QuestionCard =  Card &{
    type: 'QuestionCard' 
    answers: string[];//change from answer[] there was type of answer
    indexSelectedAnswer?: number;
    nextCards: (QuestionCard | FinalAnswerCard)[];
 }
export type FinalAnswerCard  =  Card & { 
    type: 'FinalAnswerCard'
    // idFinalAnswerCard:number,
    crmField:string,
    crmSubField:string,
    crmQuestion :string,
    crmSubQuestion:string,
    nextCards?:null
}

// export type CardTree =  { 
//     id: number;
//     prevCard?: CardTree;
//     questionText: string;
//     answers?: string[];
//     // nextCards?: (CardTree | FinalAnswerCard)[];
//     nextCards?: CardTree[];
//     indexSelectedAnswer?: number;
//     clicked: number;
//     InCargeSelcted: boolean;
// }
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