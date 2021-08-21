import './Style.css';
import {Button, Container, Nav, Navbar} from "react-bootstrap";

function Header(props) {

    let UserUID = props.userInfo.userUID;
    function signOut(){
        alert("signout");
    }
    return (
        <div className="header">
            <Navbar className={"color-white shadow"} variant="light">
                <Container>
                    <Navbar.Brand>债券销售管理系统</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={signOut} active>插入数据</Nav.Link>
                        <Nav.Link >查询记录</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link eventKey="disabled" disabled>
                            Signed in as: {UserUID}
                        </Nav.Link>
                        <Button variant="outline-dark" onClick={signOut}>登出</Button>
                    </Navbar.Collapse>


                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
