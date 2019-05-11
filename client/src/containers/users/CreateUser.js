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
import { isValidPhoneNumber } from 'react-phone-number-input'

export class CreateUser extends Component {
    state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phone: null,
            isPublic: false,
            address: '',
            state: '',
            zipcode: null,
            passwordConfirm: '',
            showModal: false,
            isLoading: false,
            isValidPhone: true
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

    phoneChange = async (number) => {
        this.setState({phone: number})
        let isValid = await isValidPhoneNumber(number);

        this.setState({isValidPhone: isValid});

        if(isValid) {
            let cleanedNumber = number.substr(2);
            this.handlePhoneAvailability(cleanedNumber);
        } 
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        
        if(name === 'isPublic'){
            this.setState({
                [name]: !this.state.isPublic
            });
        } else {
            this.setState({
                [name]: value
            });
        }
    };

    handlePhoneAvailability = (number)  => {
        this.props.userActions.isPhoneAvailable(number);
    }


    handleReset = () => {
        this.props.responseHandlerActions.reset();
    }

    handleSubmitBug = () => {
        let win = window.open("https://github.com/jamesmart77/address-book-messenger/issues", "_blank")
        win.focus();
        this.handleReset();
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
            password === '' ||
            passwordConfirm=== '' ||
            await isValidPhoneNumber(phone) ||
            !this.props.isPhoneAvailable ||
            address === '' ||
            !this.isValidState() ||
            !this.isValidZip() ||
            (email.length > 0 && !EmailValidator.validate(email)) ||
            (password !== passwordConfirm)) {
                this.setState({ showModal: true });
        } else {
            let cleanedNumber = phone.substr(2);
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
        const { isPhoneAvailable, loginUnauthorized } = this.props;
        const htmlText = "<div>Some of the information provided seems to invalid. Verify the following and try again.<ul> " +
        "<li>All fields are populated</li><li>Email is properly formatted</li><li>Phone number is available (check mark)</li>" + 
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
                        <h4 className='header center'>Welcome to GroupComm!</h4>
                        <div className='header-subtext'>
                            <p>
                                Please provide the following to create your account. These details are to help connect
                                and communicate in the group communities. We believe your informtion is safe - we'll
                                just use it to create an awesome experience for you! 
                            </p>
                        </div>
                        <CreateUserForm 
                            isPhoneAvailable={isPhoneAvailable}
                            state={this.state}
                            handleChange={this.handleChange}
                            phoneChange={this.phoneChange}
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
        isPhoneAvailable: state.isPhoneAvailable,
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
    isPhoneAvailable: PropTypes.bool,
    loginUnauthorized: PropTypes.bool,
    history: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);