import { push } from 'connected-react-router';
import { put, takeLatest, call, all } from 'redux-saga/effects';
import ApiHelper from '../../../Common/Services/ApiHelper';
import { EVENT } from './eventconstants';
import resources from '../../../Common/Constants/resources';
import {
	notificationService,
} from '../../../Common/Services';

export function* getEventsList(action) {
	try {
		const response = yield call(ApiHelper.get, resources.teacher.event.list, action.payload);
		const { data} = response;
		
        yield put({
            type: EVENT.TEACHER_SEND_EVENTS_LIST,
            payload: data
        });

	} catch (e) {
		yield notificationService.error(e);
	}
}

export function* eventDetail(action){
    try{
        yield put({type: EVENT.TEACHER_SEND_LOADING});

        const response = yield call(ApiHelper.get, resources.teacher.event.detail, action.payload);

        const {students, event} = response
        
        var data=[]
        data['event'] = event;
        data['students'] = students


        yield all([
            put(push('/page/events/detail')),
            put({
                type: EVENT.TEACHER_SEND_EVENT_DETAIL,
                payload: data
            })
		]);

        
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export default function* eventSaga() {
	yield takeLatest(EVENT.TEACHER_GET_EVENTS_LIST, getEventsList);
	yield takeLatest(EVENT.TEACHER_REQUEST_EVENT_DETAIL, eventDetail);
}
