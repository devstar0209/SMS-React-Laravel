import { KID } from './kidsconstants';

export const getStudentList = data => ({
	type: KID.GET_KIDS_LIST,
	payload: data,
});

export const requestStudentDetail = data => ({
    type: KID.REQUEST_KID_DETAIL,
    payload: data
});

export const requestStudentCreate = data => ({
    type: KID.REQUEST_NEW_KID_CREATE,
    payload: data
});

export const requestClassList = data => ({
    type: KID.REQUEST_KID_CLASS_LIST,
    payload: data
});

export const requestStudentUpdate = data => ({
    type: KID.REQUEST_KID_UPDATE,
    payload: data
});

export const gotoStudentPayment = data => ({
    type: KID.GOTO_KID_PAYMENT
});

export const requestStudentPayment = data => ({
    type: KID.REQUEST_KID_PAYMENT,
    payload: data
});

export const requestNewStudentPayment = data => ({
    type: KID.REQUEST_NEW_KID_PAYMENT,
    payload: data
});

export const requestStudentPaymentUpdate = data => ({
    type: KID.REQUEST_KID_PAYMENT_UPDATE,
    payload: data
});

export const requestStudentPaymentDelete = data => ({
    type: KID.REQUEST_KID_PAYMENT_DELETE,
    payload: data
});

export const submitCheckout = data => ({
    type: KID.SEND_CHECKOUT,
    payload: data
});

export const submitPaymentOption = data => ({
    type: KID.SEND_PAYMENT_OPTION,
    paylaod: data
});

export const backDetail = data => ({
    type: KID.BACK_GOTO_DETAIL
});

export const requestStudentClasses = data => ({
    type: KID.REQUEST_ATTENDANCE_CLASSES,
    payload: data
});

export const requestStudentAttendance = data => ({
    type: KID.REQUEST_ATTENDANCE_HISTORY,
    payload: data
});

export const gotoStudentEvents = data => ({
    type: KID.GOTO_KID_EVENTS
});


export const requestStudentContactDetail = data => ({
    type: KID.REQUEST_KID_CONTACT_DETAIL,
    payload: data
});

export const requestStudentContactCreate = data => ({
    type: KID.REQUEST_NEW_KID_CONTACT_CREATE,
    payload: data
});

export const requestStudentContactUpdate = data => ({
    type: KID.REQUEST_KID_CONTACT_UPDATE,
    payload: data
});

export const requestStudentContactDelete = data => ({
    type: KID.REQUEST_KID_CONTACT_DELETE,
    payload: data
});
