import { push } from 'connected-react-router';
import { put, takeLatest, call, all } from 'redux-saga/effects';
import ApiHelper from '../../../Common/Services/ApiHelper';
import { PROFILE } from './profileconstants';
import resources from '../../../Common/Constants/resources';
import {
	notificationService, userSessionService
} from '../../../Common/Services';


export function* updateCardPayment(action){
    try{
        const response = yield call(ApiHelper.post, resources.profile.card_payment_update, action.payload);
        const {message, data} = response;
    
        yield all([
            notificationService.success(message),
            put({
                type: PROFILE.SEND_PROFILE_DETAIL,
                payload: data
            }),
        ]);
    
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* updateBankPayment(action){
    try{
        const response = yield call(ApiHelper.post, resources.profile.bank_payment_update, action.payload);
        const {message, data} = response;
    
        yield all([
            notificationService.success(message),
            put({
                type: PROFILE.SEND_PROFILE_DETAIL,
                payload: data
            }),
        ]);
    
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* updateAccount(action){
    try{
        const response = yield call(ApiHelper.post, resources.profile.account_update, action.payload);
        const {data, message} = response;
        if(data != null) {
            
            const {school} = data;
    
            var user = {}
    
            user = userSessionService.getCachedUserInfo();
            user['school'] = school;
    
            userSessionService.setCachedUserInfo(user);
            yield all([
                put({
                    type: PROFILE.SEND_PROFILE_DETAIL,
                    payload: data
                }),
                notificationService.success(message),
                
            ]);
        }
        else{
            yield all([
                notificationService.error('Something error'),
                
            ]);
        }


    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* profileDetail(action){
    try{
        const response = yield call(ApiHelper.get, resources.profile.detail, action.payload);
        const {data} = response;

        yield put({
                type: PROFILE.SEND_PROFILE_DETAIL,
                payload: data
            });

        
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export default function* PROFILESaga() {
	yield takeLatest(PROFILE.REQUEST_PROFILE_DETAIL, profileDetail);
	yield takeLatest(PROFILE.REQUEST_ACCOUNT_UPDATE, updateAccount);
	yield takeLatest(PROFILE.REQUEST_CARD_UPDATE, updateCardPayment);
	yield takeLatest(PROFILE.REQUEST_BANK_UPDATE, updateBankPayment);
}
