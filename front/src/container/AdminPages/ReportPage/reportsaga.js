import { push } from 'connected-react-router';
import { put, takeLatest, call, all } from 'redux-saga/effects';
import ApiHelper from '../../../Common/Services/ApiHelper';
import { REPORT } from './reportconstants';
import resources from '../../../Common/Constants/resources';
import {
	notificationService, userSessionService
} from '../../../Common/Services';

export function* requestReport(action){
    try{
        const response = yield call(ApiHelper.get, resources.admin.report, action.payload);
        const {data} = response;

        yield put({
                type: REPORT.SEND_REPORT_DATA,
                payload: data
            });

        
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export default function* reportSaga() {
	yield takeLatest(REPORT.REQUEST_REPORT, requestReport);
}
