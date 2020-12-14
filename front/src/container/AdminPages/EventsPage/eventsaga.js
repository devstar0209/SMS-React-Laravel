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
		const response = yield call(ApiHelper.get, resources.admin.event.list, action.payload);
		const { data} = response;
		
        yield put({
            type: EVENT.SEND_EVENTS_LIST,
            payload: data
        });

	} catch (e) {
		yield notificationService.error(e);
	}
}

export function* createEvent(action){
    try{
        const response = yield call(ApiHelper.post, resources.admin.event.create, action.payload);
        yield all([
            notificationService.success('Created new event successfully'),
            put(push('/admin/events')),
        ])
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* updateEvent(action){
    try{
        const response = yield call(ApiHelper.post, resources.admin.event.update, action.payload);

        yield all([
            notificationService.success('Updated the event successfully'),
            put(push('/admin/events')),
            
		]);

    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* deleteEvent(action){
    try{
        const response = yield call(ApiHelper.post, resources.admin.event.delete, action.payload);

        yield all([
            notificationService.success('Deleted the event successfully'),
			put(push('/admin/events')),
		]);
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* eventDetail(action){
    try{
        yield put({type: EVENT.SEND_LOADING});

        const response = yield call(ApiHelper.get, resources.admin.event.detail, action.payload);

        const {coaches, students, event} = response
        
        var data=[]
        data['event'] = event;
        data['coaches'] = coaches
        data['students'] = students


        yield all([
            put(push('/admin/events/detail')),
            put({
                type: EVENT.SEND_EVENT_DETAIL,
                payload: data
            })
		]);

        
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* gotoCreate(action){
    try{
        const response = yield call(ApiHelper.post, resources.admin.event.coaches, action.payload);
        const {coaches, students} = response

        var data=[]
        data['coaches'] = coaches
        data['students'] = students

        yield all([
            put({
                type:EVENT.SEND_EVENT_CREATE_ROUTE,
                payload: data
            }),
            put(push('/admin/events/create')),
        ])
        
    }catch (e) {
		yield notificationService.error(e);
	}
}
export default function* eventSaga() {
	yield takeLatest(EVENT.GET_EVENTS_LIST, getEventsList);
	yield takeLatest(EVENT.REQUEST_EVENT_DETAIL, eventDetail);
	yield takeLatest(EVENT.REQUEST_NEW_EVENT_CREATE, createEvent);
	yield takeLatest(EVENT.REQUEST_EVENT_UPDATE, updateEvent);
	yield takeLatest(EVENT.REQUEST_EVENT_DELETE, deleteEvent);
	yield takeLatest(EVENT.REQUEST_EVENT_CREATE_ROUTE, gotoCreate);
}
