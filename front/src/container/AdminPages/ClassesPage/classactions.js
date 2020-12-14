import { CLASS } from './classconstants';

export const getClassesList = data => ({
	type: CLASS.GET_CLASSES_LIST,
	payload: data,
});

export const requestClassCreate = data => ({
    type: CLASS.REQUEST_NEW_CLASS_CREATE,
    payload: data
});

export const requestClassUpdate = data => ({
    type: CLASS.REQUEST_CLASS_UPDATE,
    payload: data
});

export const requestClassDelete = data => ({
    type: CLASS.REQUEST_CLASS_DELETE,
    payload: data
});

export const requestClassDetail = data => ({
    type: CLASS.REQUEST_CLASS_DETAIL,
    payload: data
});

export const requestGotoCreate = data => ({
    type: CLASS.REQUEST_CLASS_CREATE_ROUTE,
    payload: data
});