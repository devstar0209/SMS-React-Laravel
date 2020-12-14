import { MEMBERSHIP } from './membershipconstants';

export const sendMembershipData = data => ({
	type: MEMBERSHIP.SEND_MEMBERSHIP_DATA,
	payload: data,
});

export const sendMembershipFee = data => ({
    type: MEMBERSHIP.PAY_MEMBERSHIP_FEE,
    payload: data
});
