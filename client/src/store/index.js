import { combineReducers } from 'redux';
import { currentUser, initialLoad, allUsers } from './user/reducer';
import { userGroups, groupAdmins } from './group/reducer';
import { loginUnauthorized, 
        isAuthenticated, 
        isPhoneAvailable, 
        isServerError, 
        unauthorized,
        addUserToGroupError } from './responseHandler/reducer';

const rootReducer = combineReducers({
    currentUser,
    initialLoad,
    allUsers,
    loginUnauthorized,
    isAuthenticated,
    isPhoneAvailable,
    isServerError,
    unauthorized,
    groupAdmins,
    userGroups,
    addUserToGroupError
});

export default rootReducer;