import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import classNames from 'classnames'
import './style.scss';

export default (props) => {
    const {content} = props
    const [value, setItemActive] = useState(0);
    const history = useHistory();
    const handleClick = (idx, path) => {
        setItemActive(idx);
        history.push(path);
    }

    return (
        <React.Fragment>
            {content.map((item, idx) => (
                <div className="d-flex menu-item">
                    {item.icon}
                    <a onClick={() => handleClick(idx, item.to)} className={classNames("menu-item-link", {'active': value === idx})}>{item.label}</a>
                </div>
            ))}
        </React.Fragment>
    )
}