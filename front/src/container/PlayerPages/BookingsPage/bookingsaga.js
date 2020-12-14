import { push } from 'connected-react-router';
import { put, takeLatest, call, all } from 'redux-saga/effects';
import ApiHelper from '../../../Common/Services/ApiHelper';
import { BOOKINGCLASS } from './bookingconstants';
import resources from '../../../Common/Constants/resources';
import {
	notificationService,
} from '../../../Common/Services';

export function* getClassesList(action) {
	try {
		const response = yield call(ApiHelper.get, resources.player.bookings.list,action.payload);
		const {data} = response;
	
			yield put({
                type: BOOKINGCLASS.SEND_BOOKING_CLASSES_LIST,
                payload: data
			});

	} catch (e) {
		yield notificationService.error(e);
	}
}

export function* updateClass(action){
    // try{
    //     const response = yield call(ApiHelper.post, resources.booking.class.update,action.payload);
	// 	const {data} = response;

    //     yield all([
    //         notificationService.success('Updated the class successfully'),
    //         // put(push('/BOOKING/classes')),
            
	// 	]);

    // }catch (e) {
	// 	yield notificationService.error(e);
	// }
}

export function* deleteClass(action){
    // try{
    //     const response = yield call(ApiHelper.post, resources.booking.class.delete,action.payload);
	// 	const {data} = response;

    //     yield all([
    //         notificationService.success('Deleted the class successfully'),
	// 		put(push('/booking/classes')),
	// 	]);
        
    // }catch (e) {
	// 	yield notificationService.error(e);
	// }
}

export default function* bookingSaga() {
	yield takeLatest(BOOKINGCLASS.GET_BOOKING_CLASSES_LIST, getClassesList);
	yield takeLatest(BOOKINGCLASS.REQUEST_BOOKING_CLASS_UPDATE, updateClass);
	yield takeLatest(BOOKINGCLASS.REQUEST_BOOKING_CLASS_DELETE, deleteClass);
}
