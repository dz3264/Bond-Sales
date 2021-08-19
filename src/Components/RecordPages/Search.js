import './RecordPages.css';
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {useState} from "react";

// TODO: 后端链接
const tempSalesNames = ["张三", "李四", "王五"];
const tempBondTypes = ["债券A", "债券B", "债券C", "债券D"];
const tempTransactions = [
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
];

function Search() {

    const salesNames = tempSalesNames.map((name) =>
        <option value={name}>{name}</option>
    );

    const bondTypes = tempBondTypes.map((bond) =>
        <option value={bond}>{bond}</option>
    );

    const transactionsTable = tempTransactions.map((trans,idx)=>
        <tr>
            <td>{idx}</td>
            <td>{trans[0]}</td>
            <td>{trans[1]}</td>
            <td>{trans[2]}</td>
            <td>{trans[3]}</td>
        </tr>
    );

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [salesName, setSalesName] = useState("");
    const [bondType, setBondType] = useState("");
    const [transAmount, setTransAmount] = useState(-1);


    function submitSearch() {
        alert(salesName+bondType+transAmount);
    }


    return (
        <div className="search">
            <div>查询销售数据</div>
            <br/>
            <Form>
                <div className={"form-section"}>
                <div className={"form-subsection"}>

                <Form.Group as={Row} className="mb-3" controlId="formSalesName">
                    <Form.Label column sm={6}>
                        销售姓名
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={(name) => setSalesName(name.target.value)}
                        >
                            <option>选择销售</option>
                            {salesNames}
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formBondType">
                    <Form.Label column sm={6}>
                        债券类型
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={(type) => setBondType(type.target.value)}
                        >
                            <option>选择债券类型</option>
                            {bondTypes}
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formStartDate">
                    <Form.Label column sm={6}>
                        起始日期
                    </Form.Label>
                    <Col sm={10}>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formEndDate">
                    <Form.Label column sm={6}>
                        结束日期
                    </Form.Label>
                    <Col sm={10}>
                        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                    </Col>
                </Form.Group>
                </div>


                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset:1 }}>
                        <Button
                            variant="outline-dark"
                            onClick={submitSearch}
                        >查询</Button>
                    </Col>
                </Form.Group>

                </div>
            </Form>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>姓名</th>
                    <th>日期</th>
                    <th>证券类型</th>
                    <th>金额</th>
                </tr>
                </thead>
                <tbody>
                {transactionsTable}
                </tbody>
            </Table>

        </div>
    );
}

export default Search;
