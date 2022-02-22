import React, { useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { API } from '../../constants/ApiConstant';
const bcrypt = require("bcryptjs");

function Account() {
    const [first_name, setFirst_Name] = useState('');
    const [last_name, setLast_Name] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [password, setPassword] = useState('');
    const [repeat_password, setRepeat_Password] = useState('');

    const HandleSubmitClick = (e) => {
        e.preventDefault();
        const register = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            birthday: birthday,
            password: bcrypt.hashSync(password)
        }
        if (password === repeat_password) {
            fetch(`${API.root}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(register)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error === false) {
                        alert(data.message)
                        const redirect = () => {
                            window.location = "/login"
                        }
                        redirect()
                    } else {
                        alert(data.message)
                    }
                })
                .catch(err => alert(err))
        } else { alert("Passwords don't match") }
    }
    return (
        <Container id="container">
            <Row ><h3 id="pageTitle">Create Account</h3></Row>
            <Row>
                <Col >
                    <h1>Create your <div >account</div></h1>
                    <div >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
                        Lorem, ipsum dolor sit ametaaaaa asd asd consectetur aaaaaaaaaa aaaaaaaa adipisicing elit. Molestias aut, repellat ipsum facere voluptate dicta obcaecati deserunt nobis suscipit eaque?
                    </div>
                </Col>
                <Col>
                    <Form onSubmit={HandleSubmitClick} >
                        <Row className="mb-3">
                            <Col>
                                <Form.Label id="inputLabel">First Name</Form.Label>
                                <Form.Control id="inputFieldFirstName" required onChange={(e) => setFirst_Name(e.target.value)} value={first_name} placeholder="First name" type="text" />
                            </Col>
                            <Col>
                                <Form.Label id="inputLabel">Last Name</Form.Label>
                                <Form.Control id="inputFieldLastName" required onChange={(e) => setLast_Name(e.target.value)} value={last_name} placeholder="Last name" type="text" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Form.Label id="inputLabel">Email</Form.Label>
                                <Form.Control id="inputField" required onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="admin@babys.com" />
                            </Col>
                            <Col>
                                <Form.Label id="inputLabel">Birthday</Form.Label>
                                <Form.Control id="inputField" required onChange={(e) => setBirthday(e.target.value)} value={birthday} type="date" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Form.Label id="inputLabel">Password</Form.Label>
                                <Form.Control id="inputField" required onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="*****" />
                            </Col>
                            <Col>
                                <Form.Label id="inputLabel">Repeat password</Form.Label>
                                <Form.Control id="confirmPW" required onChange={(e) => setRepeat_Password(e.target.value)} value={repeat_password} type="password" placeholder="*****" />
                            </Col>
                        </Row>
                        <Button type="submit" id="greenButton" variant="success">CREATE ACCOUNT</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
export default Account;
