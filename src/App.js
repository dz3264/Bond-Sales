import './App.css';
import Login from "./Components/Login";
import Header from "./Components/Header";
import SideNavbar from "./Components/SideNavbar";
import Insert from "./Components/RecordPages/Insert";
import Search from "./Components/RecordPages/Search";
import axios from "axios";
import {useEffect, useState} from "react";
import {Container } from "react-bootstrap";

function App() {

    const [currentPage, setCurrentPage] = useState("insert");
    const [expanded, setExpanded] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = () => {
            const sessionInfo = sessionStorage.getItem("USER");
            setUserInfo(sessionInfo);
        };
        fetchUserInfo();

    }, []);

    async function loginFunction(username, password) {
        let data = {"logname":username, "password":password};
        const result = await axios.post('api/login',data)
            .then(res=>{
                console.log(res);
                if(res.data){
                    setUserInfo(res.data);
                    sessionStorage.setItem("USER", res.data);
                    return true;
                }else{
                    return false;
                }
            });

        console.log("loginFunction: ",result);
        return result
    }

    async function logOut(){
        await axios.post('api/logout')
            .then(res=>{
                setUserInfo(null);
                sessionStorage.removeItem("USER");
            });
    }

    return (
        <div className="App">

            {userInfo != null && userInfo.length > 0
                ?<>
                    <div>
                    <Header
                        userInfo={userInfo}
                        logOut={logOut}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                    <Container>
                        {currentPage === "insert"
                            ? <Insert />
                            : <Search />}
                    </Container>
                    </div>
                </>
                : <Login
                    loginFunction={loginFunction}
                />}

        </div>
    );
}

export default App;
