import { push } from 'connected-react-router';
import { put, takeLatest, call, all } from 'redux-saga/effects';
import ApiHelper from '../../../Common/Services/ApiHelper';
import { PLAYERCLASS } from './classconstants';
import resources from '../../../Common/Constants/resources';
import {
	notificationService,
} from '../../../Common/Services';

export function* getClassesList(action) {
	try {
		const response = yield call(ApiHelper.get, resources.player.class.list,action.payload);
		const {data} = response;
	
			yield put({
                type: PLAYERCLASS.SEND_PLAYER_CLASSES_LIST,
                payload: data
			});

	} catch (e) {
		yield notificationService.error(e);
	}
}

export function* checkOut(action){
    try{
        const response = yield call(ApiHelper.post, resources.player.class.checkout,action.payload);
		const {data} = response;

        yield all([
            notificationService.success('Booked the class successfully'),
		]);

    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* requestClassPayment(action){
    try{
        yield put({type: PLAYERCLASS.SEND_LOADING})
        yield all([
            put({
                type: PLAYERCLASS.GOTO_PLAYER_CLASS_PAYMENT,
                payload: action.payload
            })
		]);

        
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export default function* playerClassSaga() {
	yield takeLatest(PLAYERCLASS.GET_PLAYER_CLASSES_LIST, getClassesList);
	yield takeLatest(PLAYERCLASS.REQUEST_CLASS_PAYMENT, requestClassPayment);
	yield takeLatest(PLAYERCLASS.REQUEST_PLAYER_CHECKOUT, checkOut);
}
