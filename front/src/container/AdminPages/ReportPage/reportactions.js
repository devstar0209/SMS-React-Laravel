import { REPORT } from './reportconstants';

export const requestReport = data => ({
    type: REPORT.REQUEST_REPORT,
    payload: data
});
