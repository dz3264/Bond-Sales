import './RecordPages.css';
import "react-datepicker/dist/react-datepicker.css";
import {Col, Row, Form, Button, Table, Modal} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {useEffect, useState} from "react";
import axios from "axios";


function Insert(props) {

    const [startDate, setStartDate] = useState(new Date());
    const [salesID, setSalesId] = useState("");
    const [bondId, setBondId] = useState("");
    const [transAmount, setTransAmount] = useState(-1);
    const [selectedFile, setSelectedFile] = useState("");
    const [latestRecords, setLatestRecords] = useState([]);
    const [isUpLoading, setIsUpLoading] = useState(false);
    const [uploadModal, setUploadModal] = useState(false);
    const [userList, setUserList] = useState([]);
    const [bondList, setBondList] = useState([]);

    useEffect(() => {
        const fetchLatestRecords = async () => {
            const recordsResult = await axios(
                '/api/LatestRecords',
            );

            setLatestRecords(recordsResult.data);
        };

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
        fetchLatestRecords();
    }, []);

    const latestRecordsTable = latestRecords.map((record,idx)=>

        <tr>
            <td>{record.username}</td>
            <td>{record.date}</td>
            <td>{record.bondname}</td>
            <td>{record.price}</td>
        </tr>
    );

    async function submitInsert() {

        let data = {
            "bondid":bondId,
            "userid":salesID,
            "price":transAmount,
            "date":startDate};

        if(bondId==="" || salesID==="" ||transAmount===-1 ||startDate===null){
            alert("????????????????????????");
            return;
        }
        await axios.post('api/insertSales',data)
            .then(res=>{
                console.log('res=>',res);
            });

    }

    function uploadFile() {

        if(selectedFile === ""){
            return;
        }
        setIsUpLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        axios.post("api/fileUpload", formData).then(res => {
            console.log(res.data);
            setSelectedFile("");
            setIsUpLoading(false);
            handleShow();
        });
    }

    const handleClose = () => setUploadModal(false);
    const handleShow = () => setUploadModal(true);

    return (
        <>
        <div className="insert">
            <div className={"insert-section"}>
            <h4>??????????????????</h4>
            <br/>
            <Form onSubmit={submitInsert}>
                <Form.Group as={Row} className="mb-3" controlId="formSalesName">
                    <Form.Label column sm={4}>
                        ????????????
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={(name) => {
                                setSalesId(name.target.value);
                            }}>
                            <option>????????????</option>
                            {userList}
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formBondType">
                    <Form.Label column sm={4}>
                        ????????????
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Select
                            aria-label="Default select example"
                            onChange={(bond) => {
                                setBondId(bond.target.value);
                            }}>
                            <option>??????????????????</option>
                            {bondList}
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formDate">
                    <Form.Label column sm={4}>
                        ????????????
                    </Form.Label>
                    <Col sm={8}>
                        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formTransAmount">
                    <Form.Label column sm={4}>
                        ????????????
                    </Form.Label>
                    <Col sm={6}>
                        <Form.Control
                            type="text"
                            placeholder="??"
                            onChange={(amount) => setTransAmount(amount.target.value)}
                        />
                    </Col>
                </Form.Group>


                <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset:1 }}>
                        <Button
                            type="submit"
                            variant="primary"
                        >??????</Button>
                    </Col>
                </Form.Group>
            </Form>
            </div>

            <div className={"insert-section insert-file"}>

                <h4>????????????????????????</h4>
                <br/>
                <Form.Control
                    type="file"
                    accept=".txt"
                    onChange={(file) => setSelectedFile(file.target.files[0])}
                />
                <br/>

            <Form.Group as={Row} className="mb-3">

                <Button
                    variant="outline-primary"
                    onClick={!isUpLoading ? uploadFile : null}
                >{isUpLoading ? '????????????' : '??????'}</Button>
            </Form.Group>
            </div>
        </div>
        <div className={"latest-table"}>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>??????</th>
                    <th>??????</th>
                    <th>????????????</th>
                    <th>??????</th>
                </tr>
                </thead>
                <tbody>
                {latestRecordsTable}
                </tbody>
            </Table>

        </div>
            <Modal
                show={uploadModal}
                onHide={handleClose}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body><h5>?????????????????????</h5></Modal.Body>
            </Modal>
        </>
    );
}

export default Insert;
