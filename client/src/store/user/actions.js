import * as userActionTypes from './actionTypes';
import * as groupActionTypes from '../group/actionTypes';
import * as responseHandlerActionTypes from '../responseHandler/actionTypes';
import * as responseHandlerActions from '../responseHandler/actions';
import * as api from '../../api/service';
import cookieGetter from 'cookie-getter';

export function loadUser() {
    return async(dispatch) => {
        try {
            const cookie = cookieGetter('schedAroo_jwt');
            if(cookie){
                const currentUser = await api.loadUser();
                
                await this.updateUser(currentUser);
            }
            
            dispatch({ type: userActionTypes.LOAD_COMPLETE});
        } catch (error) {
            console.error("Loading error: ", error);
            dispatch(responseHandlerActions.errorHandler(error));
        }
    }
}

export function loadAllUsers() {
    return async(dispatch) => {
        try {
            const allUsers = await api.loadAllUsers();
            dispatch({ type: userActionTypes.ALL_USERS, allUsers});
            
        } catch (error) {
            console.error("Loading error: ", error);
            dispatch(responseHandlerActions.errorHandler(error));
        }
    }
}

export function loginCurrentUser(phone, password) {
    return async(dispatch) => {
        try {
            let credentials = {
                'phone': phone,
                'password': password
            };
            const currentUser = await api.loginCurrentUser(credentials);
            await this.updateUser(currentUser);
        } catch (error) {
            console.error("Error logging in current user: ", error);
            dispatch(responseHandlerActions.errorHandler(error));
            throw new Error(error);
        }
    }
}

export function updateUser(currentUser) {
    return (dispatch) => {
        try {
            const groupAdmins = currentUser.groupAdmins;
            const userGroups = currentUser.userGroups;

            dispatch({ type: userActionTypes.CURRENT_USER_LOGIN, currentUser});
            dispatch({ type: groupActionTypes.GROUPADMINS, groupAdmins});
            dispatch({ type: groupActionTypes.USERGROUPS, userGroups});
        } catch (error) {
            throw new Error (error);
        }
    }
}

export function logoutCurrentUser() {
    return async(dispatch) => {
        try {
            await api.logoutCurrentUser();
            dispatch({ type: userActionTypes.LOGOUT_USER});
        } catch (error) {
            console.error("Error logging out user: ", error);
            throw new Error(error);
        }
    }
}

export function userAuthentication() {
    return async(dispatch) => {
        try {
            await api.userAuthentication();
            dispatch({ type: responseHandlerActionTypes.USER_VALIDATION});
        } catch (error) {
            console.error("User authentication: ", error);
            dispatch(responseHandlerActions.errorHandler(error));
        }
    }
}

export function userAuthorization(groupId) {
    return async(dispatch) => {
        try {
            await api.userAuthorization(groupId);
            dispatch({ type: responseHandlerActionTypes.USER_VALIDATION});
        } catch (error) {
            console.error("User authorization: ", error);
            dispatch(responseHandlerActions.errorHandler(error));
        }
    }
}

export function createUser(newUser) {
    return async(dispatch) => {
        try {
            const currentUser = await api.createUser(newUser);
            dispatch({ type: userActionTypes.CURRENT_USER_LOGIN, currentUser});
        } catch (error) {
            console.error("Error creating and logging in current user: ", error);
            dispatch(responseHandlerActions.errorHandler(error));

            //additional error needed for managing local state loading spinner
            throw new Error(error);
        }
    }
}

export function isPhoneAvailable(number) {
    return async(dispatch) => {
        try {
            await api.isPhoneAvailable({phone: number});
            // dispatch(responseHandlerActions.reset());
        } catch (error) {
            console.error("Error phoneAvailability: ", error);
            dispatch(responseHandlerActions.errorHandler(error));
        }
    }
}