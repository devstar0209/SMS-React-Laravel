import React, {Fragment} from 'react';

import {
    Nav, Col, Row, Button, NavItem, NavLink
} from 'reactstrap';

import {
    faAngleDown, 

} from '@fortawesome/free-solid-svg-icons';

import {actions as userActions} from '../../../container/Auth';

import classnames from 'classnames';

class TopMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            activeTab: '1',
        };

    }

    /* notify2 = () => this.toastId = toast("You don't have any new items in your calendar for today! Go out and play!", {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: 'bottom-center',
        type: 'success'
    }); */

    logout() {
        userActions.logout()
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {

        return (
            <div className="">
            </div>
        )
    }
}

export default TopMenu;