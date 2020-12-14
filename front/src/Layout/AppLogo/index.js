import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import {Link} from 'react-router-dom'

import Hamburger from 'react-hamburgers';

 import AppMobileMenu from '../AppMobileMenu';

//  import {
//     setEnableClosedSidebar,
//     setEnableMobileMenu,
//     setEnableMobileMenuSmall,
// } from '../../reducers/ThemeOptions'; 

import {logo_color} from '../../Common/Assets/Icons'

class HeaderLogo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            mobile: false,
            activeSecondaryMenuMobile: false
        };

    }

    state = {
        openLeft: false,
        openRight: false,
        relativeWidth: false,
        width: 280,
        noTouchOpen: false,
        noTouchClose: false,
    };

    render() {
        let {
            enableClosedSidebar,
            enableMobileMenu
        } = this.props;

        const {toggleClosedSidebar} = this.props

        // const {
        // } = this.state;

        return (
            <Fragment>
                <div className="app-header__logo">
                    <div className="logo-src" style={{width: '100%'}}>
                        <Link to="/">
                            <img src={logo_color} height="50"/>
                        </Link>
                    </div>
                    <div className="header__pane ml-auto">
                        <div onClick={toggleClosedSidebar}>
                            <Hamburger
                                active={this.state.active}
                                // active={enableClosedSidebar}
                                type="elastic"
                                onClick={() => this.setState({active: !this.state.active})}
                            />
                        </div>
                    </div>
                </div>
                <AppMobileMenu
                    toggleClosedSidebar={this.props.toggleClosedSidebar}
                    toggleClosedSmallerSidebar={this.props.toggleClosedSmallerSidebar}
                    toggleMobileMenu={this.props.toggleMobileMenu}
                    toggleMobileMenuSmall={this.props.toggleMobileMenuSmall}
                />
            </Fragment>
        )
    }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogo);