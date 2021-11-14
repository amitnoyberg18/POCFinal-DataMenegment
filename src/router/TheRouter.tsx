import {BrowserRouter as Router,Route,Routes as Switch} from 'react-router-dom';
import FirstPage from "../Pages/FirstPage/FirstPage";
import App from "../App";
import SignInPage from '../Pages/ManagmentSystem/SignInPage/SignInPage';
import MainApp from '../Pages/ManagmentSystem/ManagmentPage/MainApp';



const TheRouter = () =>{

    return <Router>
        <Switch>
            <Route path = "/" element={<FirstPage />}/>
            <Route path = "/ManagePage" element = {<SignInPage />}/>
            <Route path = "/mainApp" element = {<App />}/>
            <Route path = "/mainApp/:CardId" element = {<App />}/>
            <Route path = "/ManagePage/MainApp" element = {<MainApp />}/>
            <Route path = "/ManagePage/MainApp/:page" element = {<MainApp />}/>
            {/* add params to mainPage */}
        </Switch>
    </Router>
}
export default TheRouter;