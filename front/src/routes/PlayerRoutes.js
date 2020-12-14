import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import WelcomePage from '../container/PlayerPages/Welcome/WelcomePage';
import ClassesPage from '../container/PlayerPages/ClassesPage';
import PaymentPage from '../container/PlayerPages/ClassesPage/pages/Payment';
import BookingsPage from '../container/PlayerPages/BookingsPage';
import ProfilePage from '../container/AdminPages/ProfilePage'

export default function PagesRoutes() {
    return (
        <Switch>
            <Route path="/player/welcome" component={WelcomePage} />
            <Route path="/player/classes" component={ClassesPage} />
            <Route path="/player/payment" component={PaymentPage} />
            <Route path="/player/booking" component={BookingsPage} />
            <Route path="/player/profile" component={ProfilePage} />
        </Switch>
    );
}