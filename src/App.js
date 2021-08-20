import './App.css';
import Login from "./Components/Login";
import Header from "./Components/Header";
import Record from "./Components/Record";
import axios from "axios";

function App() {

    const userInfo = {
        userUID:"ZhangSan",
        userName:"张三"
    };

    axios.get('/api/findAll')
        .then(res => {
            console.log(res.data);
        });

    // const userInfo = {};
    return (
        <div className="App">
            <Header userInfo={userInfo}/>
            {userInfo.userUID
                ? <Record/>
                : <Login/>}

        </div>
    );
}

export default App;
