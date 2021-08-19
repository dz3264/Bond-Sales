import './Header.css';
import {Button, Container, Nav, Navbar} from "react-bootstrap";

function Header(props) {

    let UserUID = props.userInfo.userUID;
    function signOut(){
        alert("signout");
    }
    return (
        <div className="header">
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand>债券销售管理系统</Navbar.Brand>

                    {UserUID
                        ? <Navbar.Collapse className="justify-content-end">
                            <Nav.Link eventKey="disabled" disabled>
                                Signed in as: {UserUID}
                            </Nav.Link>
                            <Button variant="outline-dark" onClick={signOut}>登出</Button>
                        </Navbar.Collapse>
                        : null
                    }


                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
