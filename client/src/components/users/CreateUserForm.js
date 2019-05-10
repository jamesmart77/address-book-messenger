import React from "react";
import { Row, Col, Input, Icon } from 'react-materialize';
import ReactToolTip from 'react-tooltip';
import { states } from '../../utils/helpers';

function CreateUserForm (props) {
    const { isEmailAvailable, state, handleChange } = props;
    const tip = 'If Public, all group users will see your name, phone number, and email. Address information will only be visible to group admins.'

    return(
        <div className='create-user-form-container'>
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
                <Input s={12} m={6}
                    type="tel" 
                    label="Phone"
                    name="phone"
                    validate
                    value={state.phone}
                    onChange={handleChange}
                />            
                <Input s={11} m={5}
                    type="email" 
                    label="Email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                />
                <Col s={1}>
                    {isEmailAvailable ? (
                        <Icon tiny className='check-icon'>check</Icon>
                        ) : (
                        <div data-tip='This email address is not available' data-type='error'>
                            <ReactToolTip effect="solid" className='do-not-disturb-tooltip'/>
                            <Icon tiny className='do-not-disturb-icon'>do_not_disturb</Icon>
                        </div>
                    )}
                </Col>
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
                            <h6>Account Visibility</h6>
                            <ReactToolTip effect="solid" className='info-tooltip'/>
                            <div class="switch" data-tip={tip} data-type='info'>
                                <label>
                                    Public
                                    <input type="checkbox" onChange={handleChange}/>
                                    <span class="lever"/>
                                    Private
                                </label>
                            </div>
                        </div>
                    </Col>            
                </Row>
            </Row>
        </div> 
    )
}

export default CreateUserForm;
