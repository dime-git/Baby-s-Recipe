import React from 'react';
import {Form, Col, Row, Container, Image, Button} from 'react-bootstrap';

function MyProfile() {
    
    return (
        <div className='myprofile'>
            <div className='formaProfile'>
            <Container>
                 <Row>
                 <Row>
                        <Col>
                            <h3>My Profile</h3>
                        </Col>
                    </Row>
                        <Col xs={6} md={4}>
                            <Col>
                            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0g8R5VmgqDqpRCwQfw2Y9V-DM-iXS59R9hQ&usqp=CAU" roundedCircle style={{ width: '171px' }, { height: '180px' }} />
                            </Col>
                            <br/>
                            <Col>
                           <Button variant="outline-secondary">CHANGE AVATAR</Button>
                            </Col>
                        </Col>
                        <Col xs={12} md={8}>
                            <div className="formaAccount"  >
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control placeholder="First Name" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                                <Form.Label>Last Name</Form.Label>
                                                <Form.Control placeholder="Last Name" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formGroupEmail">
                                                <Form.Label>Email address</Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Col} controlId="formGridDOB">
                                            <Form.Label>Birthday</Form.Label>
                                            <Form.Control type="date" />
                                        </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Col} controlId="formGridPassword">
                                                <Form.Label>Repeat Password</Form.Label>
                                                <Form.Control type="password" placeholder="Password" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col>
                                            <Button variant="success" >Save</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
export default MyProfile;