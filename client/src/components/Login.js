import React from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';


function Login(){

    return(
        <div className="Login" >
        <Container>
            <Row className="g-2">
                <Row>
                <Col md>
                    <h3>Log In</h3>
                    </Col>
                    </Row>
                    <Col md>
                    <div className="textLogin" >
                        <h4>Welcome to Baby's</h4>
                        <p>All the Lorem Ipsum generations on the Internet tend to repeat predefined chunks as necessary, making this the first true generation on the Internet. It uses a dictionary of over 200 Latin words, combinet with a handful of model sentence structures, to generate Lorem Ipsum ehich looks reasonable. The generated Lorem Isum is therefore always free from repetition, injected humour, or non - characteristic words etc. </p>
                    </div>
                </Col>
                <Col md>
                    <div className="formLogin"  >
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="success" href='/myProfile'>Log In</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
    )
}
export default Login;