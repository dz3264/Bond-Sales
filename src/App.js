import './App.css';
import Login from "./Components/Login";
import Header from "./Components/Header";
import Record from "./Components/Record";
import axios from "axios";

function App() {

    // const userInfo = {
    //     userUID:"ZhangSan",
    //     userName:"张三"
    // };

    const userInfo = {};
    return (
        <div className="App">

            {userInfo.userUID
                ?<><Header userInfo={userInfo}/><Record/></>
                : <Login/>}

        </div>
    );
}

export default App;
