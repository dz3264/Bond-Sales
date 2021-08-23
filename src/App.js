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

    const [userList, setUserList] = useState([]);
    const [bondList, setBondList] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const sessionInfo = sessionStorage.getItem("USER");
        console.log("session: ",sessionInfo);

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

    }, []);

    async function loginFunction(name, password){
        await axios.post('${this.$url}/test/testRequest',data)
            .then(res=>{
                console.log('res=>',res);
                setUserInfo(res.data);
            });
    }

    // TODO: get userinfo from backend
    // const userInfo = {
    //     userUID:"ZhangSan",
    //     userName:"张三"
    // };
    //const userInfo = {};

    async function loginFunction(username, password) {
        let data = {"username":username, "password":password};
        await axios.post('api/login',data)
                .then(res=>{
                    setUserInfo(res.data);
                    console.log('res=>',res);
                });

        };

    return (
        <div className="App">

            {userInfo
                ?<>
                    <div style={{
                        marginLeft: expanded ? 240 : 64,
                    }}>
                    <Header userInfo={userInfo}/>
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
