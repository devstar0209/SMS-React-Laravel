import { push } from 'connected-react-router';
import { put, takeLatest, call, all } from 'redux-saga/effects';
import ApiHelper from '../../../Common/Services/ApiHelper';
import { KID } from './kidsconstants';
import resources from '../../../Common/Constants/resources';
import {
	notificationService,
} from '../../../Common/Services';

export function* getStudentsList(action) {
	try {
		const response = yield call(ApiHelper.get, resources.parent.kid.list, action.payload);
		const { data} = response;

        yield put({
            type: KID.SEND_KIDS_LIST,
            payload: data
        });

	} catch (e) {
		yield notificationService.error(e);
	}
}

export function* createKid(action) {
    try{
        const response = yield call(ApiHelper.post, resources.parent.kid.create, action.payload);
        yield all([
            notificationService.success('Registered the student successfully'),
            put({
                type: KID.SEND_KID_DETAIL,
                payload: response
            })
		]);
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* updateStudent(action){
    try{
        // yield put({type: STUDENT.SEND_LOADING});
        const response = yield call(ApiHelper.post, resources.parent.kid.update, action.payload);

        const {data} = response//student contact detail

        yield all([
            notificationService.success('Updated the student successfully'),
            put({
                type: KID.SEND_KID_DETAIL,
                payload: response
            })
		]);

    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* studentDetail(action){
    try{
        yield put({type: KID.SEND_LOADING});

        const response = yield call(ApiHelper.get, resources.parent.kid.detail, action.payload);

        const {data, classes, makeup_classes, makeup_classes_history} = response

        yield all([
            put(push('/parent/kids/detail')),
            put({
                type: KID.SEND_KID_DETAIL,
                payload: response
            })
		]);

    }catch (e) {
		yield notificationService.error(e);
	}
}


export function* updateStudentContact(action){
    try{
        // yield put({type: STUDENT.SEND_LOADING});
        const response = yield call(ApiHelper.post, resources.parent.kid.contact.update, action.payload);

        const {data, message} = response//student contact detail

        yield all([
            notificationService.success(message),
            put({
                type: KID.SEND_KID_DETAIL,
                payload: response
            })
		]);

    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* deleteStudentContact(action) {
    try{
        const response = yield call(ApiHelper.post, resources.parent.kid.contact.delete, action.payload);

        const {data, message} = response//student contact detail

        yield all([
            notificationService.success(message),
            put({
                type: KID.SEND_KID_DETAIL,
                payload: response
            })
		]);
    }catch(e){
        yield notificationService.error(e);
    }
}

export function* gotoStudentPayment(action){
    yield put({type: KID.SEND_KID_PAYMENT});
}

export function* requestStudentPayment(action){
    try{
        const response = yield call(ApiHelper.get, resources.parent.kid.payment.detail, action.payload);
        const {payment} = response
        yield put({
            type: KID.SEND_KID_PAYMENT,
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
                type: KID.SEND_KID_PAYMENT,
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

export function* backDetail(action) {
    yield put({
        type: KID.GOTO_DETAIL,
    });
}

export function* requestAttendanceHistory(action){
    if(action.payload.class_id === 0){
        yield notificationService.error('Please select class');
        return;
    }
    try{
        const response = yield call(ApiHelper.post, resources.parent.kid.attendance.index, action.payload);

        yield put({
            type: KID.SEND_ATTENDANCE_HISTORY,
            payload: response
        });

    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* gotoStudentEvents(action){
    yield put({type: KID.SEND_KID_EVENTS});
}

export function* requestClassesList(action) {
    try{
        yield put({type: KID.SEND_LOADING});
        const response = yield call(ApiHelper.post, resources.parent.booking.list, action.payload);
        yield put(push('/parent/kids/create'));
        yield put({
            type: KID.SEND_KID_CLASSES_LIST,
            payload: response
        });

    }catch (e) {
		yield notificationService.error(e);
	}
}



export default function* kidSaga() {
	yield takeLatest(KID.GET_KIDS_LIST, getStudentsList);
	yield takeLatest(KID.REQUEST_NEW_KID_CREATE, createKid);
	yield takeLatest(KID.REQUEST_KID_DETAIL, studentDetail);
	yield takeLatest(KID.REQUEST_KID_CLASS_LIST, requestClassesList);
	yield takeLatest(KID.REQUEST_KID_UPDATE, updateStudent);
	yield takeLatest(KID.REQUEST_KID_CONTACT_UPDATE, updateStudentContact);
	yield takeLatest(KID.REQUEST_KID_CONTACT_DELETE, deleteStudentContact);
	yield takeLatest(KID.GOTO_KID_PAYMENT, gotoStudentPayment);
	yield takeLatest(KID.GOTO_KID_EVENTS, gotoStudentEvents);
	yield takeLatest(KID.REQUEST_KID_PAYMENT, requestStudentPayment);
	yield takeLatest(KID.REQUEST_NEW_KID_PAYMENT, requestNewStudentPayment);
	yield takeLatest(KID.REQUEST_KID_PAYMENT_UPDATE, requestStudentPaymentUpdate);
	yield takeLatest(KID.REQUEST_KID_PAYMENT_DELETE, requestStudentPaymentDelete);
	yield takeLatest(KID.REQUEST_ATTENDANCE_HISTORY, requestAttendanceHistory);
	yield takeLatest(KID.SEND_CHECKOUT, checkout);
	yield takeLatest(KID.SEND_PAYMENT_OPTION, paymentOption);
	yield takeLatest(KID.BACK_GOTO_DETAIL, backDetail);
}
