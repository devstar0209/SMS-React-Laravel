import { COACHES } from './coachesconstants';

export const getCoachesList = data => ({
	type: COACHES.GET_COACHES_LIST,
	payload: data,
});

export const requestCoacheCreate = data => ({
    type: COACHES.REQUEST_NEW_COACHE_CREATE,
    payload: data
});

export const requestCoacheUpdate = data => ({
    type: COACHES.REQUEST_COACHE_UPDATE,
    payload: data
});

export const requestCoacheDelete = data => ({
    type: COACHES.REQUEST_COACHE_DELETE,
    payload: data
});

export const requestCoacheDetail = data => ({
    type: COACHES.REQUEST_COACHE_DETAIL,
    payload: data
});

export const requestGotoCreate = data => ({
    type: COACHES.REQUEST_COACHE_CREATE_ROUTE,
    payload: data
});

export const createPassword = data => ({
    type: COACHES.CREATE_PASSWORD,
    payload: data
})