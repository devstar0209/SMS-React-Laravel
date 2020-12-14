import { push } from 'connected-react-router';
import { put, takeLatest, call, all } from 'redux-saga/effects';
import ApiHelper from '../../../Common/Services/ApiHelper';
import { KIDEVENT } from './eventconstants';
import resources from '../../../Common/Constants/resources';
import {
	notificationService,
} from '../../../Common/Services';

export function* getEventsList(action) {
	try {
		const response = yield call(ApiHelper.get, resources.parent.event.list, action.payload);
		const { data} = response;
		
        yield put({
            type: KIDEVENT.SEND_KIDEVENTS_LIST,
            payload: data
        });

	} catch (e) {
		yield notificationService.error(e);
	}
}

export function* eventDetail(action){
    try{
        yield put({type: KIDEVENT.SEND_LOADING});

        const response = yield call(ApiHelper.get, resources.parent.event.detail, action.payload);

        const {coaches, students, event} = response
        
        var data=[]
        data['event'] = event;
        data['coaches'] = coaches
        data['students'] = students


        yield all([
            put(push('/parent/events/detail')),
            put({
                type: KIDEVENT.SEND_KIDEVENT_DETAIL,
                payload: data
            })
		]);

        
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export default function* kidEventSaga() {
	yield takeLatest(KIDEVENT.GET_KIDEVENTS_LIST, getEventsList);
	yield takeLatest(KIDEVENT.REQUEST_KIDEVENT_DETAIL, eventDetail);
}
