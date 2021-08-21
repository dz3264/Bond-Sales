import './App.css';
import Login from "./Components/Login";
import Header from "./Components/Header";
import Record from "./Components/Record";
import Insert from "./Components/RecordPages/Insert";
import Search from "./Components/RecordPages/Search";
import axios from "axios";
import {useEffect, useState} from "react";
import {Container } from "react-bootstrap";

function App() {

    // Insert:1, Search:2
    const [currentPage, setCurrentPage] = useState(1);

    const userInfo = {
        userUID:"ZhangSan",
        userName:"张三"
    };

    const [userList, setUserList] = useState([]);
    const [bondList, setBondList] = useState([]);

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

    //const userInfo = {};
    return (
        <div className="App">

            {userInfo.userUID
                ?
                <>
                    <Header
                    userInfo={userInfo}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                /><Container className={"record"}>
                    {currentPage === 1
                    ? <Insert userList={userList} bondList={bondList}/>
                    : <Search userList={userList} bondList={bondList}/>
                }
                </Container>
                </>
                : <Login/>}

        </div>
    );
}

export default App;
