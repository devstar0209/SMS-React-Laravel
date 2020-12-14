import { push } from 'connected-react-router';
import { put, takeLatest, call, all } from 'redux-saga/effects';
import ApiHelper from '../../../Common/Services/ApiHelper';
import { CLASS } from './classconstants';
import resources from '../../../Common/Constants/resources';
import {
	notificationService,
} from '../../../Common/Services';

export function* getClassesList(action) {
	try {
		const response = yield call(ApiHelper.get, resources.admin.class.list,action.payload);
		const {data} = response;
	
			yield put({
                type: CLASS.SEND_CLASSES_LIST,
                payload: data
			});

	} catch (e) {
		yield notificationService.error(e);
	}
}

export function* createClass(action){
    try{
        const response = yield call(ApiHelper.post, resources.admin.class.create,action.payload);
		const {data} = response;

        yield all([
            notificationService.success('Created new class successfully'),
            put(push('/admin/classes')),
        ])
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* updateClass(action){
    try{
        const response = yield call(ApiHelper.post, resources.admin.class.update,action.payload);

        // yield all([
        //     notificationService.success('Updated the class successfully'),
        //     // put(push('/admin/classes')),
            
        // ]);
        yield notificationService.success('Updated the class successfully');
        // yield put(push('/admin/classes'));
        

    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* deleteClass(action){
    try{
        const response = yield call(ApiHelper.post, resources.admin.class.delete,action.payload);
		const {data} = response;

        yield all([
            notificationService.success('Deleted the class successfully'),
			put(push('/admin/classes')),
		]);
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* classDetail(action){
    try{
        yield put({type: CLASS.SEND_LOADING});
        const response = yield call(ApiHelper.get, resources.admin.class.detail,action.payload);
		const {classes, coaches, students} = response;

        var data = [];
        data['class'] = classes;
        data['coaches'] = coaches;
        data['students'] = students;

        yield all([
            put(push('/admin/classes/detail')),
            put({
                type: CLASS.SEND_CLASS_DETAIL,
                payload: data
            })
		]);

        
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* gotoCreate(action){
    try{
        const response = yield call(ApiHelper.post, resources.admin.class.coaches, action.payload);
        const {data} = response;

        yield all([
            put({
                type:CLASS.SEND_CLASS_CREATE_ROUTE,
                payload: data
            }),
            put(push('/admin/classes/create')),
        ]);

        // if(data.length === 0)
        //     yield notificationService.error("There is no coaches. please add coaches.");
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export default function* eventSaga() {
	yield takeLatest(CLASS.GET_CLASSES_LIST, getClassesList);
	yield takeLatest(CLASS.REQUEST_CLASS_DETAIL, classDetail);
	yield takeLatest(CLASS.REQUEST_NEW_CLASS_CREATE, createClass);
	yield takeLatest(CLASS.REQUEST_CLASS_UPDATE, updateClass);
	yield takeLatest(CLASS.REQUEST_CLASS_DELETE, deleteClass);
	yield takeLatest(CLASS.REQUEST_CLASS_CREATE_ROUTE, gotoCreate);
}
