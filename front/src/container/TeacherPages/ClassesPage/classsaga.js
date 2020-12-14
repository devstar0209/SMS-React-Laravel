import { push } from 'connected-react-router';
import { put, takeLatest, call, all } from 'redux-saga/effects';
import ApiHelper from '../../../Common/Services/ApiHelper';
import { TEACHER_CLASS } from './classconstants';
import resources from '../../../Common/Constants/resources';
import {
	notificationService,
} from '../../../Common/Services';

export function* getClassesList(action) {
	try {
		const response = yield call(ApiHelper.get, resources.teacher.class.list,action.payload);
		const {data} = response;
	
			yield put({
                type: TEACHER_CLASS.TEACHER_SEND_CLASSES_LIST,
                payload: data
			});

	} catch (e) {
		yield notificationService.error(e);
	}
}

export function* classDetail(action){
    try{
        yield put({type: TEACHER_CLASS.TEACHER_SEND_LOADING});
        const response = yield call(ApiHelper.get, resources.teacher.class.detail,action.payload);

        yield all([
            put(push('/page/classes/detail')),
            put({
                type: TEACHER_CLASS.TEACHER_SEND_CLASS_DETAIL,
                payload: response
            })
		]);

        
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export default function* classSaga() {
	yield takeLatest(TEACHER_CLASS.TEACHER_GET_CLASSES_LIST, getClassesList);
	yield takeLatest(TEACHER_CLASS.TEACHER_REQUEST_CLASS_DETAIL, classDetail);
}
