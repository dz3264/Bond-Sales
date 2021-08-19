import './Record.css';
import {Container, Tabs,Tab} from "react-bootstrap";
import Insert from "./RecordPages/Insert";
import Search from "./RecordPages/Search";

function Record() {
    return (
        <div className="record">
            <Container>
            <Tabs
                defaultActiveKey="insert"
                id="tab"
                className="mb-3">
                <Tab eventKey="insert" title="销售数据录入">
                    <Insert/>
                </Tab>
                <Tab eventKey="search" title="报表查询">
                    <Search/>
                </Tab>
            </Tabs>
            </Container>
        </div>
    );
}

export default Record;
