import './RecordPages.css';
import {useState} from "react";
import {Button, Col, Container, Form, Pagination, Row, Table} from "react-bootstrap";
import DatePicker from "react-datepicker";
import axios from "axios";
import { CSVLink } from "react-csv";

const dataPerPage = 10;

function Search(props) {

    // state
    const [startDate, setStartDate] = useState(new Date("2000-01-01"));
    const [endDate, setEndDate] = useState(new Date());
    const [salesName, setSalesName] = useState("");
    const [bondType, setBondType] = useState("");
    const [salesID, setSalesId] = useState(0);
    const [bondId, setBondId] = useState(0);
    const [searchResult, setSearchResult] = useState([]);

    //const [currentPage, setCurrentPage] = useState(1);

    const fileHeader = [
        { label: "姓名", key: "username" },
        { label: "日期", key: "date" },
        { label: "证券类型", key: "bondname" },
        { label: "金额", key: "price" }
    ];

    // data
    const salesNames = props.userList.map((user) =>
        <option value={user.userid}>{user.username}</option>
    );

    const bondTypes = props.bondList.map((bond) =>
        <option value={bond.bondid}>{bond.bondname}</option>
    );

    // Pagination
    // const totalPage = Math.ceil(tempTransactions.length/dataPerPage);
    // const pagination = [];
    const transactionsTable = searchResult.map((trans,idx)=>

            <tr>
                <td>{idx+1}</td>
                <td>{trans.username}</td>
                <td>{trans.date.split('T')[0]}</td>
                <td>{trans.bondname}</td>
                <td>{trans.price}</td>
            </tr>
    );

    // for (let i = 1; i <= totalPage; i++){
    //     if (i === currentPage){
    //         pagination.push(<Pagination.Item key={i}  active>{i}</Pagination.Item>)
    //     }
    //     else{
    //         pagination.push(<Pagination.Item key={i}  onClick={(e)=>changePage(e.target.text)}>{i}</Pagination.Item>)
    //     }
    // }

    // functions
    async function submitSearch() {
        let data = {
            "userid":salesID > 0 ? salesID : null,
            "bondid":bondId > 0 ? bondId : null,
            "startDate":startDate,
            "endDate":endDate
        };

        await axios.post('api/lookUp',data)
            .then(res=>{
                console.log('res=>',res);
                setSearchResult(res.data);
            });
    }


    // function changePage(p) {
    //     let newPage = parseInt(p);
    //     if (newPage >= 1 && newPage <= totalPage){
    //         setCurrentPage(newPage);
    //     }
    // }

    return (
        <div className="search">
            <h3>查询销售数据</h3>
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
                            onChange={(name) => setSalesId(name.target.value)}
                        >
                            <option value={0}>全部销售</option>
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
                            onChange={(type) => setBondId(type.target.value)}
                        >
                            <option value={0}>全部债券类型</option>
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


                <div  className="search-btn-group">

                        <Button
                            className={"search-btn"}
                            variant="primary"
                            onClick={submitSearch}
                        >查询</Button>

                    <CSVLink
                        data={searchResult}
                        headers={fileHeader}
                        filename={"债券销售数据.csv"}
                        onClick={event => {
                            if(searchResult.length <= 0){
                                alert("查询数据为空！");
                                return false;
                            }
                        }}
                    >
                        <Button
                            className={"search-btn"}
                            variant="outline-primary"
                        >
                            下载
                        </Button>
                    </CSVLink>
                </div>

                </div>
            </Form>

            <div className={"transaction-table"}>
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
            {/*{totalPage > 1*/}
            {/*    ? <Pagination>*/}
            {/*        <Pagination.First*/}
            {/*            onClick={()=>changePage(1)}/>*/}
            {/*        <Pagination.Prev*/}
            {/*            onClick={()=>changePage(currentPage-1)}/>*/}
            {/*        {pagination}*/}
            {/*        <Pagination.Next*/}
            {/*            onClick={()=>changePage(currentPage+1)}/>*/}
            {/*        <Pagination.Last*/}
            {/*            onClick={()=>changePage(totalPage)}/>*/}
            {/*    </Pagination>*/}
            {/*    : null}*/}



        </div>
    );
}

export default Search;
