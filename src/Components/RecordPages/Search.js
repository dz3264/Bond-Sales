import './RecordPages.css';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {useState} from "react";

const tempSalesNames = ["张三", "李四", "王五"];
const tempBondTypes = ["债券A", "债券B", "债券C", "债券D"];

function Search() {

    const salesNames = tempSalesNames.map((name) =>
        <option value={name}>{name}</option>
    );

    const bondTypes = tempBondTypes.map((bond) =>
        <option value={bond}>{bond}</option>
    );

    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className="search">
            <div>查询销售数据</div>
            <br/>
            <Form>
                <div className={"form-section"}>
                <div className={"form-subsection"}>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                    <Form.Label column sm={6}>
                        销售姓名
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Select aria-label="Default select example">
                            <option>选择销售</option>
                            {salesNames}
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={6}>
                        债券类型
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Select aria-label="Default select example">
                            <option>选择债券类型</option>
                            {bondTypes}
                        </Form.Select>
                    </Col>
                </Form.Group>
                </div>

                <div className={"form-subsection"}>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={6}>
                        起始日期
                    </Form.Label>
                    <Col sm={10}>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                    <Form.Label column sm={6}>
                        结束日期
                    </Form.Label>
                    <Col sm={10}>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </Col>
                </Form.Group>
                </div>
                </div>


                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset:1 }}>
                        <Button type="submit">查询</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
}

export default Search;
