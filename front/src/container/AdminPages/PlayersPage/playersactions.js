import { PLAYERS } from './playersconstants';

export const getPlayersList = data => ({
	type: PLAYERS.GET_PLAYERS_LIST,
	payload: data,
});


export const requestPlayerUpdate = data => ({
    type: PLAYERS.REQUEST_PLAYER_UPDATE,
    payload: data
});

export const requestPlayerApprove = data => ({
    type: PLAYERS.REQUEST_PLAYER_APPROVE,
    payload: data
});

export const requestPlayerDelete = data => ({
    type: PLAYERS.REQUEST_PLAYER_DELETE,
    payload: data
});

export const requestPlayerDetail = data => ({
    type: PLAYERS.REQUEST_PLAYER_DETAIL,
    payload: data
});