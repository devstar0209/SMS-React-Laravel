import { STUDENT } from './studentsconstants';

export const getStudentList = data => ({
	type: STUDENT.TEACHER_GET_STUDENTS_LIST,
	payload: data,
});

export const requestStudentDetail = data => ({
    type: STUDENT.TEACHER_REQUEST_STUDENT_DETAIL,
    payload: data
});

