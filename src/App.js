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

    useEffect(() => {
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

    // TODO: get userinfo from backend
    // const userInfo = {
    //     userUID:"ZhangSan",
    //     userName:"张三"
    // };
    const userInfo = {};
    return (
        <div className="App">

            {userInfo.userUID
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
                : <Login/>}

        </div>
    );
}

export default App;
