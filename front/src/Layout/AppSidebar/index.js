import React, {Component, Fragment} from 'react';

import Nav from '../AppNav/VerticalNavWrapper';
import HeaderLogo from '../AppLogo';
import {
	securityService,
} from '../../Common/Services';

import './style.scss'

class AppSidebar extends Component {

    state = {};

    render() {

        return (
            <Fragment>
                <div className="sidebar-mobile-overlay" onClick={this.props.toggleMobileMenu}/>
                <div className="app-sidebar" style={{padding: 25}}>
                    <div className="box">
                        <HeaderLogo/>
                        <div className="app-sidebar__inner">
                            {securityService.getToken() &&
                                <Nav/>
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default AppSidebar;