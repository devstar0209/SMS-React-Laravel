import { CLASS } from './classconstants';

export const getClassesList = data => ({
	type: CLASS.TEACHER_GET_CLASSES_LIST,
	payload: data,
});

export const requestClassStudentAttendance = data => ({
    type: CLASS.TEACHER_REQUEST_CLASS_STUDENT_ATTENDANCE,
    payload: data
})

export const requestPrevWeekAttendance = data => ({
    type: CLASS.REQUEST_PREV_WEEK_ATTENDANCE,
    payload: data
})

export const requestNextWeekAttendance = data => ({
    type: CLASS.REQUEST_NEXT_WEEK_ATTENDANCE,
    payload: data
})

export const requestTodayAttendance = data => ({
    type: CLASS.REQUEST_TODAY_ATTENDANCE,
    payload: data
})

export const submitAttendance = data => ({
    type: CLASS.TEACHER_SUBMIT_ATTENDANCE,
    payload: data
})