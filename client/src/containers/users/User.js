import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../store/user/actions';
import * as responseHandlerActions from '../../store/responseHandler/actions';
import Unauthenticated from '../../components/Unauthenticated';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Container, Row, Col, Card, Button, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';

export class User extends Component {
    state = {
        isLoading: true
    }

    componentWillMount(){
        this.userValidation();
    }

    userValidation = async () => {
        await this.props.userActions.userAuthentication();
        this.setState({ isLoading: false })
    }

    render() {
        const { isAuthenticated, currentUser, groupAdmins } = this.props;
        if (this.state.isLoading){
            return <LoadingSpinner/>
        }
        if(!isAuthenticated) {
            return <Unauthenticated/>
        } else {
            return (
                <Container className='user-container'>
                    <Row>
                        <Row>
                            <Col m={9} s={6}>
                                <h3 className='header-style header truncate'>Welcome {currentUser.firstName}!</h3>

                            </Col>
                            <Col m={3} s={6}>
                                <Button className='secondary-button right'
                                    onClick={() => this.props.history.push('/groups/create')}>
                                        Group
                                        <Icon right>add</Icon>
                                </Button>
                            </Col>  
                        </Row>
                        <Row>
                        </Row>
                        <Row>
                            <Col s={12}>
                                <h5 className='header-style sub-header'>Groups You Own</h5>
                            </Col>
                            {groupAdmins.length > 0 &&
                            groupAdmins.map(group => {
                                return (
                                    <Col m={4} s={10} offset='s1'>
                                        <Card key={"group-" & group.id}
                                                className='group-card' 
                                                title={group.name} 
                                                actions={[<Link to={`/groups/${group.id}`}>View</Link>]}>
                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Row>
                </Container>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        groupAdmins: state.groupAdmins,
        isAuthenticated: state.isAuthenticated
    }
}

function mapDispatchToProps(dispatch){
    return {
        userActions: bindActionCreators(userActions, dispatch),
        responseHandlerActions: bindActionCreators(responseHandlerActions, dispatch),
    }
}

User.propTypes = {
    groupAdmins: PropTypes.array,
    currentUser: PropTypes.object,
    isAuthenticated: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(User);