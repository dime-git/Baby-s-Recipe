import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Card, } from 'react-bootstrap';
import { BsPeopleFill, GrView, AiOutlineClockCircle } from 'react-icons/all';
import Modal from './Modal';
import { API } from '../../constants/ApiConstant';

function Home() {
    const [Most_popular, setMostPopular] = useState([]);
    const [Fresh_new, setFreshNew] = useState([]);

    function homePage() {

        fetch(`${API.root}/users/`)
            .then(res => {
                return res.json()
            })
            .then(data => {
                setMostPopular(data.most_popular)
                setFreshNew(data.fresh_new)
            })
            .catch(error => alert(error));
    }
    useEffect(() => {
        homePage();
    }, [])


    return (
        <div className="HomePage">
            <Container >
                <Row >
                    <Row><h3 id='pageTitle'>Fresh & New</h3></Row>
                    {Fresh_new.map(recipe => {
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
                <div className="MostPopular">
                    <Row >
                        <Row><h3 id='pageTitle' >Most Popular Recipes</h3></Row>
                        {Most_popular.map(recipe => {
                            return (
                                <Col xs={4} key={recipe._id}>
                                    <Card id='card'>
                                        <Card.Img variant="top" src={`http://localhost:5000/${recipe.image}`} />
                                        <div id='category_recipe'> {recipe.category} </div>
                                        <Card.Body>
                                            <Card.Title id='card_title'>{recipe.title}</Card.Title>
                                            <Card.Text id='card_text'>
                                                {recipe.short_description}
                                            </Card.Text>
                                            <AiOutlineClockCircle /> {recipe.preparation_time}
                                            <BsPeopleFill /> {recipe.number_of_people}
                                            <GrView /> {recipe.seen}
                                            <Modal recipe={recipe} />
                                        </Card.Body>
                                    </Card>
                                </Col>)
                        })}
                    </Row>
                </div>
            </Container>
        </div>
    )
}
export default Home;
