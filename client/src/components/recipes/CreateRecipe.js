import React, { useState } from 'react';
import { API } from '../../constants/ApiConstant';
import { IoArrowUndoCircle } from "react-icons/all";
import { Container, Button, Row, Col, Form, Image } from "react-bootstrap";



function CreateRecipe() {
    const [image, setImage] = useState('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-keto-pizza-073-1544039876.jpg?crop=0.668xw:1.00xh;0.233xw,0.00255xh&resize=980:*');
    const [category, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [short_description, setDescription] = useState("");
    const [number_of_people, setPeople] = useState("");
    const [preparation_time, setPreparationTime] = useState("");
    const [content, setContent] = useState("");


    function submitImage(e) {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    function createRecipe(e) {
        e.preventDefault();

        const dataForm = new FormData();
        const uploadImage = document.querySelector('input[type="file"]')

        dataForm.append('image', uploadImage.files[0]);
        dataForm.append('category', category);
        dataForm.append('title', title);
        dataForm.append('number_of_people', number_of_people);
        dataForm.append('preparation_time', preparation_time);
        dataForm.append('short_description', short_description);
        dataForm.append('content', content);

        fetch(`${API.root}/recipes/create`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: dataForm
        })
            .then(res => {
                if (res.status === 401) {
                    alert('Token has expired');
                    localStorage.removeItem('token');
                    window.location = '/login'
                }
                return res.json();
            })
            .then(data => {
                alert(data.message)
                window.location = '/myrecipes'
            })
            .catch(err => alert(err))
    }


    return (
        <Container>
            <Row>
                <Col><h3 id="pageTitle">Create Recipe</h3></Col>
                <Col sm={1}><a href="/myrecipes"><IoArrowUndoCircle id='createButton' /></a></Col>
            </Row>
            <Form onSubmit={createRecipe} >
                <Row id='row_idk' style={{ marginTop: "7%" }}>
                    <Col sm={2}>
                        <Row id='recipe_image' >
                            <Form.Label id="inputLabel">Recipe Image</Form.Label>
                            <Image style={{ height: "100%", width: "100%", borderRadius: "7%" }} src={image} />
                            <Button id='buttonImage' onClick={() => document.getElementById("fileinput").click()} variant="outline-secondary">UPLOAD IMAGE</Button>
                            <Form.Control id='form_control' type="file" onChange={submitImage} accept="image/*" id="fileinput" />
                        </Row>
                    </Col>
                    <Col id='recipe_title_col' sm={5}>
                        <Row className="mb-4">
                            <Form.Label id="inputLabel">Recipe Title</Form.Label>
                            <Form.Control required id="inputField" placeholder="Your recipe name" onChange={(e) => setTitle(e.target.value)} value={title} type="text" style={{ width: "96%", margin: "auto" }} />
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Form.Label id="inputLabel">Category</Form.Label>
                                <Form.Select required value={category} id="inputField" onChange={(e) => setCategory(e.target.value)} aria-label="Default select example">
                                    <option value="">Select</option>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Brunch">Brunch</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Label id="inputLabel">Preparation Time</Form.Label>
                                <Form.Control required id="inputField" placeholder="60" onChange={(e) => setPreparationTime(e.target.value)} value={preparation_time} type="number" />
                            </Col>
                            <Col>
                                <Form.Label id="inputLabel">No. People</Form.Label>
                                <Form.Control required id="inputField" placeholder="4" onChange={(e) => setPeople(e.target.value)} value={number_of_people} type="number" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Form.Label id="inputLabel">Short Description</Form.Label>
                                <Form.Control id="inputField"
                                    as="textarea"
                                    rows="4"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                    style={{ resize: "none" }}
                                    type="text"
                                />
                            </Col>
                            <Row sm={5}>
                            <Button id='buttonSave' type="submit" id="greenButton" variant="success">SAVE</Button>
                            </Row>
                        </Row>
                    </Col>
                    <Col id='recipe_col' sm={4}>
                        <Form.Label id="inputLabel">Recipe</Form.Label>
                        <Form.Control id="inputField"
                            as="textarea"
                            rows="12"
                            value={short_description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            style={{ resize: "none" }}
                            type="text"
                        />
                    </Col>
                </Row>
            </Form >
        </Container >
    )
}
export default CreateRecipe;
