import React from "react";
import { Container, Row, Button } from 'react-materialize';
import PropTypes from 'prop-types';

function Unauthorized(props){
    return(
        <Container className='unauthorized-container'>
            <Row>
                <h3 className='center'>Unauthorized</h3>
                <p className='center'>
                    You do not have access to this view or modify this content...
                </p>
                    <Button className='primary-button' onClick={props.handleReset}>My Account</Button>
            </Row>
        </Container> 
    )
}

Unauthorized.propTypes = {
    handleReset: PropTypes.func
};

export default Unauthorized;