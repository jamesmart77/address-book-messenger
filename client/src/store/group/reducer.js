import * as types from './actionTypes';
import initialState from './initialState';

export function groupAdmins(state = initialState.groupAdmins, action = {}) {
    switch (action.type) {
        case types.GROUPADMINS:
            return action.groupAdmins;
        default:
            return state;
    }
}

export function userGroups(state = initialState.userGroups, action = {}) {
    switch (action.type) {
        case types.USERGROUPS:
            return action.userGroups;
        default:
            return state;
    }
}