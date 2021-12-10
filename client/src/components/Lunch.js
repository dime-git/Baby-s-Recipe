import React from "react";
import { Container } from 'react-bootstrap';
import CardRecipe from "./CardRecipe";

function Lunch() {

    return (

        <div className="HomePage">
            <Container>
                <div className="Breakfast">
                    <h3>Lunch</h3>
                    <section>
                        <CardRecipe />
                    </section>
                </div>
            </Container>
        </div>
    )
}
export default Lunch;