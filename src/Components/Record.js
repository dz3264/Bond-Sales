import './Record.css';
import {Container, Tabs,Tab} from "react-bootstrap";
import Insert from "./RecordPages/Insert";
import Search from "./RecordPages/Search";

function Record() {
    return (
        <div className="record">
            <Container>
            <Tabs
                defaultActiveKey="search"
                id="tab"
                className="mb-3">
                <Tab className={"tab-name"} eventKey="insert" title="销售数据录入">
                    <Insert/>
                </Tab>
                <Tab className={"tab-name"} eventKey="search" title="报表查询">
                    <Search/>
                </Tab>
            </Tabs>
            </Container>
        </div>
    );
}

export default Record;
