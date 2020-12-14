import { STUDENT } from './studentsconstants';

export const getStudentList = data => ({
	type: STUDENT.GET_STUDENTS_LIST,
	payload: data,
});

export const requestStudentCreate = data => ({
    type: STUDENT.REQUEST_NEW_STUDENT_CREATE,
    payload: data
});

export const requestClassList = data => ({
    type: STUDENT.REQUEST_CLASS_LIST,
    payload: data
});

export const requestStudentUpdate = data => ({
    type: STUDENT.REQUEST_STUDENT_UPDATE,
    payload: data
});

export const requestStudentDelete = data => ({
    type: STUDENT.REQUEST_STUDENT_DELETE,
    payload: data
});

export const requestStudentDetail = data => ({
    type: STUDENT.REQUEST_STUDENT_DETAIL,
    payload: data
});

export const requestStudentContactDetail = data => ({
    type: STUDENT.REQUEST_STUDENT_CONTACT_DETAIL,
    payload: data
});

export const requestStudentContactCreate = data => ({
    type: STUDENT.REQUEST_NEW_STUDENT_CONTACT_CREATE,
    payload: data
});

export const requestStudentContactUpdate = data => ({
    type: STUDENT.REQUEST_STUDENT_CONTACT_UPDATE,
    payload: data
});

export const requestStudentContactDelete = data => ({
    type: STUDENT.REQUEST_STUDENT_CONTACT_DELETE,
    payload: data
});

export const gotoStudentPayment = data => ({
    type: STUDENT.GOTO_STUDENT_PAYMENT
});

export const requestStudentPayment = data => ({
    type: STUDENT.REQUEST_STUDENT_PAYMENT,
    payload: data
});

export const requestNewStudentPayment = data => ({
    type: STUDENT.REQUEST_NEW_STUDENT_PAYMENT,
    payload: data
});

export const requestStudentPaymentUpdate = data => ({
    type: STUDENT.REQUEST_STUDENT_PAYMENT_UPDATE,
    payload: data
});

export const requestStudentPaymentDelete = data => ({
    type: STUDENT.REQUEST_STUDENT_PAYMENT_DELETE,
    payload: data
});

export const submitCheckout = data => ({
    type: STUDENT.SEND_CHECKOUT,
    payload: data
});

export const submitPaymentOption = data => ({
    type: STUDENT.SEND_PAYMENT_OPTION,
    paylaod: data
});

export const backDetail = data => ({
    type: STUDENT.BACK_GOTO_DETAIL
});

export const requestStudentAttendance = data => ({
    type: STUDENT.REQUEST_ATTENDANCE_HISTORY,
    payload: data
});

export const requestStudentClasses = data => ({
    type: STUDENT.REQUEST_ATTENDANCE_CLASSES,
    payload: data
});

export const saveAttendance = data => ({
    type: STUDENT.SAVE_ATTENDANCE,
    payload: data
});

export const saveMakeupAttendance = data => ({
    type: STUDENT.SAVE_MAKEUP_ATTENDANCE,
    payload: data
});