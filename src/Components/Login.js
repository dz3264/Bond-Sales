import './Style.css';
import {Button, Card, Form} from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import {useEffect, useState} from "react";
import axios from "axios";


export default function Login(){

    const [name, setName] = useState("");
    const [password, setPassword] = useState(-1);

    function submitSearch() {
        alert('欢迎'+name+'，'+'正在登陆中，请稍等');
    }

    useEffect(() => {
        const fetchName = async () => {
            let data = {"name":"1234","password":"yyyyyy"};
            const nameResult = await axios.post('${this.$url}/test/testRequest',data)
                .then(res=>{
                    console.log('res=>',res);
                });

            setName(nameResult.data);
        };
        // const fetchPassword = async () => {
        //     const passwordResult = await axios(
        //         '/api/ListBond'
        //     );
        //
        //     setPassword(passwordResult.data);
        // };
        fetchName();
        // fetchPassword();
    }, []);


    return (
        <section id="hero" className="d-flex align-items-center">
            <div className="container" data-aos="zoom-out" data-aos-delay="100">

                <h1>欢迎使用 <span>债券销售管理系统</span></h1>
                <h2>Welcome to Bond sales management system</h2>
                <div className="btn-group-sm">
                    <Button className={"btn"} variant="primary" onClick={submitSearch} type="submit">
                        登陆
                    </Button>

                    <Button className={"btn btn-signup"} variant="outline-primary" type="submit">
                        注册
                    </Button>

                </div>
            </div>
        </section>
        // <div className="login"  align="center">
        //
        //     <h1>Login</h1>
        //     <p>Welcome</p>
        //
        // <br></br><br></br><br></br><br></br>
        //
        //     <Card style={{ width: '18rem' }}>
        //         <Card.Body>
        //
        //                 <Form.Group className="mb-3" controlId="Name">
        //                     <Form.Label>账号</Form.Label>
        //                     <Form.Control
        //                         type="email"
        //                         placeholder="请输入你的名字"
        //                         onChange={(name) => setName(name.target.value)}
        //                     />
        //                 </Form.Group>
        //
        //                 <Form.Group className="mb-3" controlId="formBasicPassword">
        //                     <Form.Label>密码</Form.Label>
        //                     <Form.Control onChange={(password) => setPassword(password.target.value)}
        //                                   type="password" placeholder="请输入你的密码" />
        //                 </Form.Group>
        //                 <Button onClick={submitSearch}variant="outline-dark" type="submit">
        //                     登陆
        //                 </Button>
        //
        //             {/*onClick={() => { alert('正在登陆中，请稍等') }}*/}
        //
        //         </Card.Body>
        //     </Card>
        //
        //
        // </div>
    );
}
