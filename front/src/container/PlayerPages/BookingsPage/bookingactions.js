import { BOOKINGCLASS } from './bookingconstants';

export const getClassesList = data => ({
	type: BOOKINGCLASS.GET_BOOKING_CLASSES_LIST,
	payload: data,
});

export const requestClassDelete = data => ({
    type: BOOKINGCLASS.REQUEST_CLASS_DELETE,
    payload: data
});