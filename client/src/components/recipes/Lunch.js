import React, { useEffect, useState} from "react";
import { Container, Col, Row, Card, } from 'react-bootstrap';
import { BsPeopleFill, GrView, AiOutlineClockCircle } from 'react-icons/all';
import Modal from './Modal';

import { API } from '../../constants/ApiConstant';

function Lunch() {
    const [recipes, setRecipes] = useState([]);

    function lunch() {

        fetch(API.root + '/recipes/get/lunch')
            .then(res => res.json())
            .then(data => {
                setRecipes(data.recipes)
            })
            .catch(err => alert(err));
    }
    useEffect(() => {
        lunch();
    }, [])

    return (
        <div className="Lunch">
            <Container>
                <Row >
                    <Row><h2 id='pageTitle'>Lunch</h2></Row>
                    {recipes.map(recipe => {
                        return (
                            <Col xs={4} key={recipe._id}>
                                <Card  >
                                    <Card.Img variant="top" src={`http://localhost:5000/${recipe.image}`} />
                                    <div id='category_recipe'> {recipe.category} </div>
                                    <Card.Body>
                                        <Card.Title id='card_title'>{recipe.title}</Card.Title>
                                        <Card.Text id='card_text'>
                                            {recipe.short_description}
                                        </Card.Text>
                                        < AiOutlineClockCircle />{recipe.preparation_time}
                                        <BsPeopleFill /> {recipe.number_of_people}
                                        <GrView /> {recipe.seen}
                                        <Modal recipe={recipe} />
                                    </Card.Body>
                                </Card>
                            </Col>)
                    })}
                </Row>
                </Container>
        </div>
    )
}

export default Lunch;