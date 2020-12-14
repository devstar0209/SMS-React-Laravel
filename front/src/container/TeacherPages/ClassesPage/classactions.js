import { TEACHER_CLASS } from './classconstants';

export const getClassesList = data => ({
	type: TEACHER_CLASS.TEACHER_GET_CLASSES_LIST,
	payload: data,
});

export const requestClassDetail = data => ({
    type: TEACHER_CLASS.TEACHER_REQUEST_CLASS_DETAIL,
    payload: data
});