import './Style.css';
import {Button, Col, Form, Modal} from 'react-bootstrap';
import {useEffect, useState} from "react";
import axios from "axios";

export default function LoginModal(props) {

    const [name, setName] = useState("");
    const [password, setPassword] = useState(-1);
    const [showError, setShowError] = useState(false);

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="modal-title">
                    欢迎登陆
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="Name">
                    <Form.Label>账号</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="请输入你的名字"
                        onChange={(name) => setName(name.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>密码</Form.Label>
                    <Form.Control onChange={(password) => setPassword(password.target.value)}
                                  type="password"
                                  placeholder="请输入你的密码" />
                </Form.Group>
                <div
                    className={"wrong-message"}
                    // style={{visibility: props.showError ? "inherit":"hidden"}}
                    style={{visibility: showError ? "inherit":"hidden"}}
                >用户名或密码错误！</div>
            </Modal.Body>
            <Modal.Footer>
                <div className={"modal-footer-content"}>
                <a href={""} className={"footer-link"}>忘记密码</a>
                <Button onClick={() => {
                    props.loginFunction(name, password).then(res => {
                        if(!res){
                            setShowError(true);
                            setTimeout(() => {
                                // After 3 seconds set the show value to false
                                setShowError(false)
                            }, 3000);
                        }
                    });
                }}>登陆</Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
