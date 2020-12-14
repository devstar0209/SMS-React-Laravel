import React, {Fragment} from 'react';
import {connect} from 'react-redux'
import {
    DropdownToggle, DropdownMenu,
    Button, 
    UncontrolledButtonDropdown,
    Card
} from 'reactstrap';

import {
    faAngleDown,

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        const {user} = this.props
        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left  ml-3 header-user-info">
                                <div className="widget-heading">
                                {user != null ? `${user.first_name} ${user.last_name}` : ''}
                                </div>
                                
                            </div>
                            <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                        <img width={42} className="rounded-circle" src={user != null && user.profile} alt=""/>
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown}/>
                                    </DropdownToggle>
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                                        <div className="dropdown-menu-header">
                                            <Card className="dropdown-menu-header-inner bg-light">
                                                {/* <div className="menu-header-image opacity-2"
                                                     style={{
                                                         backgroundImage: 'url(' + city3 + ')'
                                                     }}
                                                /> */}
                                                <div className="menu-header-content text-left">
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-3">
                                                                <img width={42} className="rounded-circle" src={user != null && user.profile}
                                                                     alt=""/>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="widget-heading">
                                                                    <p>{user != null && user.school_name? user.school_name: user.first_name}</p>
                                                                </div>
                                                                
                                                            </div>
                                                            <div className="widget-content-right mr-2">
                                                                <Button className=" btn-common"
                                                                        color="focus"
                                                                        onClick={(e) => this.props.logout()}>
                                                                    Logout
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                       
                                        
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </div>
                            

                            
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}


// export default connect(null, authActions)(UserBox)
export default connect(null)(UserBox)