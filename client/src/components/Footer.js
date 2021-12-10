import React from 'react';
import { Nav, Navbar, Container, Image } from 'react-bootstrap';


function Footer() {
    return (
        <Navbar bg="dark" variant="dark" style={{ marginTop: "10%", height: "13rem" }} >
            <Container>
                <Navbar.Brand href="/" >
                    <Image style={{ height: "5rem" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLmBMB7dtg5BUJANNhJt83KB2tnUwOLQ5ZuQ&usqp=CAU" />
                </Navbar.Brand>
                <Nav style={{ margin: "auto" }}>
                    <Nav.Link href="/breakfast">Breakfast</Nav.Link>
                    <Nav.Link href="/brunch">Brunch</Nav.Link>
                    <Nav.Link href="lunch">Lunch</Nav.Link>
                    <Nav.Link href="dinner">Dinner</Nav.Link>
                </Nav>
                <span style={{ color: "lightgray", textAlign: "end" }}>Baby' Place<br />copyright 2021</span>
            </Container>
        </Navbar>
    )
}
export default Footer;