import React, { useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { API } from '../../constants/ApiConstant';
const bcrypt = require('bcryptjs');

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const LogIn = (event) => {
        event.preventDefault();
        const login = {
            email: email
        }

        fetch(`${API.root}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        })
            .then(res => res.json())
            .then(data => {
                if (bcrypt.compareSync(password, `${data.password}`) && data.error === false) {
                    localStorage.setItem('token', data.token)
                    const redirect = () => {
                        window.location = "/myrecipes"
                    };
                    redirect();
                } else {
                    alert("Invalid credentials")
                }
            }
            )
            .catch(error => alert(error))
    }

    return (
        <Container >
            <Row><h3 id="pageTitle">Log in</h3></Row>
            <Row id='textLogin'>
                <Col id='coloneLogin'>
                    <h1 id='h1Login'>Welcome to <span id="container" >Baby's</span></h1>
                    <div id='divLogin'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
                    </div>
                </Col>
                <Col xs={4}>
                    <Form onSubmit={LogIn} style={{ width: "70%" }} >
                        <Form.Group className="mb-4">
                            <Form.Label >Email </Form.Label>
                            <Form.Control placeholdertextcolor="red" id="inputFieldEmail" required onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="admin@babys.com" />
                        </Form.Group>
                        <Form.Group className="mb-4" >
                            <Form.Label id="inputLabel">Password</Form.Label>
                            <Form.Control required id="inputFieldEmail" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
                        </Form.Group>
                        <Col>
                            <Button id="greenButton" type="submit" variant="success"><b>LOG IN</b></Button>
                        </Col>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
export default Login;