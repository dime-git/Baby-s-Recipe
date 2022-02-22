import React from "react";
import { Card, Button, Modal, Col, Row } from "react-bootstrap";
import { ChevronDoubleRight } from "react-bootstrap-icons";
import { BsPeopleFill, GrView, AiOutlineClockCircle } from 'react-icons/all'
import PropTypes from 'prop-types';
import { API } from "../../constants/ApiConstant";

function ModalWindow(props) {


    const recipe = props.recipe;

    function ModalView(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header id='modalHeader' closeButton >
                    <Modal.Title id="modalTitle" >
                        {recipe.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Row>
                        <Col xs={8} md={4} >
                            <Card.Img variant="top" src={`http://localhost:5000/${recipe.image}`} />
                            <Card.Title id='best_served_for'>Best Served For<span id='span_id'>{recipe.category.toLowerCase()}</span></Card.Title>
                            <Card.Text id='card_text_modal'>
                                {recipe.short_description}
                            </Card.Text>
                            <AiOutlineClockCircle /> {recipe.preparation_time}
                            <BsPeopleFill /> {recipe.number_of_people}
                            <GrView /> {recipe.seen}
                        </Col>
                        <Col xs={10} md={8} style={{ paddingLeft: "7%" }}>
                            <Card.Title id='best_served_for'>Recipe Details</Card.Title>
                            <Card.Text id='card_text_modal' >
                                {recipe.content}
                            </Card.Text>
                        </Col>
                    </Row>


                </Modal.Body>
            </Modal>
        );
    }
    function seenRecipe() {
        fetch(`${API.root}/recipes/getrecipes/${recipe._id}`)
            .then(res => res.json())
            .catch(error => alert(error))
    }
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
            <Button id='button_style_modal' variant="success" onClick={() => { setModalShow(true); seenRecipe(); }}>
                <ChevronDoubleRight />
            </Button>
            <ModalView
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}
ModalWindow.propTypes = {
    recipe: PropTypes.object.isRequired
}

export default ModalWindow;