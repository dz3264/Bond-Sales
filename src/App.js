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

    const [currentPage, setCurrentPage] = useState("search");

    const [userList, setUserList] = useState([]);
    const [bondList, setBondList] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = () => {
            const sessionInfo = sessionStorage.getItem("USER");
            setUserInfo(sessionInfo);
            console.log("sessionInfo: ",sessionInfo);

        };

        const fetchUserList = async () => {
            const userResult = await axios(
                '/api/ListUser',
            );

            setUserList(userResult.data);
        };
        const fetchBondList = async () => {
            const bondResult = await axios(
                '/api/ListBond'
            );

            setBondList(bondResult.data);
        };
        fetchUserList();
        fetchBondList();
        fetchUserInfo();

    }, []);

    async function loginFunction(username, password) {
        let data = {"logname":username, "password":password};
        await axios.post('api/login',data)
                .then(res=>{
                    setUserInfo(res.data);
                    sessionStorage.setItem("USER", res.data);
                });

    }

    async function logOut(){
        await axios.post('api/logout')
            .then(res=>{
                setUserInfo(null);
                sessionStorage.removeItem("USER");
            });
    }
    console.log("userInfo: ",userInfo);
    console.log("page check: ", userInfo != null && userInfo.length > 0);

    return (
        <div className="App">

            {userInfo != null && userInfo.length > 0
                ?<>
                    <div style={{
                        marginLeft: expanded ? 240 : 64,
                    }}>
                    <Header
                        userInfo={userInfo}
                        logOut={logOut}
                    />
                    <Container>
                        {currentPage === "insert"
                            ? <Insert userList={userList} bondList={bondList}/>
                            : <Search userList={userList} bondList={bondList}/>}
                    </Container>
                    </div>
                    <SideNavbar
                        setCurrentPage={setCurrentPage}
                        setExpanded={setExpanded}
                    />
                </>
                : <Login loginFunction={loginFunction}/>}

        </div>
    );
}

export default App;
