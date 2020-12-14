import { PLAYERS } from './playersconstants';

import {
	securityService,
} from '../../../Common/Services';

export const initialState = {
};

export default function (state = initialState, action) {

	switch (action.type) {
		
		case PLAYERS.SEND_PLAYERS_LIST:
			return {
                ...state,
                players: action.payload
			};
		case PLAYERS.SEND_PLAYER_DETAIL:
			return {
                ...state,
                player: action.payload,
			};
		case PLAYERS.SEND_LOADING:
			return {
				loading: true
			};
		
		default:
			return state;
	}
}
