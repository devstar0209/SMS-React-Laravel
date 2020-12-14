import { PLAYERCLASS } from './classconstants';

export const getClassesList = data => ({
	type: PLAYERCLASS.GET_PLAYER_CLASSES_LIST,
	payload: data,
});

export const requestClassDelete = data => ({
    type: PLAYERCLASS.REQUEST_CLASS_DELETE,
    payload: data
});

export const requestClassPayment = data => ({
    type: PLAYERCLASS.REQUEST_CLASS_PAYMENT,
    payload: data
});

export const submitCheckout = data => ({
    type: PLAYERCLASS.REQUEST_PLAYER_CHECKOUT,
    payload: data
});