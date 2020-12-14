import React from 'react'
import {Button} from 'reactstrap'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

import {logo_color, parent, user, instructor, player} from '../../../Common/Assets/Icons'

const UserGroup = styled.div`
    width: 312px;
    height: 555px;
    display: flex;
    padding: 50px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    
`;

export default (props) => {
    const {handleAdmin, handlePlayer, handleInstructor, handleParent} = props
    return (
        <div className="box" style={{width: 312, minHeight: 555}}>
            <UserGroup>
                <Link to="/">
                    <img src={logo_color} width="139" height="111" alt=""/>
                </Link>
                <div style={{width: '100%'}}>
                    <div className="d-flex justify-content-between" >
                        <img src={user} alt=""/>
                        <Button block className="btn-common ml-5" onClick={handleAdmin}>Admin</Button>
                    </div>
                    <div className="d-flex justify-content-between mt-5">
                        <img src={player} />
                        <Button color="primary" block className="btn-common ml-5" onClick={handlePlayer}>Player</Button>
                    </div>
                    <div className="d-flex justify-content-between mt-5">
                        <img src={instructor} />
                        <Button color="primary" block className="btn-common ml-5" onClick={handleInstructor}>Instructor</Button>
                    </div>
                    <div className="d-flex justify-content-between mt-5">
                        <img src={parent} />
                        <Button color="primary" block className="btn-common ml-5" onClick={handleParent}>Parent</Button>
                    </div>
                </div>
            </UserGroup>
        </div>
    )
}