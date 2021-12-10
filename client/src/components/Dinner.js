import React from "react";
import {Container} from 'react-bootstrap';
import CardRecipe from "./CardRecipe";

function Dinner(){

    return(
        <div className="HomePage">
            <Container>
                <div className="Dinner">
                    <h3>Dinner</h3>
                    <CardRecipe />
                </div>
            </Container>
        </div>
    )
}
export default Dinner;