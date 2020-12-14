import { push } from 'connected-react-router';
import { put, takeLatest, call, all } from 'redux-saga/effects';
import {generate} from 'generate-password'
import ApiHelper from '../../../Common/Services/ApiHelper';
import { COACHES } from './coachesconstants';
import resources from '../../../Common/Constants/resources';
import {
	notificationService,
} from '../../../Common/Services';

export function* getCoachesList(action) {
	try {
		const response = yield call(ApiHelper.get, resources.admin.coache.list, action.payload);
        const {data} = response;
            
        yield put({
            type: COACHES.SEND_COACHES_LIST,
            payload: data
        });

	} catch (e) {
		yield notificationService.error(e);
	}
}

export function* createCoache(action){
    try{
        const response = yield call(ApiHelper.post, resources.admin.coache.create, action.payload);
        yield all([
            notificationService.success('Created new coache successfully'),
            put(push('/admin/coaches')),
        ])
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* updateCoache(action){
    try{
        const response = yield call(ApiHelper.post, resources.admin.coache.update, action.payload);

        yield all([
            notificationService.success('Updated the coache successfully'),
            put(push('/admin/coaches')),
            
		]);

    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* deleteCoache(action){
    try{
        const response = yield call(ApiHelper.post, resources.admin.coache.delete, action.payload);

        yield all([
            notificationService.success('Deleted the coache successfully'),
			put(push('/admin/coaches')),
		]);
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* coacheDetail(action){
    try{
        yield put({type: COACHES.SEND_LOADING});

        const response = yield call(ApiHelper.get, resources.admin.coache.detail, action.payload);

        const {data} = response;

        yield all([
            put(push('/admin/coaches/detail')),
            put({
                type: COACHES.SEND_COACHE_DETAIL,
                payload: data
            })
		]);

        
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* gotoCreate(action){
    try{
        // const response = yield call(ApiHelper.post, resources.getClasses, action.payload);
        const classes = [{id: 0, type: 'class1', area: 'room1'},
                        {id: 1, type: 'class2', area: 'room2'},];
        var data=[]
        data['classes'] = classes

        yield all([
            put({
                type:COACHES.SEND_COACHE_CREATE_ROUTE,
                payload: classes
            }),
            put(push('/admin/coaches/create')),
        ])
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* createPassword(action) {
    var password = generate({
        length: 10,
        numbers: true,
        uppercase: true,
        lowercase: true,
        symbols: true
    });

    var data = action.payload;
    data.password = password

    yield put({
        type: COACHES.SEND_PASSWORD,
        payload: data
    });
}

export default function* coachesSaga() {
	yield takeLatest(COACHES.GET_COACHES_LIST, getCoachesList);
	yield takeLatest(COACHES.REQUEST_COACHE_DETAIL, coacheDetail);
	yield takeLatest(COACHES.REQUEST_NEW_COACHE_CREATE, createCoache);
	yield takeLatest(COACHES.REQUEST_COACHE_UPDATE, updateCoache);
	yield takeLatest(COACHES.REQUEST_COACHE_DELETE, deleteCoache);
	yield takeLatest(COACHES.REQUEST_COACHE_CREATE_ROUTE, gotoCreate);
	yield takeLatest(COACHES.CREATE_PASSWORD, createPassword);
}
