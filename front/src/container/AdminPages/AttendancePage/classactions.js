import { ATTENDANCE } from './classconstants';

export const getClassesList = data => ({
	type: ATTENDANCE.ATTENDANCE_GET_CLASSES_LIST,
	payload: data,
});

export const requestClassStudentAttendance = data => ({
    type: ATTENDANCE.REQUEST_CLASS_STUDENT_ATTENDANCE,
    payload: data
})

export const requestTodayAttendance = data => ({
    type: ATTENDANCE.REQUEST_CURRENT_ATTENDANCE,
    payload: data
})

export const submitAttendance = data => ({
    type: ATTENDANCE.SUBMIT_ATTENDANCE,
    payload: data
})