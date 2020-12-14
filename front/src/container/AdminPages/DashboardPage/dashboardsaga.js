import { push } from 'connected-react-router';
import { put, takeLatest, call, all } from 'redux-saga/effects';
import ApiHelper from '../../../Common/Services/ApiHelper';
import { DASHBOARD } from './dashboardconstants';
import resources from '../../../Common/Constants/resources';
import {
	notificationService,
} from '../../../Common/Services';

export function* getInitialData(action) {
	try {
		const response = yield call(ApiHelper.get, resources.admin.init, action.payload);
		const { checkouthistory, inactivestudents, members } = response;
		
            const tabledata=[]
            const attendance = 96

            var data = {
                'tabledata': tabledata,
                'attendance': attendance,
                'checkouthistory': checkouthistory,
                'inactivestudents': inactivestudents,
                'members': members,
            }
	
			yield put({
                type: DASHBOARD.SEND_INITAIL_DATA,
                payload: data
			});

            
		// }
		

	} catch (e) {
		yield notificationService.error(e);
	}
}

export function* requestApprove(action) {
    try{
        const response = yield call(ApiHelper.post, resources.admin.member.approve, action.payload);
        const {members} = response
        yield put({
            type: DASHBOARD.APPROVED_AS_MEMBER,
            payload: members
        });
        yield notificationService.success("Approved successfully");
    }catch (e) {
		yield notificationService.error(e);
	}
}

export default function* dashboardSaga() {
	yield takeLatest(DASHBOARD.GET_INITIAL_DATA, getInitialData);
	yield takeLatest(DASHBOARD.APPROVE_AS_MEMBER, requestApprove);
}
