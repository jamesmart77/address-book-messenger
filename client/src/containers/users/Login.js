import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input, Row, Container, Button, Col } from 'react-materialize';
import LoadingSpinner from '../../components/LoadingSpinner';
import * as userActions from '../../store/user/actions';
import * as responseHandlerActions from '../../store/responseHandler/actions';
import SweetAlert from 'sweetalert2-react';
import { Link } from 'react-router-dom';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

export class Login extends Component {

    state = {
        phone: '',
        password: '',
        isLoggingIn: false,
        isValidPhone: true
    }

    componentDidMount = () => {
        this.isUserLoggedIn();
    }

    componentDidUpdate = () => {
        this.isUserLoggedIn();
    }

    isUserLoggedIn = () => {
        if (this.props.currentUser.phone !== '' && !this.props.loginUnauthorized) {
            this.props.history.push('/users');
        }
    }

    handleRedirect =() => {
        if (this.props.history) {
            this.props.history.push('/users/create');
        }
    }

    handleLogin = async () => {
        try {
            this.setState({ isLoggingIn: true });
            const phone = this.state.phone.replace('+1', '');
            await this.props.userActions.loginCurrentUser(phone, this.state.password);
        } catch (error) {
            console.log("Login Error: ", error);
            this.setState({ isLoggingIn: false });
        }
    }

    handleChange = (event)  => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    phoneChange = async(number) => {
        let isValidPhone = await isValidPhoneNumber(number);
        this.setState({
            phone: number,
            isValidPhone: isValidPhone
        })
    };

    handleReset =() => {
        this.props.responseHandlerActions.reset();
    }

    render() {
        const { loginUnauthorized } = this.props;
        console.log("Login Authorization: ", loginUnauthorized);
        
        return (
            <div className='login-container'>
                <Container>
                    <SweetAlert 
                        show={loginUnauthorized}
                        type='error'
                        title='Login Attempt Failed'
                        text='The provided phone number and/or password were incorrect. Please try again.'
                        onConfirm={() => this.handleReset()}
                    />
                    {this.state.isLoggingIn ?
                        <LoadingSpinner/>
                    :
                        <div>
                            <h4 className='header-style header center'>Login to Your Account</h4>
                            <Row l={4} m={6} s={10}>
                                <PhoneInput
                                    className={!this.state.isValidPhone ? 'invalid-phone phone-input' : 'phone-input'}
                                    country="US"
                                    placeholder='(555) 123-4567'
                                    value={this.state.phone}
                                    error={ !this.state.isValidPhone && 'Please format as: (555) 123-4567'}
                                    onChange={this.phoneChange} />
                                <Input s={12}
                                    type="password" 
                                    label="password" 
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                            </Row>
                            <Row>
                                <Col l={8} s={12} offset='l2'>
                                    <Button className='primary-button' s={9} onClick={this.handleLogin}>Login</Button>
                                    <div className='new-account center'>
                                        <Link to='/users/create'>Create New Account</Link>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    }
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        loginUnauthorized: state.loginUnauthorized
    }
}

function mapDispatchToProps(dispatch){
    return {
        userActions: bindActionCreators(userActions, dispatch),
        responseHandlerActions: bindActionCreators(responseHandlerActions, dispatch),
    }
}

Login.propTypes = {
    currentUser: PropTypes.object,
    loginUnauthorized: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);