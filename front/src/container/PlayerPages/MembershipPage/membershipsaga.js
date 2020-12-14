import { put, takeLatest, call, all } from 'redux-saga/effects';
import ApiHelper from '../../../Common/Services/ApiHelper';
import { MEMBERSHIP } from './membershipconstants';
import resources from '../../../Common/Constants/resources';
import {
	notificationService,
} from '../../../Common/Services';

export function* sendMembershipData(action) {
	try {
		const response = yield call(ApiHelper.post, resources.player.member.data, action.payload);
		const {member_fee} = response;
	
			yield put({
                type: MEMBERSHIP.SEND_MEMBERSHIP_DATA_SUCCESS,
                payload: member_fee
			});

	} catch (e) {
		yield notificationService.error(e);
	}
}


export function* sendMembershipFee(action){
    try{
        const response = yield call(ApiHelper.post, resources.player.member.fee, action.payload);
        // const {data} = response;
        
        yield all([
            put({
                type: MEMBERSHIP.PAY_MEMBERSHIP_FEE_SUCCESS,
                payload: true
            })
		]);

        
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export default function* membershipSaga() {
	yield takeLatest(MEMBERSHIP.SEND_MEMBERSHIP_DATA, sendMembershipData);
	yield takeLatest(MEMBERSHIP.PAY_MEMBERSHIP_FEE, sendMembershipFee);
}
