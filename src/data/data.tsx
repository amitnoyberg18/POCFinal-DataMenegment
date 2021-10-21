// import CardQuestionnaire from "../classes/cardQuestion"

import { CardTree } from "../models/cardTree";



export const dataCardTree = () =>{ 
    // const titleProject : CardTree={id:1,questionText:"מערכת לניהול ידע מוקד"}

    const c1 : CardTree={id:1,questionText:"היכן הבעיה",answers:[ "אתר","לא"],clicked:80}
    const c2 : CardTree={id:2,questionText:" היכן הבעיה באתר",answers:["שאלונים","נתון לא מעודכן באתר","נתון לא נכון באתר","לא מצליח להתחבר לאתר"],clicked:900}
    const c3 : CardTree={id:3,questionText:"האם התחבר בעבר",answers:[ "לא","כן"] ,clicked:110}
    const c4 : CardTree={id:4,questionText:"שילחו קישור לסיסמא ראשונית. הצליח?",answers:[ "לא","כן"],clicked:100}
    const c5 : CardTree={id:5,questionText:"הביאו סיסמה ראשונית. הצליח?",answers:[ "לא","כן"], clicked:10}
    const c6 : CardTree={id:6,questionText:"היכנס לטרנזקציה",answers:["תחום","תת תחום","שאלה","תת שאלה","תבנית תשובה בCRM"],clicked:45}
    const c7 : CardTree={id:7,questionText:"שאלונים",answers:[ "לא","אתר"],clicked:30}

    const arrCards :CardTree[]=[c1,c2,c3,c4,c5,c6,c7];
    arrCards[0].nextCards = ([arrCards[1],arrCards[5]]);
    arrCards[1].nextCards = ([arrCards[6],arrCards[5],arrCards[5],arrCards[2]]);
    arrCards[2].nextCards = ([arrCards[3],arrCards[4]]);
    
    return arrCards;
}

// const dataVal = () =>{ 
//     const data = [
//         new CardQuestionnaire<string>(1,"היכן הבעיה",["אתר","לא"]), 
//         new CardQuestionnaire<string>(2,"היכן הבעיה באתר",["שאלונים","נתון לא מעודכן באתר","נתון לא נכון באתר","לא מצליח להתחבר לאתר"]),   
//         new CardQuestionnaire<string>(3,"האם התחבר בעבר",["לא","כן"]),
//         new CardQuestionnaire<string>(4,"שילחו קישור לסיסמא ראשונית. הצליח?",["כן","לא"]),
//         new CardQuestionnaire<string>(5,"הביאו סיסמה ראשונית. הצליח?",["כן","לא"]),
//         new CardQuestionnaire<string>(6,"להיכנס לטרנזקציה ........",["תחום","תת תחום","שאלה","תת שאלה","תבנית תשובה בCRM"]), 
//         new CardQuestionnaire<string>(7,"שאלונים",["לבדוק איזה שאלון ולעשות הסבה"]), 

//     ]
//     data[0].setNext([data[1],data[5]]);
//     data[1].setNext([data[6],data[5],data[5],data[2]]);
//     data[2].setNext([data[3],data[4]]);
//     return data;
// }
// export default dataVal;