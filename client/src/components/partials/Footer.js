import React from "react";
import { Nav, Navbar, Container, Image } from 'react-bootstrap';
import { AiOutlineCopyrightCircle, VscCircleFilled } from "react-icons/all";
import logoFooter from '../../assets/logoImages/BabysFooter.png'


function Footer() {
    return (
        <Navbar id='footer_nav' style={{ marginTop: "10%", height: "12rem", backgroundColor: "rgb(75, 75, 75)" }} >
            <Container id="footer">
                <Navbar.Brand href="/">
                    <Image style={{ height: "2.5rem", margin: "5%" }} src={logoFooter} />
                </Navbar.Brand>
                <Nav id="footerLinks" style={{ alignItems: "baseline", width: "40%" }}>
                    <Nav.Link id='footerColor' href="/breakfast">BREAKFAST</Nav.Link><VscCircleFilled style={{ alignSelf: "center", color: "white", marginLeft: "2%", marginRight: "2%" }} />
                    <Nav.Link id='footerColor' href="/brunch">BRUNCH</Nav.Link><VscCircleFilled style={{ alignSelf: "center", color: "white", marginLeft: "2%", marginRight: "2%" }} />
                    <Nav.Link id='footerColor' href="/lunch">LUNCH</Nav.Link><VscCircleFilled style={{ alignSelf: "center", color: "white", marginLeft: "2%", marginRight: "2%" }} />
                    <Nav.Link id='footerColor' href="/dinner">DINNER</Nav.Link>
                </Nav>
                <span style={{ color: "white", textAlign: "end" }}>Baby's Food Place<br /> copyright <sup><AiOutlineCopyrightCircle /></sup> 2021</span>
            </Container>
        </Navbar>
    )
}
export default Footer;