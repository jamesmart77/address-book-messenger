import * as types from './actionTypes';
import * as userActionTypes from '../user/actionTypes';

export function errorHandler(error) {
    return async(dispatch) => {
        const errorMessage = error.message;

        switch(errorMessage) {
            case errorMessage.includes("loginCurrentUser"):
                dispatch({ type: types.LOGIN_UNAUTHROIZED});
                break;
            case errorMessage.includes("createUser"):
                dispatch({ type: types.LOGIN_UNAUTHROIZED});
                break;
            case errorMessage.includes("userAuthentication"):
                dispatch({ type: types.RESET});
                break;
            case errorMessage.includes("HTTP status 403"):
                dispatch({ type: types.UNAUTHORIZED});
                break;
            case errorMessage.includes("addUserToGroup"):
                dispatch({ type: types.ADD_USER_TO_GROUP_ERROR});
                break;
            case errorMessage.includes("phoneAvailability"):
                dispatch({ type: types.PHONE_AVAILABLE});
                break;
            case errorMessage.includes("loadUser"):
                dispatch({ type: userActionTypes.LOAD_COMPLETE});
                break;
            case errorMessage.includes("HTTP status 500"):
                dispatch({ type: types.SERVER_ERROR});
                break;
            default:
                break;
        }

        // if((errorMessage.includes("loginCurrentUser") && errorMessage.includes("HTTP status 401")) ||
        //     (errorMessage.includes("createUser"))){
        //         dispatch({ type: types.LOGIN_UNAUTHROIZED});
        // } else {
        //     if(errorMessage.includes("userAuthentication") && errorMessage.includes("HTTP status 401")){
        //         dispatch({ type: types.RESET});
            // } else {
            //     if(errorMessage.includes("HTTP status 403")){
            //         dispatch({ type: types.UNAUTHORIZED});
            //     } else {
                    // if (errorMessage.includes("addUserToGroup") && errorMessage.includes("HTTP status 500")){
                    //     dispatch({ type: types.ADD_USER_TO_GROUP_ERROR})
                    // } else {
                        // if(errorMessage.includes("phoneAvailability") && errorMessage.includes("HTTP status 401")){
                        //     dispatch({ type: types.EMAIL_ADDRESS_AVAILABLE});
                        // } else {
                            // if(errorMessage.includes("loadUser")) {
                            //     dispatch({ type: userActionTypes.LOAD_COMPLETE});
                            // } else {
//                                 if(errorMessage.includes("HTTP status 500")){
//                                     dispatch({ type: types.SERVER_ERROR});
//                                 } 
//                             }
//                         }
//                     }
//                 }
//             }
//         }
    }
}

export function reset() {
    return async(dispatch) => {
        dispatch({ type: types.RESET});
    }
}