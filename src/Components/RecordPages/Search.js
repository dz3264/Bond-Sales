import './RecordPages.css';
import {useEffect, useState} from "react";
import {Button, Col, Form, Pagination, Row, Table} from "react-bootstrap";
import DatePicker from "react-datepicker";
import axios from "axios";
import { CSVLink } from "react-csv";

const numPerPage = 20;

function Search(props) {

    // state
    const [startDate, setStartDate] = useState(new Date("2000-01-01"));
    const [endDate, setEndDate] = useState(new Date());
    const [salesID, setSalesId] = useState(0);
    const [bondId, setBondId] = useState(0);
    const [searchResult, setSearchResult] = useState([]);
    const [totalDataPage, setTotalDataPage] = useState(0);
    const [userList, setUserList] = useState([]);
    const [bondList, setBondList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {

        const fetchUserList = async () => {
            const userResult = await axios(
                '/api/ListUser',
            );

            const salesNames = userResult.data.map((user) =>
                <option  value={user.userid}>{user.username}</option>
            );
            setUserList(salesNames);
        };
        const fetchBondList = async () => {
            const bondResult = await axios(
                '/api/ListBond'
            );

            const bondTypes = bondResult.data.map((bond) =>
                <option value={bond.bondid}>{bond.bondname}</option>
            );

            setBondList(bondTypes);
        };
        fetchUserList();
        fetchBondList();
    }, []);

    const fileHeader = [
        { label: "姓名", key: "username" },
        { label: "日期", key: "date" },
        { label: "证券类型", key: "bondname" },
        { label: "金额", key: "price" }
    ];

    // Pagination
    const totalPage = Math.ceil(totalDataPage/numPerPage);
    let pagination = [];
    const transactionsTable = searchResult.map((trans,idx)=>

        <tr>
            <td>{idx+1}</td>
            <td>{trans.username}</td>
            <td>{trans.date.split('T')[0]}</td>
            <td>{trans.bondname}</td>
            <td>{trans.price}</td>
        </tr>
    );

    for (let i = 1; i <= totalPage; i++){
        if(currentPage === i){
            pagination.push(
                <option value={i} selected>
                    {i}
                </option>)
        }else {
            pagination.push(
                <option value={i}>
                    {i}
                </option>)
        }

    }

    // functions
    async function submitSearch() {
        await getSearchResult(currentPage);
    }

    async function changePage(p) {
        let newPage = parseInt(p);
        console.log("change page: ",newPage);
        if (newPage >= 1 && newPage <= totalPage){
            setCurrentPage(newPage);
            await getSearchResult(newPage);
        }
    }

    async function getSearchResult(p){
        let data = {
            "userid":salesID > 0 ? salesID : null,
            "bondid":bondId > 0 ? bondId : null,
            "startDate":startDate,
            "endDate":endDate,
            "pageNumber":p,
            "numPerPage":numPerPage
        };

        console.log(data);

        await axios.post('api/lookUpCount',data)
            .then(res=>{
                console.log('res=>',res);
                setTotalDataPage(res.data);
            });

        await axios.post('api/lookUp',data)
            .then(res=>{
                console.log('res=>',res);
                setSearchResult(res.data);
            });
    }

    console.log("new searchResult: ",searchResult);

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
                            {userList}
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
                            {bondList}
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
                        onClick={(event) => {
                            if(searchResult.length <= 0){
                                alert("查询数据为空！");
                                return false;
                            }
                        }}
                    >
                        <Button
                            className={"search-btn"}
                            variant="outline-primary"
                        > 下载
                        </Button>
                    </CSVLink>
                </div>

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
                    <Form.Select
                        aria-label="Default select example"
                        onChange={(e)=>changePage(e.target.value)}
                    >
                        {pagination}
                    </Form.Select>
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
