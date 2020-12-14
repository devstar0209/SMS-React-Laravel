import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import WelcomePage from '../container/TeacherPages/Welcome/WelcomePage';
import ClassesPage from '../container/TeacherPages/ClassesPage';
import {ClassDetailPage} from '../container/TeacherPages/ClassesPage/pages/Detail';
import AttendancePage from '../container/TeacherPages/AttendancePage';
import {ClassAttendancePage} from '../container/TeacherPages/AttendancePage/pages/Attendance';
import StudentsPage from '../container/TeacherPages/StudentsPage';
import {StudentDetailPage} from '../container/TeacherPages/StudentsPage/pages/Detail';
import EventsPage from '../container/TeacherPages/EventsPage';
import {EventsDetailPage} from '../container/TeacherPages/EventsPage/pages/Detail';
import ProfilePage from '../container/TeacherPages/ProfilePage';


export default function PagesRoutes() {
    return (
        <Switch>
            <Route path="/page/welcome" component={WelcomePage} />
            <Route exact path="/page/classes" component={ClassesPage} />
            <Route path="/page/classes/detail" component={ClassDetailPage} />
            <Route exact path="/page/attendance" component={AttendancePage} />
            <Route path="/page/attendance/detail" component={ClassAttendancePage} />
            <Route exact path="/page/events" component={EventsPage} />
            <Route path="/page/events/detail" component={EventsDetailPage} />
            <Route exact path="/page/students" component={StudentsPage} />
            <Route path="/page/students/detail" component={StudentDetailPage} />
            <Route path="/page/profile" component={ProfilePage} />
        </Switch>
    );
}