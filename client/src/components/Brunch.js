import React from "react";
import {Container} from 'react-bootstrap';
import CardRecipe from "./CardRecipe";

function Brunch(){
    return(
        <div className="HomePage">
        <Container>
            <div className="Breakfast">
                <h3>Brunch</h3>
                <CardRecipe />
            </div>
        </Container>
    </div>
    )
}
export default Brunch;