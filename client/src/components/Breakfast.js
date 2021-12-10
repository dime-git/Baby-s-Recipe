import React from "react";
import {Container} from 'react-bootstrap';
import CardRecipe from "./CardRecipe";


function Breakfast() {
    return (
        <div className="HomePage">
            <Container>
                <div className="Breakfast">
                    <h3>Breakfast</h3>
                    <CardRecipe />
                </div>
            </Container>
        </div>
    )
}
export default Breakfast;