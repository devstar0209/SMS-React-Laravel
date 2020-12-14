import { EVENT } from './eventconstants';

export const getEventsList = data => ({
	type: EVENT.TEACHER_GET_EVENTS_LIST,
	payload: data,
});

export const requestEventDetail = data => ({
    type: EVENT.TEACHER_REQUEST_EVENT_DETAIL,
    payload: data
});
