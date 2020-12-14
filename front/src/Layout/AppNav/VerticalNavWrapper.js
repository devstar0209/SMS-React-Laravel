import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';

import MetisMenu from 'react-metismenu';

import {AdminNav, InstructorNav, ParentNav, PlayerNav} from './NavItems';

import {
	userSessionService,
} from '../../Common/Services';
import NavMenu from './NavMenu';

class NavSide extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            popoverOpen: false,
        };
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen

        });
    }

    isPathActive(path) {
        // if(path.includes('students'))
        //     this.toggle();
        // else
            return this.props.location.pathname.startsWith(path);
    }

    renderContent(){
        const usergrade = userSessionService.getUserGrade();

        switch(usergrade) {
            case 0:
                return AdminNav;
            case 1:
                return InstructorNav;
            case 2:
                return PlayerNav;
            case 3:
                return ParentNav;
        }
    }

    render() {
        

        return (
            <Fragment>
                <NavMenu content={this.renderContent()} />
                {/* <MetisMenu content={this.renderContent()} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/> */}
            </Fragment>
        );
    }

    
}

export default withRouter(NavSide);