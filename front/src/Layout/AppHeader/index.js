import React from 'react';

import cx from 'classnames';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import UserBox from './Components/UserBox';
// import SearchBox from './Components/SearchBox';

import HeaderLogo from '../AppLogo';

import {
	userSessionService,
} from '../../Common/Services';

import { securityService } from '../../Common/Services';
const Header = (props) => {
    const {user, logout, enableClosedSidebar, enableMobileMenu, enableMobileMenuSmall} = props
    const {toggleClosedSidebar, toggleClosedSmallerSidebar, toggleMobileMenu, toggleMobileMenuSmall } = props
    return (
    <div className="">
        <ReactCSSTransitionGroup
            component="div"
            className="app-header "
            transitionName="HeaderAnimation"
            transitionAppear={true}
            transitionAppearTimeout={1500}
            transitionEnter={false}
            transitionLeave={false}>
        <HeaderLogo 
            toggleClosedSidebar={toggleClosedSidebar}
            toggleClosedSmallerSidebar={toggleClosedSmallerSidebar}
            toggleMobileMenu={toggleMobileMenu}
            toggleMobileMenuSmall={toggleMobileMenuSmall}
            enableMobileMenu={enableMobileMenu}
            enableClosedSidebar={enableClosedSidebar}
        />
        { securityService.getToken() &&
        <div className={cx(
            "app-header__content ",
            {'header-mobile-open': enableMobileMenuSmall},
        )} >
            <div className="app-header-left">
                {/* <SearchBox/> */}
            </div>
            <div className="app-header-right">
                <UserBox user={userSessionService.getCachedUserInfo()['userprofile']} logout={logout}/>
            </div>
        </div>
        }
        </ReactCSSTransitionGroup>
    </div>
  );
}


export default Header;