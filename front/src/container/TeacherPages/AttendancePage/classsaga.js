import { push } from 'connected-react-router';
import { put, takeLatest, call, all } from 'redux-saga/effects';
import ApiHelper from '../../../Common/Services/ApiHelper';
import { CLASS } from './classconstants';
import resources from '../../../Common/Constants/resources';
import {
	notificationService,
} from '../../../Common/Services';
import { components } from 'react-select';

export function* getClassesList(action) {
	try {
		const response = yield call(ApiHelper.get, resources.teacher.class.list,action.payload);
		const {data} = response;
	
			yield put({
                type: CLASS.TEACHER_SEND_CLASSES_LIST,
                payload: data
			});

	} catch (e) {
		yield notificationService.error(e);
	}
}

export function* saveAttendance(action){
	try{
		console.log('attendace', action.payload.attendance.length)
		if(action.payload.attendance.length === 0)
			yield notificationService.error("Please select students");
		else {
			const response = yield call(ApiHelper.post, resources.teacher.attendance.save, action.payload);
			yield notificationService.success("Saved successfully");
		}
	}catch (e) {
		yield notificationService.error(e);
	}
}

export function* getAttendance(action) {
	try{
        yield put({type: CLASS.TEACHER_SEND_LOADING});
		const response = yield call(ApiHelper.post, resources.teacher.attendance.detail, action.payload);
		const {attendance, makeup_attendance, class_id, class_name, term, startday} = response;

		var data = {};
		data['attendance'] = attendance;
		data['makeup_attendance'] = makeup_attendance;
		data['class_id'] = class_id;
		data['class_name'] = class_name;
		data['term'] = term;
		data['startday'] = startday;

        yield all([
            put(push('/page/attendance/detail')),
            put({
                type: CLASS.TEACHER_SEND_CLASS_STUDENT_ATTENDANCE,
                payload: data
            })
		]);
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* getPrevAttendance(action) {
	try{
        // yield put({type: CLASS.TEACHER_SEND_LOADING});
		const response = yield call(ApiHelper.post, resources.teacher.attendance.prev, action.payload);
		const {attendance, class_id, class_name, term, startday} = response;

		var data = {};
		data['attendance'] = attendance;
		data['class_id'] = class_id;
		data['class_name'] = class_name;
		data['term'] = term;
		data['startday'] = startday;

        yield all([
            put({
                type: CLASS.TEACHER_SEND_CLASS_STUDENT_ATTENDANCE,
                payload: data
            })
		]);
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* getNextAttendance(action) {
	try{
        // yield put({type: CLASS.TEACHER_SEND_LOADING});
		const response = yield call(ApiHelper.post, resources.teacher.attendance.next, action.payload);
		const {attendance, class_id, class_name, term, startday} = response;

		var data = {};
		data['attendance'] = attendance;
		data['class_id'] = class_id;
		data['class_name'] = class_name;
		data['term'] = term;
		data['startday'] = startday;

        yield all([
            put({
                type: CLASS.TEACHER_SEND_CLASS_STUDENT_ATTENDANCE,
                payload: data
            })
		]);
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* getTodayAttendance(action) {
	try{
        // yield put({type: CLASS.TEACHER_SEND_LOADING});
		const response = yield call(ApiHelper.post, resources.teacher.attendance.today, action.payload);
		const {attendance, class_id, class_name, term, startday} = response;

		var data = {};
		data['attendance'] = attendance;
		data['class_id'] = class_id;
		data['class_name'] = class_name;
		data['term'] = term;
		data['startday'] = startday;

        yield all([
            put({
                type: CLASS.TEACHER_SEND_CLASS_STUDENT_ATTENDANCE,
                payload: data
            })
		]);
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export default function* attendanceSaga() {
	yield takeLatest(CLASS.TEACHER_GET_CLASSES_LIST, getClassesList);
	yield takeLatest(CLASS.TEACHER_SUBMIT_ATTENDANCE, saveAttendance);
	yield takeLatest(CLASS.TEACHER_REQUEST_CLASS_STUDENT_ATTENDANCE, getAttendance);
	yield takeLatest(CLASS.REQUEST_PREV_WEEK_ATTENDANCE, getPrevAttendance);
	yield takeLatest(CLASS.REQUEST_NEXT_WEEK_ATTENDANCE, getNextAttendance);
	yield takeLatest(CLASS.REQUEST_TODAY_ATTENDANCE, getTodayAttendance);
}
