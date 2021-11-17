import React, { useState } from "react";
import { Link } from "react-router-dom";
import './SignInPage.css'
import HomePng from "../../../icons/backHomePage.png";


interface Istate{
    userName: string;
    password: string;
}

const SignInPage=()=>{
    
    const [userName,setUserName] = useState<Istate['userName']>('');
    const [password,setPassword] = useState<Istate['password']>('');

    return (
        <div>
            <Link to='/'>
                <button className="TheHome"><img src={HomePng} style={{width:"25px"}} alt="Home"></img></button>
          </Link>
            <div className="SignIn">
            <form>
                <label>התחבר</label>
                <br />
                <input type="text" name="UserName" id="UserName" value={userName} placeholder="שם משתמש..." onChange={(e)=>setUserName(e.target.value)}/>
                <input type="password" name="password" id="password" value={password} placeholder="סיסמה..." onChange={(e)=>setPassword(e.target.value)}/>
            </form>
            <button type="submit" className="btnSubmit" onClick={()=>{
                if(password==="123" && userName === "123"){
                    window.location.href = `/ManagePage/MainApp/cards`;
                }else{
                    alert("שם משתמש או סיסמה לא נכונים")
                }
            }}>שלח</button>
        </div>
    </div>
    )
}
export default SignInPage;