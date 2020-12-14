import { PROFILE } from './profileconstants';

export const requestAccountUpdate = data => ({
    type: PROFILE.REQUEST_ACCOUNT_UPDATE,
    payload: data
});

export const requestCardUpdate = data => ({
    type: PROFILE.REQUEST_CARD_UPDATE,
    payload: data
});

export const requestBankUpdate = data => ({
    type: PROFILE.REQUEST_BANK_UPDATE,
    payload: data
});

export const requestProfileDetail = data => ({
    type: PROFILE.REQUEST_PROFILE_DETAIL,
    payload: data
});
