import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import AuthenticationReducer from './container/Auth/authreducer';
import DashboardReducer from './container/AdminPages/DashboardPage/dashboardreducer';
import StudentReducer from './container/AdminPages/StudentsPage/studentsreducer';
import PlayerReducer from './container/AdminPages/PlayersPage/playersreducer';
import CoacheReducer from './container/AdminPages/CoachesPage/coachesreducer';
import EventReducer from './container/AdminPages/EventsPage/eventreducer';
import ClassReducer from './container/AdminPages/ClassesPage/classreducer';
import ProfileReducer from './container/AdminPages/ProfilePage/profilereducer';
import ReportReducer from './container/AdminPages/ReportPage/reportreducer';
import AttendanceReducer from './container/AdminPages/AttendancePage/classreducer';

import teacherStudentReducer from './container/TeacherPages/StudentsPage/studentsreducer';
import teacherEventReducer from './container/TeacherPages/EventsPage/eventreducer';
import teacherClassReducer from './container/TeacherPages/ClassesPage/classreducer';
import teacherAttendanceReducer from './container/TeacherPages/AttendancePage/classreducer';
import teacherProfileReducer from './container/TeacherPages/ProfilePage/profilereducer';

import parentKidReducer from './container/ParentPages/KidsPage/kidsreducer';
import kidEventReducer from './container/ParentPages/EventsPage/eventreducer';

import playerClassReducer from './container/PlayerPages/ClassesPage/classreducer';
import bookingClassReducer from './container/PlayerPages/BookingsPage/bookingreducer';
import membershipReducer from './container/PlayerPages/MembershipPage/membershipreducer';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  form: formReducer,
  authenticationReducer: AuthenticationReducer,
  dashboardReducer: DashboardReducer,
  studentReducer: StudentReducer,
  playerReducer: PlayerReducer,
  coacheReducer: CoacheReducer,
  eventReducer: EventReducer,
  classReducer: ClassReducer,
  profileReducer: ProfileReducer,
  reportReducer: ReportReducer,
  attendanceReducer: AttendanceReducer,

  teacherStudentReducer: teacherStudentReducer,
  teacherProfileReducer: teacherProfileReducer,
  teacherEventReducer: teacherEventReducer,
  teacherClassReducer: teacherClassReducer,
  teacherAttendanceReducer: teacherAttendanceReducer,

  parentKidReducer: parentKidReducer,
  kidEventReducer: kidEventReducer,

  playerClassReducer: playerClassReducer,
  bookingClassReducer: bookingClassReducer,
  membershipReducer: membershipReducer,
})

export default (state, action) => {
  let newState = state;

  return rootReducer(newState, action);
};
