import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import WelcomePage from '../container/ParentPages/Welcome/WelcomePage';
import KidsPage from '../container/ParentPages/KidsPage';
import {KidCreatePage} from '../container/ParentPages/KidsPage/pages/Create';
import {KidDetailPage} from '../container/ParentPages/KidsPage/pages/Detail';
import ClassesPage from '../container/PlayerPages/ClassesPage';
import EventsPage from '../container/ParentPages/EventsPage';
import {EventsDetailPage} from '../container/ParentPages/EventsPage/pages/Detail';
import ProfilePage from '../container/AdminPages/ProfilePage';
import BookingsPage from '../container/PlayerPages/BookingsPage';


export default function PagesRoutes() {
    return (
        <Switch>
            <Route path="/parent/welcome" component={WelcomePage} />
            <Route path="/parent/classes" component={ClassesPage} />
            <Route exact path="/parent/events" component={EventsPage} />
            <Route path="/parent/events/detail" component={EventsDetailPage} />
            <Route exact path="/parent/kids" component={KidsPage} />
            <Route path="/parent/kids/create" component={KidCreatePage} />
            <Route path="/parent/kids/detail" component={KidDetailPage} />
            <Route path="/parent/profile" component={ProfilePage} />
            <Route path="/parent/booking" component={BookingsPage} />
        </Switch>
    );
}