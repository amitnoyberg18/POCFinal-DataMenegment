import { CardTree } from "./cardTree"
export type FinalAnswerCard ={ 
    id: number;
    prevCard?: CardTree;
    field:string;
    subField:string;
    question:string;
    subQuestion:string;
    solution:string;
}