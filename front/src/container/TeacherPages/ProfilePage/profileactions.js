import { PROFILE } from './profileconstants';

export const requestProfileUpdate = data => ({
    type: PROFILE.TEACHER_REQUEST_PROFILE_UPDATE,
    payload: data
});

export const requestProfileDetail = data => ({
    type: PROFILE.TEACHER_REQUEST_PROFILE_DETAIL,
    payload: data
});
