import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Input, Button, Container, Icon, Chip, Col } from 'react-materialize';
import * as userActions from '../../store/user/actions';
import * as groupActions from '../../store/group/actions';
import * as responseHandlerActions from '../../store/responseHandler/actions';
import SweetAlert from 'sweetalert2-react';
import LoadingSpinner from '../../components/LoadingSpinner';
import Unauthorized from '../../components/Unauthorized';

export class CreateGroup extends Component {
    state = {
        name: '',
        showModal: false,
        isLoading: true,
        createSuccess: false
    }

    componentWillMount(){
        this.userValidation();
    }

    userValidation = async () => {
        await this.props.userActions.userAuthentication();
        this.setState({ isLoading: false })
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };

    handleReset = () => {
        this.props.responseHandlerActions.reset();
    }

    handleCreateGroup = async () => {
        const { name } = this.state;
        if( name === '' ) {
                this.setState({ showModal: true });
        } else {
            const newGroup = {
                usersId: this.props.currentUser.id,
                name: name
            }
            try {
                this.setState({ isLoading: true });
                await this.props.groupActions.createGroup(newGroup);
                this.setState({ 
                    isLoading: false,
                    createSuccess: true 
                });
            } catch {
                this.setState({ isLoading: false });
            }
        }
    }

    render() {
        const { isAuthenticated, currentUser } = this.props;
    
        if(this.state.isLoading){
            return <LoadingSpinner/>
        } else {
            if(currentUser.phone === '' || !isAuthenticated){
                return <Unauthorized/>
            } else {
                return (
                    <div className='group-creation-container'>
                        <Container>
                            <SweetAlert 
                                show={this.state.show}
                                title="Whoops!"
                                type='error'
                                text='A group name is required. Please add one before proceeding.'
                                onConfirm={() => this.setState({ showModal: false })}
                            />
                            <SweetAlert 
                                show={this.state.createSuccess}
                                title="Success"
                                type='success'
                                onConfirm={() => this.props.history.push("/users")}
                            />
                            <h5 className='header-style header center'>Let's Make A New Group</h5>
                            <div className='header-style header-subtext'>
                                <p>
                                    Go ahead and name your group! No pressure to add people yet, but if you already know some then go for it!
                                </p>
                            </div>
                            <Row>
                                <Col m={6} s={10} offset='m3 s1'>
                                    <Input s={12}
                                        type="text" 
                                        label="Group Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                    />                                
                                </Col>
                            </Row>
                            <Row>
                                <Col s={8} offset='s2'>
                                    <Button className='primary-button' onClick={this.handleCreateGroup}>Create Group</Button>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        loginUnauthorized: state.loginUnauthorized,
    }
}

function mapDispatchToProps(dispatch){
    return {
        userActions: bindActionCreators(userActions, dispatch),
        groupActions: bindActionCreators(groupActions, dispatch),
        responseHandlerActions: bindActionCreators(responseHandlerActions, dispatch),
    }
}

CreateGroup.propTypes = {
    currentUser: PropTypes.object,
    isAuthenticated: PropTypes.bool,
    loginUnauthorized: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);