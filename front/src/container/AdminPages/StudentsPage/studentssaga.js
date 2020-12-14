import { push } from 'connected-react-router';
import { put, takeLatest, call, all } from 'redux-saga/effects';
import ApiHelper from '../../../Common/Services/ApiHelper';
import { STUDENT } from './studentsconstants';
import resources from '../../../Common/Constants/resources';
import {
	notificationService,
} from '../../../Common/Services';

export function* getStudentsList(action) {
	try {
		const response = yield call(ApiHelper.get, resources.admin.student.list, action.payload);
		const { data} = response;

        yield put({
            type: STUDENT.SEND_STUDENTS_LIST,
            payload: data
        });

	} catch (e) {
		yield notificationService.error(e);
	}
}

export function* createStudent(action){
    try{
        yield put({type: STUDENT.SEND_LOADING});
        const response = yield call(ApiHelper.post, resources.admin.student.create, action.payload);
        const {data, classes} = response//send student_id
        // yield put({
        //     type: STUDENT.GOTO_STUDENT_CONTACT_DETAIL,
        //     payload: id
        // })
        
        yield all([
            notificationService.success("Created new student successfully"),
            put(push('/admin/students/detail')),
            put({
                type: STUDENT.SEND_STUDENT_DETAIL,
                payload: response
            })
		]);

    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* createStudentContact(action){
    try{
        const response = yield call(ApiHelper.post, resources.admin.student.contact.create, action.payload);

        const {message} = response;
        yield all([
            notificationService.success(message),
		]);

        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* updateStudent(action){
    try{
        // yield put({type: STUDENT.SEND_LOADING});
        const response = yield call(ApiHelper.post, resources.admin.student.update, action.payload);

        const {data} = response//student contact detail

        yield all([
            notificationService.success('Updated student successfully'),
		]);

    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* deleteStudent(action){
    try{
        const response = yield call(ApiHelper.post, resources.admin.student.delete, action.payload);

        yield all([
            notificationService.success('Deleted student successfully'),
			put(push('/admin/students')),
		]);
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* studentDetail(action){
    try{
        yield put({type: STUDENT.SEND_LOADING});

        const response = yield call(ApiHelper.get, resources.admin.student.detail, action.payload);

        const {data, classes, makeup_classes, makeup_classes_history} = response

        yield all([
            put(push('/admin/students/detail')),
            put({
                type: STUDENT.SEND_STUDENT_DETAIL,
                payload: response
            })
		]);

    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* studentContactDetail(action){
    try{
        const response = yield call(ApiHelper.get, resources.admin.student.contact.detail, action.payload);

        const {data} = response

        yield put({
            type: STUDENT.SEND_STUDENT_CONTACT_DETAIL,
            payload: data
        });

    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* deleteStudentContact(action){
    try{
        const response = yield call(ApiHelper.post, resources.admin.student.contact.delete, action.payload);

        yield all([
            notificationService.success('Deleted student contact successfully'),
			put({
                type: STUDENT.GOTO_DETAIL,
            })
		]);
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* updateStudentContact(action){
    try{
        const response = yield call(ApiHelper.post, resources.admin.student.contact.update, action.payload);

        yield all([
            notificationService.success('Updated student contact successfully'),
		]);
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* gotoStudentPayment(action){
    yield put({type: STUDENT.SEND_STUDENT_PAYMENT});
}

export function* requestStudentPayment(action){
    try{
        const response = yield call(ApiHelper.get, resources.admin.student.payment.detail, action.payload);
        const {payment} = response
        yield put({
            type: STUDENT.SEND_STUDENT_PAYMENT,
            payload: payment === null ? {} : payment
        });
    }catch (e) {
        yield notificationService.error(e);
    }
}

export function* requestNewStudentPayment(action){
    try{
        if(action.payload.plan === 0){
            yield notificationService.error("Please select payment option");
        }
        else {
            const response = yield call(ApiHelper.post, resources.admin.student.payment.create, action.payload);
            const {message, payment} = response
            yield notificationService.success(message);
            yield put({
                type: STUDENT.SEND_STUDENT_PAYMENT,
                payload: payment === null ? {} : payment
            });
        }
    }catch (e) {
        yield notificationService.error(e);
    }
}

export function* requestStudentPaymentUpdate(action){
    try{
        const response = yield call(ApiHelper.post, resources.admin.student.payment.update, action.payload);
        yield notificationService.success('Updated student payment successfully');
    }catch (e) {
        yield notificationService.error(e);
    }
}

export function* requestStudentPaymentDelete(action){
    try{
        const response = yield call(ApiHelper.post, resources.admin.student.payment.delete, action.payload);
        yield notificationService.success('Deleted student payment successfully');
    }catch (e) {
        yield notificationService.error(e);
    }
}

export function* checkout(action){
    try{
        
        const response = yield call(ApiHelper.post, resources.admin.student.checkout, action.payload);
        yield notificationService.success(response.message);
        
    }catch (e) {
        yield notificationService.error(e);
    }
}

export function* paymentOption(action){
    try{
        
            const response = yield call(ApiHelper.post, resources.admin.student.paymentOption.create, action.payload);
            yield notificationService.success(response.message);

        
    }catch (e) {
        yield notificationService.error(e);
    }
}

export function* getClassList(action){
    try {
		const response = yield call(ApiHelper.get, resources.admin.class.list, action.payload);
		const { data} = response;

        yield put({
            type: STUDENT.SEND_CLASSES_LIST,
            payload: data
        });

        yield put(push('/admin/students/create'));

	} catch (e) {
		yield notificationService.error(e);
	}
}

export function* backDetail(action) {
    yield put({
        type: STUDENT.GOTO_DETAIL,
    });
}

export function* requestAttendanceHistory(action){
    if(action.payload.class_id === 0){
        yield notificationService.error('Please select class');
        return;
    }
    try{
        const response = yield call(ApiHelper.post, resources.admin.student.attendance.index, action.payload);

        yield put({
            type: STUDENT.SEND_ATTENDANCE_HISTORY,
            payload: response
        });

    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* requestAttendanceClasses(action){
    
    try{

        yield put({
            type: STUDENT.SEND_ATTENDANCE_CLASSES,
        });

    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* saveAttendance(action){
    if(action.payload.class_id === 0){
        yield notificationService.error('Please select class');
        return;
    }
    if(action.payload.data === null){
        yield notificationService.error('No data');
        return;
    }
    try{
        const response = yield call(ApiHelper.post, resources.admin.student.attendance.save, action.payload);

        yield notificationService.success(response.message);

    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* saveMakeupAttendance(action){
    
    if(action.payload.data === null){
        yield notificationService.error('No data');
        return;
    }
    try{
        const response = yield call(ApiHelper.post, resources.admin.student.makeup_save, action.payload);

        yield notificationService.success(response.message);

    }catch (e) {
		yield notificationService.error(e);
	}
}

export default function* studentSaga() {
	yield takeLatest(STUDENT.GET_STUDENTS_LIST, getStudentsList);
	yield takeLatest(STUDENT.REQUEST_STUDENT_DETAIL, studentDetail);
	yield takeLatest(STUDENT.REQUEST_CLASS_LIST, getClassList);
	yield takeLatest(STUDENT.REQUEST_NEW_STUDENT_CREATE, createStudent);
	yield takeLatest(STUDENT.REQUEST_NEW_STUDENT_CONTACT_CREATE, createStudentContact);
	yield takeLatest(STUDENT.REQUEST_STUDENT_UPDATE, updateStudent);
	yield takeLatest(STUDENT.REQUEST_STUDENT_DELETE, deleteStudent);
	yield takeLatest(STUDENT.REQUEST_STUDENT_CONTACT_DETAIL, studentContactDetail);
	yield takeLatest(STUDENT.REQUEST_STUDENT_CONTACT_UPDATE, updateStudentContact);
	yield takeLatest(STUDENT.REQUEST_STUDENT_CONTACT_DELETE, deleteStudentContact);
	yield takeLatest(STUDENT.GOTO_STUDENT_PAYMENT, gotoStudentPayment);
	yield takeLatest(STUDENT.REQUEST_STUDENT_PAYMENT, requestStudentPayment);
	yield takeLatest(STUDENT.REQUEST_NEW_STUDENT_PAYMENT, requestNewStudentPayment);
	yield takeLatest(STUDENT.REQUEST_STUDENT_PAYMENT_UPDATE, requestStudentPaymentUpdate);
	yield takeLatest(STUDENT.REQUEST_STUDENT_PAYMENT_DELETE, requestStudentPaymentDelete);
	yield takeLatest(STUDENT.REQUEST_ATTENDANCE_HISTORY, requestAttendanceHistory);
	yield takeLatest(STUDENT.REQUEST_ATTENDANCE_CLASSES, requestAttendanceClasses);
	yield takeLatest(STUDENT.SAVE_ATTENDANCE, saveAttendance);
	yield takeLatest(STUDENT.SAVE_MAKEUP_ATTENDANCE, saveMakeupAttendance);
	yield takeLatest(STUDENT.SEND_CHECKOUT, checkout);
	yield takeLatest(STUDENT.SEND_PAYMENT_OPTION, paymentOption);
	yield takeLatest(STUDENT.BACK_GOTO_DETAIL, backDetail);
}
