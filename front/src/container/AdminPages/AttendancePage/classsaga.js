import { push } from 'connected-react-router';
import { put, takeLatest, call, all } from 'redux-saga/effects';
import ApiHelper from '../../../Common/Services/ApiHelper';
import { ATTENDANCE } from './classconstants';
import resources from '../../../Common/Constants/resources';
import {
	notificationService,
} from '../../../Common/Services';
import { components } from 'react-select';

export function* getClassesList(action) {
	try {
		const response = yield call(ApiHelper.get, resources.admin.class.list,action.payload);
		const {data} = response;
	
			yield put({
                type: ATTENDANCE.ATTENDANCE_SEND_CLASSES_LIST,
                payload: data
			});

	} catch (e) {
		yield notificationService.error(e);
	}
}

export function* saveAttendance(action){
	try{
		console.log('attendace', action.payload.attendance.length)
		if(action.payload.attendance.length === 0 && action.payload.absent.length === 0)
			yield notificationService.error("Please select students");
		else {
			const response = yield call(ApiHelper.post, resources.admin.attendance.save, action.payload);
			yield notificationService.success("Saved successfully");
		}
	}catch (e) {
		yield notificationService.error(e);
	}
}

export function* getAttendance(action) {
	try{
		const response = yield call(ApiHelper.post, resources.admin.attendance.detail, action.payload);
		const {attendance, class_id, class_name, term, start_day} = response;
		var data = {};
		data['attendance'] = attendance;
		data['class_id'] = class_id;
		data['class_name'] = class_name;
		data['term'] = term;
		data['startday'] = start_day;

        yield all([
            put(push('/admin/attendance/detail')),
            put({
                type: ATTENDANCE.SEND_CLASS_STUDENT_ATTENDANCE,
                payload: data
            })
		]);
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* getTodayAttendance(action) {
	try{
        
			yield put({type: ATTENDANCE.ATTENDANCE_SEND_LOADING});
			const response = yield call(ApiHelper.post, resources.admin.attendance.detail, action.payload);
			const {attendance, class_id, class_name, term, start_day} = response;
	
			var data = {};
			data['attendance'] = attendance;
			data['class_id'] = class_id;
			data['class_name'] = class_name;
			data['term'] = term;
			data['startday'] = start_day;
	
			yield all([
				put(push('/admin/attendance/detail')),
				put({
					type: ATTENDANCE.SEND_CLASS_STUDENT_ATTENDANCE,
					payload: data
				})
			]);
			
		
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export default function* attendanceSaga() {
	yield takeLatest(ATTENDANCE.ATTENDANCE_GET_CLASSES_LIST, getClassesList);
	yield takeLatest(ATTENDANCE.SUBMIT_ATTENDANCE, saveAttendance);
	yield takeLatest(ATTENDANCE.REQUEST_CLASS_STUDENT_ATTENDANCE, getAttendance);
	yield takeLatest(ATTENDANCE.REQUEST_CURRENT_ATTENDANCE, getTodayAttendance);
}
