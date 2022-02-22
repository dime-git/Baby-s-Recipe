import React from 'react';
import { Nav, Navbar, Container, Image, Button } from 'react-bootstrap';
import { VscCircleFilled } from "react-icons/all";
import logo  from '../../assets/logoImages/Babys.svg';

function Header() {

    const token = localStorage.getItem("token")

    return (
        <Navbar id='header' variant="light">
            <Container >
                <Navbar.Brand href="/" >
                    <Image style={{ height: "3.5rem" }} src={logo} ></Image>
                </Navbar.Brand>
                <Nav id="links" style={{ alignItems: "baseline", width: "35%" }}>
                    <Nav.Link href="/breakfast" style={window.location.href === "http://localhost:3000/get/breakfast" ? { color: "orange" } : { color: "darkgray" }}>BREAKFAST</Nav.Link>
                    <VscCircleFilled style={{ alignSelf: "center", color: "orange", marginLeft: "2%", marginRight: "2%" }} />
                    <Nav.Link style={window.location.href === "http://localhost:3000/get/brunch" ? { color: "orange" } : { color: "darkgray" }} href="/brunch">BRUNCH</Nav.Link>
                    <VscCircleFilled style={{ alignSelf: "center", color: "orange", marginLeft: "2%", marginRight: "2%" }} />
                    <Nav.Link style={window.location.href === "http://localhost:3000/get/lunch" ? { color: "orange" } : { color: "darkgray" }} href="/lunch">LUNCH</Nav.Link>
                    <VscCircleFilled style={{ alignSelf: "center", color: "orange", marginLeft: "2%", marginRight: "2%" }} />
                    <Nav.Link style={window.location.href === "http://localhost:3000/get/dinner" ? { color: "orange" } : { color: "darkgray" }} href="/dinner">DINNER</Nav.Link>
                </Nav>
                {!token
                    ? <Nav id="links">
                        <Nav.Link href="/login"><Button id="loginButton" >LOG IN</Button></Nav.Link>
                        <span style={{ alignSelf: "center", margin: "2%", color: "orange" }}>or</span>
                        <Nav.Link href="/register"><Button id="createAccount">CREATE ACCOUNT</Button></Nav.Link>
                    </Nav>

                    : <Nav id="links" style={{ textDecoration: "underline", textUnderlineOffset: "18%", textDecorationThickness: "2px", fontSize: "16px" }}>
                        <Nav.Link href="/myrecipes" style={{ color: "rgb(171, 216, 8)", alignSelf: "center", textDecorationColor: "darkgray" }}>MY RECIPES</Nav.Link><VscCircleFilled style={{ alignSelf: "center", color: "GrayText" }} />
                        <Nav.Link href="/myprofile" style={{ color: "orange", textDecorationColor: "darkgray" }}>MY PROFILE</Nav.Link><VscCircleFilled style={{ alignSelf: "center", color: "GrayText" }} />
                        <Nav.Link href="/" onClick={() => localStorage.removeItem("token")} style={{ color: "darkgray" }}>LOG OUT</Nav.Link>
                    </Nav>
                }
            </Container>
        </Navbar>
    )
}
export default Header;