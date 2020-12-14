import { EVENT } from './eventconstants';

export const getEventsList = data => ({
	type: EVENT.GET_EVENTS_LIST,
	payload: data,
});

export const requestEventCreate = data => ({
    type: EVENT.REQUEST_NEW_EVENT_CREATE,
    payload: data
});

export const requestEventUpdate = data => ({
    type: EVENT.REQUEST_EVENT_UPDATE,
    payload: data
});

export const requestEventDelete = data => ({
    type: EVENT.REQUEST_EVENT_DELETE,
    payload: data
});

export const requestEventDetail = data => ({
    type: EVENT.REQUEST_EVENT_DETAIL,
    payload: data
});

export const requestGotoCreate = data => ({
    type: EVENT.REQUEST_EVENT_CREATE_ROUTE,
    payload: data
});