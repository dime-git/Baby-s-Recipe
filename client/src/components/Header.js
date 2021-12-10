import React from 'react';
import { Nav,Navbar, Container, Image, Button } from 'react-bootstrap';

function Header() {

    return (
        <Navbar style={{marginBottom:"2%"}} variant="light">
            <Container>
                <Navbar.Brand href="/" >
                <Image style={{height:"7rem"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLmBMB7dtg5BUJANNhJt83KB2tnUwOLQ5ZuQ&usqp=CAU"/>
                </Navbar.Brand>
                <Nav style={{margin:"auto"}}>
                    <Nav.Link href="/breakfast">Breakfast</Nav.Link>
                    <Nav.Link href="/brunch">Brunch</Nav.Link>
                    <Nav.Link href="/lunch">Lunch</Nav.Link>
                    <Nav.Link href="/dinner">Dinner</Nav.Link>
                </Nav>
                <Nav.Link href="/login"><Button variant="outline-secondary">Log in</Button></Nav.Link>
                    <span style={{alignSelf:"center"}}>or</span> 
                <Nav.Link href="/register"><Button variant="success">Create Account</Button></Nav.Link>
            </Container>
        </Navbar>
    )
}
export default Header;