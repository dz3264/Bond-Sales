import './RecordPages.css';
import "react-datepicker/dist/react-datepicker.css";
import {Col, Row, Form, Button, Container} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {useState} from "react";

const tempSalesNames = ["张三", "李四", "王五"];
const tempBondTypes = ["债券A", "债券B", "债券C", "债券D"];

function Insert() {

    // TODO: 后端数据结构，需要姓名和ID


    const salesNames = tempSalesNames.map((name) =>
        <option value={name}>{name}</option>
    );

    const bondTypes = tempBondTypes.map((bond) =>
        <option value={bond}>{bond}</option>
    );

    const [startDate, setStartDate] = useState(new Date());
    const [salesName, setSalesName] = useState("");
    const [bondType, setBondType] = useState("");
    const [transAmount, setTransAmount] = useState(-1);


    function submitInsert() {
        alert(salesName+bondType+transAmount);
    }


    return (
        <div className="insert">
            <div>录入销售记录</div>
            <br/>
            <Form onSubmit={submitInsert}>
                <Form.Group as={Row} className="mb-3" controlId="formSalesName">
                    <Form.Label column sm={4}>
                        销售姓名
                    </Form.Label>
                    <Col sm={6}>
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
                    <Form.Label column sm={4}>
                        债券类型
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={(type) => setBondType(type.target.value)}
                        >
                            <option>选择债券类型</option>
                            {bondTypes}
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formDate">
                    <Form.Label column sm={4}>
                        成交日期
                    </Form.Label>
                    <Col sm={8}>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formTransAmount">
                    <Form.Label column sm={4}>
                        成交金额
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            type="text"
                            placeholder="¥"
                            onChange={(amount) => setTransAmount(amount.target.value)}
                        />
                    </Col>
                </Form.Group>


                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset:1 }}>
                        <Button
                            type="submit"
                            variant="outline-dark"
                        >提交</Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
}

export default Insert;
