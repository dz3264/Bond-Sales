import './Record.css';
import {Container, Tabs,Tab} from "react-bootstrap";
import Insert from "./RecordPages/Insert";
import Search from "./RecordPages/Search";
import axios from "axios";
import {useEffect, useState} from "react";


function Record() {


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



    return (
        <div className="record">
            <Container>
            <Tabs
                defaultActiveKey="insert"
                id="tab"
                className="mb-3">
                <Tab className={"tab-name"} eventKey="insert" title="销售数据录入">
                    <Insert userList={userList} bondList={bondList}/>
                </Tab>
                <Tab className={"tab-name"} eventKey="search" title="报表查询">
                    <Search userList={userList} bondList={bondList}/>
                </Tab>
            </Tabs>
            </Container>
        </div>
    );
}

export default Record;
