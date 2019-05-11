import React, { Component } from "react";
import { Row, Col, Input, Icon, Button } from 'react-materialize';
import ReactToolTip from 'react-tooltip';
import { states } from '../../utils/helpers';
import SweetAlert from 'sweetalert2-react';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

export class CreateUserForm extends Component {

    state = {
        showTip: false
    }

    render() {
        const { isPhoneAvailable, state, handleChange, phoneChange } = this.props;
        const tip = '<ul><li>Public: all group users will see your name, phone number, and email.</li>' +
                '<li>Private: Only your name and email will display.</li></ul> Address information will ' +
                'only be visible to group admins.'
        
        return(
            <div className='create-user-form-container'>
                <SweetAlert
                    show={this.state.showTip}
                    type='info'
                    title='User Profile Data'
                    html={tip}
                    onConfirm={() => this.setState({showTip: false})}
                />
                <Row l={4} m={6} s={10}>
                    <Input s={12} m={6}
                        label="First Name"
                        name="firstName"
                        value={state.firstName}
                        onChange={handleChange}
                    />
                    <Input s={12} m={6}
                        label="Last Name"
                        name="lastName"
                        value={state.lastName}
                        onChange={handleChange}
                    />
                    <Col s={11} m={5}>
                    <PhoneInput
                        className={!state.isValidPhone ? 'invalid-phone phone-input' : 'phone-input'}
                        country="US"
                        placeholder='+1 555 123 4567'
                        value={state.phone}
                        error={ !state.isValidPhone && 'Please format as: +1 555 123 4567'}
                        onChange={phoneChange} />
                    </Col>
                    <Col s={1}>
                        {isPhoneAvailable ? (
                            <Icon tiny className='check-icon'>check</Icon>
                            ) : (
                            <div data-tip='This phone number is not available' data-type='error'>
                                <ReactToolTip effect="solid" className='do-not-disturb-tooltip'/>
                                <Icon tiny className='do-not-disturb-icon'>do_not_disturb</Icon>
                            </div>
                        )}
                    </Col>         
                    <Input s={12} m={6}
                        type="email" 
                        label="Email"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                    />
                    <Input s={12} m={6}
                        label="Address"
                        name="address"
                        value={state.address}
                        onChange={handleChange}
                    />
                    <Input s={6} m={3}
                        type='select'
                        name="state"
                        value={state.state}
                        onChange={handleChange}
                    >   
                        <option value="" disabled selected>State</option>
                        {states.map(state => {
                            return <option key={state} value={state}>{state}</option>
                        })}
                    </Input>
                    <Input s={6} m={3}
                        type='number'
                        label="Zip Code"
                        name="zipcode"
                        maxLength='5'
                        value={state.zipcode}
                        onChange={handleChange}
                    />
                    <Input s={12} m={6}
                        type="password" 
                        label="Password" 
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                    />
                    <Input s={12} m={6}
                        type="password" 
                        label="Confirm Password" 
                        name="passwordConfirm"
                        value={state.passwordConfirm}
                        onChange={handleChange}
                    />
                    <Row>
                        <Col s={12}>
                            <div className='switch-wrapper'>
                                <Col s={3}>
                                    <h6>Profile Data Visibility</h6>
                                    <div className="switch" onChange={handleChange}>
                                        <label>
                                            Private
                                            <input type="checkbox" name='isPublic' value={state.isPublic}/>
                                            <span className="lever"/>
                                            Public
                                        </label>
                                    </div>
                                </Col>
                                <Col s={2}>
                                    <Button 
                                        className='tip-btn'
                                        onClick={() => {this.setState({showTip: true})}}
                                    >
                                        <Icon>help_outline</Icon>
                                    </Button>
                                </Col>
                            </div>
                        </Col>            
                    </Row>
                </Row>
            </div> 
        )
    }
}

export default CreateUserForm;
