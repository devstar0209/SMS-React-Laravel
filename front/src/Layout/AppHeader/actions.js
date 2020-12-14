
// import { userConstants } from './constants';
import Api from '../../Api'

const actions = {
    logout,
};

const userConstants = {LOGOUT: 'USERS_LOGOUT'}

function logout() {
    console.log('headerprops', this)
    return dispatch => {
        Api.logout()
        dispatch({ type: userConstants.LOGOUT})
        window.location.reload();
    }
}

export default actions;