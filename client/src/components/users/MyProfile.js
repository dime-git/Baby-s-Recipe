import React, { useEffect, useState } from 'react';
import { Form, Col, Row, Container, Button, Image } from 'react-bootstrap';
import { API } from '../../constants/ApiConstant';
const bcrypt = require("bcryptjs");

function MyProfile() {
    const [image, setImage] = useState(null);
    const [first_name, setFirst_Name] = useState("");
    const [last_name, setLast_Name] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [repeat_password, setRepeat_Password] = useState("");

    function imageUpload(e) {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    function MyUser() {
        fetch(`${API.root}/users/myprofile`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.status === 401) {
                    alert('Token has expired!');
                    localStorage.removeItem('token');
                    window.location = '/login'
                }
                return res.json();
            })
            .then(data => {
                setFirst_Name(data.user.first_name)
                setLast_Name(data.user.last_name)
                setEmail(data.user.email)
                setBirthday(data.user.birthday)
                if (data.user.image === "https://www.vecteezy.com/vector-art/1993889-beautiful-latin-woman-avatar-character-icon") {
                    setImage(data.user.image)
                } else {
                    setImage(`${API.root}/${data.user.image}`)
                }
            }
            )
    }
    useEffect(() => {
        MyUser();
    }, [])

    function updateUser(e) {
        e.preventDefault();

        const dataForm = new FormData();
        const imageUpl = document.querySelector('input[type="file"]');

        dataForm.append('image', imageUpl.files[0]);
        dataForm.append('first_name', first_name);
        dataForm.append('last_name', last_name);
        dataForm.append('email', email);
        dataForm.append('birthday', birthday);


        if (repeat_password === password) {
            if (password !== "") {
                dataForm.append('password', bcrypt.hashSync(password));
            } try {
                fetch(`${API.root}/users/update`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: dataForm
                })
                    .then(res => {
                        if (res.status === 401) {
                            alert("Token expired");
                            localStorage.removeItem("token");
                            window.location = "/login";
                        }
                        return res.json();
                    })
                    .then(data => {
                        if (data.error === false) {
                            alert(data.message);
                            window.location.reload();
                        } else {
                            alert(data.message);
                        }
                    })
            }
            catch { alert("We came to a problem") }
        } else {
            alert("Passwords doesn't match");
        }
    }

    return (
        <Container >
            <Row><h3 id="pageTitle">My Profile</h3></Row>
            <Form onSubmit={updateUser} >
                <Row>
                    <Col sm={2}>
                        <Row >
                            <Form.Label></Form.Label>
                            <Image src={image}  roundedCircle />
                        </Row>
                        <Row >
                            <Button id='' onClick={() => document.getElementById("fileinput").click()}  variant="outline-secondary">CHANGE AVATAR</Button>
                            <Form.Control id="fileinput" onChange={imageUpload} type="file" accept="image/*" />
                        </Row>
                    </Col>
                    <Col>
                        <Row className="mb-4" >
                            <Col  >
                                <Form.Label id="inputLabel">First Name</Form.Label>
                                <Form.Control required id="inputFieldFirstName" onChange={(e) => setFirst_Name(e.target.value)} value={first_name} type="text" />
                            </Col>
                            <Col  >
                                <Form.Label id="inputLabel">Last Name</Form.Label>
                                <Form.Control id="inputFieldLastName" required onChange={(e) => setLast_Name(e.target.value)} value={last_name} type="text" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col  >
                                <Form.Label id="inputLabel">Email</Form.Label>
                                <Form.Control id="inputFieldEmail" required onChange={(e) => setEmail(e.target.value)} value={email} type="email" />
                            </Col>
                            <Col   >
                                <Form.Label id="inputLabel">Birthday</Form.Label>
                                <Form.Control id="inputFieldBirthday" required onChange={(e) => setBirthday(e.target.value)} value={birthday} type="date" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col  >
                                <Form.Label id="inputLabel">Password</Form.Label>
                                <Form.Control id="inputFieldPassword" onChange={(e) => setPassword(e.target.value)} placeholder="******" value={password} type="password" />
                            </Col>
                            <Col  >
                                <Form.Label id="inputLabel">Repeat password</Form.Label>
                                <Form.Control id="repeat_password" onChange={(e) => setRepeat_Password(e.target.value)} value={repeat_password} placeholder="******" type="password" />
                            </Col>
                            <Row >
                                <Button type="submit" id="greenButton" variant="success">SAVE</Button>
                            </Row>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}
export default MyProfile;