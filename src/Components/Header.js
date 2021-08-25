import './Style.css';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import axios from "axios";

function Header(props) {

    let userInfo = props.userInfo;

    const sessionInfo = sessionStorage.getItem("USER");
    console.log("session in header: ",sessionInfo);

    return (
        <div className="header">
            <Navbar bg="light" variant="light ">
                <Container>
                    <Navbar.Brand>债券销售管理系统</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link
                            className={props.currentPage === "insert" ? "active" : null}
                            onClick={()=>props.setCurrentPage("insert")}>插入数据</Nav.Link>
                        <Nav.Link
                            className={props.currentPage === "search" ? "active" : null}
                            onClick={()=>props.setCurrentPage("search")}>数据查询</Nav.Link>
                    </Nav>
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
