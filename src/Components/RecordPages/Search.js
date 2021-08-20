import './RecordPages.css';
import {Button, Col, Container, Form, Pagination, Row, Table} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {useState} from "react";


const dataPerPage = 10;
// TODO: 后端链接
const tempTransactions = [
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
    ["张三", "2021-07-10", "债券A", 1000],
    ["李四", "2021-08-10", "债券B", 1000],
    ["张三", "2021-07-10", "债券A", 2000],
    ["王五", "2021-06-10", "债券D", 1500],
];

function Search(props) {

    // state
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [salesName, setSalesName] = useState("");
    const [bondType, setBondType] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // constant
    const totalPage = Math.ceil(tempTransactions.length/dataPerPage);
    const pagination = [];

    // data
    const salesNames = props.userList.map((user) =>
        <option id={user.userid} value={user.username}>{user.username+"-"+user.userid}</option>
    );

    const bondTypes = props.bondList.map((bond) =>
        <option id={bond.bondid} value={bond.bondname}>{bond.bondname}</option>
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


    // pagination
    for (let i = 1; i <= totalPage; i++){
        if (i === currentPage){
            pagination.push(<Pagination.Item key={i}  active>{i}</Pagination.Item>)
        }
        else{
            pagination.push(<Pagination.Item key={i}  onClick={(e)=>changePage(e.target.text)}>{i}</Pagination.Item>)
        }
    }

    // functions
    function submitSearch() {
        alert(salesName+bondType);
    }

    function changePage(p) {
        let newPage = parseInt(p);
        if (newPage >= 1 && newPage <= totalPage){
            setCurrentPage(newPage);
        }
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
            {totalPage > 1
                ? <Pagination>
                    <Pagination.First
                        onClick={()=>changePage(1)}/>
                    <Pagination.Prev
                        onClick={()=>changePage(currentPage-1)}/>
                    {pagination}
                    <Pagination.Next
                        onClick={()=>changePage(currentPage+1)}/>
                    <Pagination.Last
                        onClick={()=>changePage(totalPage)}/>
                </Pagination>
                : null}



        </div>
    );
}

export default Search;
