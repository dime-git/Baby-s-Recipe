import React, { useEffect, useState } from "react";
import { Container, Table, Row, Button, Col } from "react-bootstrap";
import { API } from '../../constants/ApiConstant';
import { BsFillPlusCircleFill } from "react-icons/all";


function MyRecipes() {
    const [recipes, setRecipes] = useState([]);

    function allRecipes() {
        fetch(`${API.root}/recipes/myrecipes`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(res => {
                if (res.status === 401) {
                    localStorage.removeItem("token");
                    alert("Token expired");
                    window.location = "/login";
                }
                else {
                    return res.json();
                }
            })
            .then(data => {
                setRecipes(data.recipes)
            })
            .catch(err => console.log(err))
    };
    useEffect(() => {
        allRecipes();
    }, [])

    function deleteRecipe(id) {
        fetch(`${API.root}/recipes/myrecipes/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            }
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
                if (data.err === true) {
                    alert(data.message)
                } else {
                    window.location.reload();
                }
            })
            .catch(err => { if (err) { console.log(err) } })
    }
    return (
        <Container>
            <Row>
                <Col><h3 id="pageTitle">My Recipes</h3></Col>
                <Col id='createRecipe' sm={1}><a href="/create"><BsFillPlusCircleFill id='createButton' /></a></Col>
            </Row>
            <Row id='myRecipesRow'>
                <Table >
                    <thead>
                        <tr >
                            <th>Recipe Name</th>
                            <th>Category</th>
                            <th>Created On</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody  >
                        {
                            recipes.map(recipe => {
                                return (
                                    <tr key={recipe._id}>
                                        <td><a href={`/myrecipes/${recipe._id}`}>{recipe.title}</a></td>
                                        <td>{recipe.category}</td>
                                        <td>{recipe.createdAt.slice(0, 10)}</td>
                                        <td><Button type="button" href="#" onClick={() => deleteRecipe(recipe._id)}><i className="bi bi-trash"></i></Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}
export default MyRecipes