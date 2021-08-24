import './Style.css';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import axios from "axios";

function Header(props) {

    let userInfo = props.userInfo;

    return (
        <div className="header">
            <Navbar bg="light" variant="light ">
                <Container>
                    <Navbar.Brand>债券销售管理系统</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link eventKey="disabled" disabled>
                            Signed in as: {userInfo}
                        </Nav.Link>
                        <Button variant="outline-dark" onClick={props.logOut}>登出</Button>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
