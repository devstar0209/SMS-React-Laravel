import React from 'react'

import {Card} from 'reactstrap'

import bg3 from './city3.jpg';
import './style.scss'

export default class ImageProfile extends React.Component {
    constructor(props) {
        super(props);

    }

    render(){
      
        return(
            <Card className="mb-3 profile-block">
                <div className="dropdown-menu-header">
                    <img src={bg3} className="profile-blur opacity-9"/>
                    <div className="menu-header-content">
                        <div className="avatar-icon-wrapper avatar-icon-lg">
                            <div 
                                style={{ cursor: this.props.disabled ? "default" : "pointer" }} 
                                className="avatar-icon rounded-circle btn-hover-shine mr-0 upload-image"
                            >
                                <img src={this.props.image} id="profile"/>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </Card>
        )
    }
}