import React, { useState } from "react";
import './SignInPage.css'

interface Istate{
    userName: string;
    password: string;
}

const SignInPage=()=>{
    
    const [userName,setUserName] = useState<Istate['userName']>('');
    const [password,setPassword] = useState<Istate['password']>('');

    return (
        <div className="SignIn">
            <form>
                <label>התחבר</label>
                <br />
                <input type="text" name="UserName" id="UserName" value={userName} placeholder="שם משתמש..." onChange={(e)=>setUserName(e.target.value)}/>
                <input type="password" name="password" id="password" value={password} placeholder="סיסמה..." onChange={(e)=>setPassword(e.target.value)}/>
            </form>
            <button type="submit" className="btnSubmit" onClick={()=>{
                if(password==="123" && userName === "123"){
                    window.location.href = `/mainApp`;
                }else{
                    alert("שם משתמש או סיסמה לא נכונים")
                }
            }}>שלח</button>
        </div>
    )
}
export default SignInPage;