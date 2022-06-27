import { LOGIN_USER, SET_USER_DATA, LOGOUT_USER } from '../actionTypes';

const initialState = {}


export default function userReducer(state = initialState, { type, payload }) {
    switch (type) {
        case SET_USER_DATA:
            return payload;

        case LOGIN_USER:
            return payload;

        case LOGOUT_USER:
            return {};

        default:
            return state;
    }
}
