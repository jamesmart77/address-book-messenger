import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Button, Container } from 'react-materialize';
import * as userActions from '../../store/user/actions';
import * as responseHandlerActions from '../../store/responseHandler/actions';
import SweetAlert from 'sweetalert2-react';
import * as EmailValidator from 'email-validator';
import LoadingSpinner from '../../components/LoadingSpinner';
import { states } from '../../utils/helpers';
import CreateUserForm from '../../components/users/CreateUserForm';

export class CreateUser extends Component {
    state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: null,
            isPublic: true,
            address: '',
            state: '',
            zipcode: null,
            passwordConfirm: '',
            showModal: false,
            isLoading: false
        }

    componentDidMount(){
        this.isUserLoggedIn();
    }

    componentDidUpdate(){
        this.isUserLoggedIn();
    }

    isUserLoggedIn = async() => {
        if (this.props.currentUser.email !== '' && !this.props.loginUnauthorized) {
            this.props.history.push('/users');
        }
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });

        if(name === 'email' && EmailValidator.validate(value)) {
            this.handleEmailValidation(value);
        }
    };

    handleEmailValidation = (address)  => {
        this.props.userActions.emailAddressValidation(address);
    }


    handleReset = () => {
        this.props.responseHandlerActions.reset();
    }

    handleSubmitBug = () => {
        let win = window.open("https://github.com/jamesmart77/address-book-messenger/issues", "_blank")
        win.focus();
        this.handleReset();
    }

    phoneIsValid = () => {
        let regEx = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
        return this.state.phone.match(regEx);
    }

    isValidState = () => {
        let filteredState = states.filter(state => state === this.state.state);
        return filteredState.length > 0;
    }

    isValidZip = () => {
        const { zipcode } = this.state;
        return (
            typeof zipcode === 'number' && zipcode.toString().length === 5
        )
    }

    handleCreateUser = async() => {
        const { firstName,
            lastName,
            email,
            password,
            isPublic,
            phone,
            address,
            state,
            zipcode,
            passwordConfirm } = this.state;
            
        if( firstName === '' ||
            lastName === '' ||
            email === '' ||
            password === '' ||
            passwordConfirm=== '' ||
            !this.phoneIsValid() ||
            address === '' ||
            !this.isValidState() ||
            !this.isValidZip() ||
            !EmailValidator.validate(email) ||
            !this.props.isEmailAvailable ||
            (password !== passwordConfirm)) {
                this.setState({ showModal: true });
        } else {
            const newUser = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                isPublic: isPublic,
                phone: phone,
                address: address,
                state: state,
                zipcode: zipcode,
            }
            try {
                this.setState({ isLoading: true });
                await this.props.userActions.createUser(newUser);
            } catch {
                this.setState({ isLoading: false });
            }
        }
    }

    render() {
        const { isEmailAvailable, loginUnauthorized } = this.props;
        const htmlText = "<div>Some of the information provided seems to invalid. Verify the following and try again.<ul> " +
        "<li>All fields are populated</li><li>Email is properly formatted</li><li>Email is available (check mark)</li>" + 
        "<li>Passwords match</li></ul></div>";
        
        if(this.state.isLoading){
            return <LoadingSpinner/>
        } else {
            return (
                <div className='user-creation-container'>
                    <Container>
                        <SweetAlert
                            show={this.state.showModal}
                            type='error'
                            title='Whoops!'
                            html={htmlText}
                            onConfirm={() => this.setState({ showModal: false })}
                        />
                        <SweetAlert
                            show={loginUnauthorized}
                            type='error'
                            title='Error'
                            text='An error occurred when creating your account. Please retry and if problem persists submit a bug on GitHub.'
                            onConfirm={this.handleReset}
                            showCancelButton={true}
                            cancelButtonText='Submit Bug'
                            onCancel={this.handleSubmitBug}

                        />
                        <h5 className='header center'>Welcome to GroupComm!</h5>
                        <div className='header-subtext'>
                            <p>
                                Please provide the following to create your account. These details will be used
                                by others to search and add you to groups. Your informtion is safe - we'll
                                just use it to create an awesome experience! 
                            </p>
                        </div>
                        <CreateUserForm 
                            isEmailAvailable={isEmailAvailable}
                            state={this.state}
                            handleChange={this.handleChange}
                        />
                        <Row s={9}>
                            <Button s={9} className='primary-button' onClick={this.handleCreateUser}>Create Account</Button>
                        </Row>
                    </Container>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        isEmailAvailable: state.isEmailAvailable,
        loginUnauthorized: state.loginUnauthorized,
    }
}

function mapDispatchToProps(dispatch){
    return {
        userActions: bindActionCreators(userActions, dispatch),
        responseHandlerActions: bindActionCreators(responseHandlerActions, dispatch),
    }
}

CreateUser.propTypes = {
    currentUser: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    isEmailAvailable: PropTypes.bool,
    loginUnauthorized: PropTypes.bool,
    history: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);