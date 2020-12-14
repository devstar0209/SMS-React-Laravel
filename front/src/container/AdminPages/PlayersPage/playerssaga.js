import { push } from 'connected-react-router';
import { put, takeLatest, call, all } from 'redux-saga/effects';
import ApiHelper from '../../../Common/Services/ApiHelper';
import { PLAYERS } from './playersconstants';
import resources from '../../../Common/Constants/resources';
import {
	notificationService,
} from '../../../Common/Services';

export function* getPlayersList(action) {
	try {
		const response = yield call(ApiHelper.get, resources.admin.player.list, action.payload);
        const {data} = response;
            
        yield put({
            type: PLAYERS.SEND_PLAYERS_LIST,
            payload: data
        });

	} catch (e) {
		yield notificationService.error(e);
	}
}

export function* updatePlayer(action){
    try{
        const response = yield call(ApiHelper.post, resources.admin.player.update, action.payload);

        yield all([
            notificationService.success('Updated the player successfully'),
            put(push('/admin/players')),
            
		]);

    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* deletePlayer(action){
    try{
        const response = yield call(ApiHelper.post, resources.admin.player.delete, action.payload);

        yield all([
            notificationService.success('Deleted the player successfully'),
			put(push('/admin/players')),
		]);
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* playerDetail(action){
    try{
        yield put({type: PLAYERS.SEND_LOADING});

        const response = yield call(ApiHelper.get, resources.admin.player.detail, action.payload);

        const {data} = response;

        yield all([
            put(push('/admin/players/detail')),
            put({
                type: PLAYERS.SEND_PLAYER_DETAIL,
                payload: data
            })
		]);

        
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export function* approvePlayer(action){
    try{
        // yield put({type: PLAYERS.SEND_LOADING});
        const response = yield call(ApiHelper.post, resources.admin.player.approve, action.payload);

        const {data} = response;

        yield all([
            notificationService.success('Approved the player successfully'),
            put(push('/admin/players/detail')),
            put({
                type: PLAYERS.SEND_PLAYER_DETAIL,
                payload: data
            })
		]);

        
        
    }catch (e) {
		yield notificationService.error(e);
	}
}

export default function* playerSaga() {
	yield takeLatest(PLAYERS.GET_PLAYERS_LIST, getPlayersList);
	yield takeLatest(PLAYERS.REQUEST_PLAYER_DETAIL, playerDetail);
	yield takeLatest(PLAYERS.REQUEST_PLAYER_UPDATE, updatePlayer);
	yield takeLatest(PLAYERS.REQUEST_PLAYER_DELETE, deletePlayer);
	yield takeLatest(PLAYERS.REQUEST_PLAYER_APPROVE, approvePlayer);
}
