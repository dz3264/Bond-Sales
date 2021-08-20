import './Login.css';
import {Button, ButtonGroup, Card, Form} from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {useState} from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Login(){
    const classes = useStyles();

    const [name, setName] = useState("");
    const [password, setPassword] = useState(-1);

    function submitSearch() {
        alert('欢迎'+name+'，'+'正在登陆中，请稍等');
    }

    return (
        <div className="LOGIN"  align="center">
            <h1>Login</h1>
            <p>Welcome</p>

        <br></br><br></br><br></br><br></br>

            <Card style={{ width: '18rem' }}>
                <Card.Body>

                        <Form.Group className="mb-3" controlId="Name">
                            <Form.Label>账号</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="请输入你的名字"
                                onChange={(name) => setName(name.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>密码</Form.Label>
                            <Form.Control onChange={(password) => setPassword(password.target.value)}
                                          type="password" placeholder="请输入你的密码" />
                        </Form.Group>
                        <Button onClick={submitSearch}variant="outline-dark" type="submit">
                            登陆
                        </Button>

                    {/*onClick={() => { alert('正在登陆中，请稍等') }}*/}

                </Card.Body>
            </Card>




        </div>
    );
}
