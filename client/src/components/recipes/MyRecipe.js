import React, { useEffect, useState } from 'react';
import { Container, Row, Button, Col, Form, Image } from "react-bootstrap";
import { IoArrowUndoCircle } from "react-icons/io5";
import { API } from '../../constants/ApiConstant';
import { useParams } from "react-router-dom";

function MyRecipe() {
    const [image, setImage] = useState("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-keto-pizza-073-1544039876.jpg?crop=0.668xw:1.00xh;0.233xw,0.00255xh&resize=980:*");
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [preparation_time, setPreparation] = useState("");
    const [number_of_people, setPeople] = useState("");
    const [content, setContent] = useState("");
    const [short_description, setDescription] = useState("");

    function submitImage(e) {

        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 3) {
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    function seenRecipe() {
        fetch(`${API.root}/recipes/myrecipes/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                if (res.status === 401) {
                    localStorage.removeItem('token');
                    alert('Your token has expired!');
                    window.location = '/login'
                } else {
                    return res.json();
                }
            })
            .then(data => {
                setTitle(data.recipe.title)
                setCategory(data.recipe.category)
                setPreparation(data.recipe.preparation_time)
                setPeople(data.recipe.number_of_people)
                setContent(data.recipe.content)
                setDescription(data.recipe.short_description)
                if (data.recipe.image === "") {
                    setImage(data.recipe.image)
                } else {
                    setImage(`${API.root}/${data.recipe.image}`)
                }
            }
            )
            .catch(err => alert(err));
    }
    useEffect(() => {
        seenRecipe();
    }, [])

    function editRecipe(e) {
        e.preventDefault();

        const uploadImage = document.querySelector('input[type="file"]')
        const dataForm = new FormData();

        if (uploadImage !== null) {
            dataForm.append('image', uploadImage.files[0]);
        } else {
            dataForm.append('image', image);
        }
        dataForm.append('title', title);
        dataForm.append('category', category);
        dataForm.append('number_of_people', number_of_people);
        dataForm.append('content', content);
        dataForm.append('short_description', short_description);


        try {
            fetch(`${API.root}/recipes/myrecipes/${id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
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
                    if (data.err === false) {
                        alert(data.message);
                        window.location.reload();
                        console.log(data)
                    } else {
                        alert(data.message);
                    }
                })
        }
        catch { alert("Ooops something went wrong") }
    }
    return (
        <Container>
            <Row>
                <Col><h3 id='pageTitle'>My Recipes</h3></Col>
                <Col sm={1}><a href="/myrecipes"><IoArrowUndoCircle id='undoCircle' /></a></Col>
            </Row>
            <Form onSubmit={editRecipe} >
                <Row id='myRecipeRow'>
                    <Col sm={2}>
                        <Row id='rowMyRecipe'>
                            <Form.Label>Recipe Image</Form.Label>
                            <Image id='imageMyRecipe' src={image}  />
                            <Button id='buttonUploadImage' onClick={() => document.getElementById("fileinput").click()} variant="outline-secondary">UPLOAD IMAGE</Button>
                            <Form.Control id='formRecipeImage' type="file" onChange={submitImage} accept="image/*" id="fileinput"  />
                        </Row>
                    </Col>
                    <Col id='recipeTitleCol'sm={5}>
                        <Row className="mb-4">
                            <Form.Label id='inputLabel'>Recipe Title</Form.Label>
                            <Form.Control id="recipeTitle" onChange={(e) => setTitle(e.target.value)} value={title} type="text" />
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Form.Label id='inputLabel'>Category</Form.Label>
                                <Form.Select id="inputFieldCategory" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Default select example">
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Brunch">Brunch</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Label id='inputLabel'>Preparation Time</Form.Label>
                                <Form.Control id="inputField" onChange={(e) => setPreparation(e.target.value)} value={preparation_time} type="number" />
                            </Col>
                            <Col>
                                <Form.Label id='inputLabel'>No. People</Form.Label>
                                <Form.Control id="inputField" onChange={(e) => setPeople(e.target.value)} value={number_of_people} type="number" />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <Form.Label id='inputLabel'>Short Description</Form.Label>
                                <Form.Control id="inputField"
                                    as="textarea"
                                    rows="4"
                                    onChange={(e) => setContent(e.target.value)}
                                    value={content}
                                    type="text"
                                />
                            </Col>
                            <Row id='SaveMyRecipe' sm={5}>
                                <Button id='buttonSave' type="submit" id="greenButton" variant="success">SAVE</Button>
                            </Row>
                        </Row>
                    </Col>
                    <Col id='recipeDescription' sm={4}>
                        <Form.Label id='inputLabel'>Recipe</Form.Label>
                        <Form.Control id="inputField"
                            as="textarea"
                            rows="4"
                            onChange={(e) => setDescription(e.target.value)}
                            value={short_description}
                            type="text"
                        />
                    </Col>
                </Row>
            </Form >
        </Container >
    )

}
export default MyRecipe;