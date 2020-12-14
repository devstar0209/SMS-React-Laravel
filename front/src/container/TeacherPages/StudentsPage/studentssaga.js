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
		const response = yield call(ApiHelper.get, resources.teacher.student.list, action.payload);
		const { data} = response;

        yield put({
            type: STUDENT.TEACHER_SEND_STUDENTS_LIST,
            payload: data
        });

	} catch (e) {
		yield notificationService.error(e);
	}
}

export function* studentDetail(action){
    try{
        yield put({type: STUDENT.TEACHER_SEND_LOADING});

        const response = yield call(ApiHelper.get, resources.teacher.student.detail, action.payload);

        const {personal, contact, payment, events} = response

        yield all([
            put(push('/page/students/detail')),
            put({
                type: STUDENT.TEACHER_SEND_STUDENT_DETAIL,
                payload: response
            })
		]);

        
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export default function* studentSaga() {
	yield takeLatest(STUDENT.TEACHER_GET_STUDENTS_LIST, getStudentsList);
	yield takeLatest(STUDENT.TEACHER_REQUEST_STUDENT_DETAIL, studentDetail);
}
