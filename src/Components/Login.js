import './Style.css';
import {Button} from 'react-bootstrap';
import {useEffect, useState} from "react";
import LoginModal from "./LoginModal";
import axios from "axios";

export default function Login(props){

    const [modalShow, setModalShow] = useState(false);

    return (
        <section id="hero" className="d-flex align-items-center">
            <div className="container" data-aos="zoom-out" data-aos-delay="100">

                <h1>欢迎使用 <span>债券销售管理系统</span></h1>
                <h2>Welcome to Bond sales management system</h2>
                <div className="btn-group-sm">
                    <Button className={"btn"} variant="primary" onClick={() => setModalShow(true)} type="submit">
                        登陆
                    </Button>

                    <Button className={"btn btn-signup"} variant="outline-primary" type="submit">
                        注册
                    </Button>

                </div>
            </div>
            <LoginModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                loginFunction={props.loginFunction}
            />
        </section>
    );
}
