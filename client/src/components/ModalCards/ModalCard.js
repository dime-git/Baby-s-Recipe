import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import MyModalCardWithGrid from "./MyModalCard";


function ModalCard() {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button variant="success" onClick={() => setModalShow(true)}>
                <i class="bi bi-chevron-double-right"></i>
            </Button>

            <MyModalCardWithGrid show={modalShow} onHide={() => setModalShow(false)} />
        </>
    );
}

export default ModalCard;