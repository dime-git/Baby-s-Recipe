import React from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { amber } from '@mui/material/colors';
import Icon from '@mui/material/Icon';

function myRecipes() {
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h3>My recipes</h3>
                    </Col>
                    <Col  align = 'end'>
                    <Button variant="link" href='/createRecipe' ><Icon sx={{ color: amber[700] }}>add_circle</Icon></Button>
                    </Col>
                </Row>
                <Row>
                    <div>
                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th>Recipe Name</th>
                                    <th>Category</th>
                                    <th>Created On</th>
                                    <th colSpan='3'></th>
                                    <th></th>
                                    <th style={{ textAlign: "right" }}>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>

                                    <td><a href = '/createRecipe' style= {{textDecoration: 'none'}}>Table cell</a></td>
                                    <td>Table cell</td>
                                    <td>Table cell</td>
                                    <td colSpan='3'></td>
                                    <td></td>
                                    <td style={{ textAlign: "right" }}> <Button variant="link" style={{color: 'gray'}}><i class="bi bi-trash" ></i></Button></td>
                                </tr>

                            </tbody>
                        </Table>
                    </div>
                </Row>

            </Container>
        </div>
    )
}

export default myRecipes;