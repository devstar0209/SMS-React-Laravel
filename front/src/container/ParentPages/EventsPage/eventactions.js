import { KIDEVENT } from './eventconstants';

export const getEventsList = data => ({
	type: KIDEVENT.GET_KIDEVENTS_LIST,
	payload: data,
});

export const requestEventDetail = data => ({
    type: KIDEVENT.REQUEST_KIDEVENT_DETAIL,
    payload: data
});