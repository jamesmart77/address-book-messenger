import React from "react";
import { Row, Col, Preloader } from 'react-materialize';

function LoadingSpinner () {

    return(
        <div className='loading-container'>
            <Row>
                <Col s={12}>
                    <Preloader className='loading-spinner' flashing/>
                </Col>
            </Row>
        </div> 
    )
}

export default LoadingSpinner;
