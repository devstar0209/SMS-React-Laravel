import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { DashboardPage } from '../container/AdminPages/DashboardPage';

import ClassesPage from '../container/AdminPages/ClassesPage';
import { ClassDetailPage } from '../container/AdminPages/ClassesPage/pages/Detail';
import { ClassCreatePage } from '../container/AdminPages/ClassesPage/pages/Create';

import  StudentsPage  from '../container/AdminPages/StudentsPage';
import {StudentDetailPage} from '../container/AdminPages/StudentsPage/pages/Detail';
import {StudentCreatePage} from '../container/AdminPages/StudentsPage/pages/Create';

import CoachesPage from '../container/AdminPages/CoachesPage';
import { CoachesCreatePage } from '../container/AdminPages/CoachesPage/pages/Create';
import { CoachesDetailPage } from '../container/AdminPages/CoachesPage/pages/Detail';

import PlayersPage from '../container/AdminPages/PlayersPage';
import { PlayerDetailPage } from '../container/AdminPages/PlayersPage/pages/Detail';

import EventsPage from '../container/AdminPages/EventsPage';
import { EventsCreatePage } from '../container/AdminPages/EventsPage/pages/Create';
import { EventsDetailPage } from '../container/AdminPages/EventsPage/pages/Detail';

import ReportPage from '../container/AdminPages/ReportPage';
import ProfilePage from '../container/AdminPages/ProfilePage';

import AttendancePage from '../container/AdminPages/AttendancePage';
import {ClassAttendancePage} from '../container/AdminPages/AttendancePage/pages/Attendance';


export default function AdminRoutes() {
    return (
        <Switch>
            <Route path="/admin/dashboard" component={DashboardPage} />
            <Route exact path="/admin/classes" component={ClassesPage} />
            <Route path="/admin/classes/create" component={ClassCreatePage} />
            <Route path="/admin/classes/detail" component={ClassDetailPage} />
            <Route exact path="/admin/students" component={StudentsPage} />
            <Route path="/admin/students/detail" component={StudentDetailPage} />
            <Route path="/admin/students/create" component={StudentCreatePage} />
            <Route exact path="/admin/players" component={PlayersPage} />
            <Route path="/admin/players/detail" component={PlayerDetailPage} />
            <Route exact path="/admin/coaches" component={CoachesPage} />
            <Route path="/admin/coaches/create" component={CoachesCreatePage} />
            <Route path="/admin/coaches/detail" component={CoachesDetailPage} />
            <Route exact path="/admin/events" component={EventsPage} />
            <Route path="/admin/events/create" component={EventsCreatePage} />
            <Route path="/admin/events/detail" component={EventsDetailPage} />
            <Route path="/admin/reports" component={ReportPage} />
            <Route path="/admin/profile" component={ProfilePage} />
            <Route exact path="/admin/attendance" component={AttendancePage} />
            <Route path="/admin/attendance/detail" component={ClassAttendancePage} />
        </Switch>
    );
}