import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    logout,
    register,
    login,
    getAll,
    delete: _delete
};
function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}
function register(user) {
    return dispatch => {
        // The request returns " { type: userConstants.REGISTER_REQUEST, user }" 
        // and this is sent to the dispatcher, which calls the registration.reducer.js and returns
        // case userConstants.REGISTER_REQUEST: return { registering: true };
        // and RegisterPage receives the registering state as props and displays a loader in the template
        dispatch(request(user));

        userService.register(user)
            .then(
            user => {
                dispatch(success());
                history.push('/login');
                dispatch(alertActions.success('Registration successful'));
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
            user => {
                dispatch(success(user));
                history.push('/');
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
            )
    }
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
            users => dispatch(success(users)),
            error => dispatch(failure(error))
            )
    }
    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
            user => {
                dispatch(success(id));
            },
            error => {
                dispatch(failure(error));
            }
            );
    };
    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}


