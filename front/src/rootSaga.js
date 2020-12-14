import { all } from 'redux-saga/effects';
import authSaga from './container/Auth/authsaga';
import dashboardSaga from './container/AdminPages/DashboardPage/dashboardsaga'
import studentSaga from './container/AdminPages/StudentsPage/studentssaga'
import playerSaga from './container/AdminPages/PlayersPage/playerssaga'
import coachesSaga from './container/AdminPages/CoachesPage/coachessaga'
import eventSaga from './container/AdminPages/EventsPage/eventsaga'
import classSaga from './container/AdminPages/ClassesPage/classsaga'
import profileSaga from './container/AdminPages/ProfilePage/profilesaga'
import reportSaga from './container/AdminPages/ReportPage/reportsaga'
import attendanceSaga from './container/AdminPages/AttendancePage/classsaga'

import teacherstudentSaga from './container/TeacherPages/StudentsPage/studentssaga'
import teachereventSaga from './container/TeacherPages/EventsPage/eventsaga'
import teacherattendanceSaga from './container/TeacherPages/AttendancePage/classsaga'
import teacherclassSaga from './container/TeacherPages/ClassesPage/classsaga'
import teacherprofileSaga from './container/TeacherPages/ProfilePage/profilesaga'

import parentKidSaga from './container/ParentPages/KidsPage/kidssaga'
import kidEventSaga from './container/ParentPages/EventsPage/eventsaga'

import playerClassSaga from './container/PlayerPages/ClassesPage/classsaga'
import bookingClassSaga from './container/PlayerPages/BookingsPage/bookingsaga'
import membershipSaga from './container/PlayerPages/MembershipPage/membershipsaga'

export default function * rootSaga() {
    yield all([
        authSaga(),
        dashboardSaga(),
        studentSaga(),
        playerSaga(),
        coachesSaga(),
        eventSaga(),
        classSaga(),
        profileSaga(),
        reportSaga(),
        attendanceSaga(),

        teacherclassSaga(),
        teacherstudentSaga(),
        teachereventSaga(),
        teacherprofileSaga(),
        teacherattendanceSaga(),

        parentKidSaga(),
        kidEventSaga(),

        playerClassSaga(),
        bookingClassSaga(),
        membershipSaga()
    ])
}