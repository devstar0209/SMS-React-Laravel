import React, {Fragment, Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ResizeDetector from 'react-resize-detector';
import cx from 'classnames'

import AppHeader from '../AppHeader';
import AppSidebar from '../AppSidebar';


class AppContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            enableClosedSidebar: false,
            closedSmallerSidebar: false,
            enableMobileMenu: false,
            enableMobileMenuSmall: false
        }

        this.toggleClosedSidebar = this.toggleClosedSidebar.bind(this);
        this.toggleClosedSmallerSidebar = this.toggleClosedSmallerSidebar.bind(this);
        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
        this.toggleMobileMenuSmall = this.toggleMobileMenuSmall.bind(this);
    }

    toggleClosedSidebar(e){
        e.preventDefault();
        this.setState({enableClosedSidebar: !this.state.enableClosedSidebar});
    }

    toggleClosedSmallerSidebar(e){
        e.preventDefault();
        this.setState({closedSmallerSidebar: !this.state.closedSmallerSidebar});
    }

    toggleMobileMenu(e){
        e.preventDefault();
        this.setState({enableMobileMenu: !this.state.enableMobileMenu});
    }

    toggleMobileMenuSmall(e){
        e.preventDefault();
        this.setState({enableMobileMenuSmall: !this.state.enableMobileMenuSmall});
    }

    render() {
        return (
            <ResizeDetector
                handleWidth
                render={({ width }) => (
                    <Fragment>
                        <div className={cx(
                                    "app-container fixed-sidebar", 
                                    {'closed-sidebar': this.state.enableClosedSidebar || width < 1250},
                                    // {'fixed-sidebar': enableFixedSidebar || width < 1250},
                                    {'closed-sidebar-mobile': this.state.closedSmallerSidebar || width < 1250},
                                    {'sidebar-mobile-open': this.state.enableMobileMenu},
                                )}>
                            <AppHeader logout={this.props.logout}
                                toggleClosedSidebar={this.toggleClosedSidebar}
                                toggleClosedSmallerSidebar={this.toggleClosedSmallerSidebar}
                                toggleMobileMenu={this.toggleMobileMenu}
                                toggleMobileMenuSmall={this.toggleMobileMenuSmall}
                                enableMobileMenu={this.state.enableMobileMenu}
                                enableMobileMenuSmall={this.state.enableMobileMenuSmall}
                                enableClosedSidebar={this.state.enableClosedSidebar}
                            />
                            <div className="app-main">
                                <AppSidebar 
                                toggleMobileMenu={this.toggleMobileMenu}
                                enableMobileMenu={this.state.enableMobileMenu}/>
                                <div className="app-main__outer">
                                    <div className="">
                                        {this.props.children}
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </Fragment> 
                )}
            />
        );
    }
}

export default  AppContainer ;