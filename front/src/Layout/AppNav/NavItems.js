import React from 'react'
import { Icon } from "semantic-ui-react";
import {menu_dashboard, menu_analysis, menu_blackboard, menu_checkmark, menu_coaches, menu_event, menu_players, menu_students, user } from './../../Common/Assets/Icons'

// import Api from '../../Api';
let Nav = [];


export let AdminNav = [
    {
        icon: <img src={menu_dashboard}/>,
        label: 'DASHBOARD',
        to: '/admin/dashboard'
    },
    {
        icon: <img src={menu_blackboard}/>,
        label: 'CLASSES',
        to: '/admin/classes'
    },
    {
        icon: <img src={menu_checkmark}/>,
        label: 'ATTENDANCES',
        to: '/admin/attendance'
    },
    {
        icon: <img src={menu_students}/>,
        label: 'STUDENTS',
        to: '/admin/students'
    },    
    {
        icon: <img src={menu_players}/>,
        label: 'PLAYERS',
        to: '/admin/players'
    },    
    {
        icon: <img src={menu_coaches}/>,
        label: 'COACHES',
        to: '/admin/coaches'
    },    
    {
        icon: <img src={menu_event}/>,
        label: 'EVENTS',
        to: '/admin/events'
    },    
    {
        icon: <img src={menu_analysis}/>,
        label: 'REPORTS',
        to: '/admin/reports'
    },
    {
        icon: <img src={user}/>,
        label: 'PROFILE',
        to: '/admin/profile'
    },
];
export let InstructorNav = [
    {
        icon: <img src={menu_checkmark}/>,
        label: 'ATTENDANCE',
        to: '/page/attendance'
    },
    {
        icon: <img src={menu_blackboard}/>,
        label: 'CLASSES',
        to: '/page/classes'
    },
    {
        icon: <img src={menu_students}/>,
        label: 'STUDENTS',
        to: '/page/students'
    },    
    {
        icon: <img src={menu_event}/>,
        label: 'EVENTS',
        to: '/page/events'
    },    
    {
        icon: <img src={user}/>,
        label: 'PROFILE',
        to: '/page/profile'
    },
];
export let ParentNav = [
    {
        icon: <img src={user}/>,
        label: 'KIDS',
        to: '/parent/kids'
    },
    {
        icon: <img src={menu_blackboard}/>,
        label: 'CLASSES',
        to: '/parent/classes'
    },
    {
        icon: <img src={menu_dashboard}/>,
        label: 'BOOKINGS',
        to: '/parent/booking'
    },
    {
        icon: <img src={user}/>,
        label: 'PROFILE',
        to: '/parent/profile'
    }
    // {
    //     icon: 'lnr-dinner',
    //     label: 'PAYMENT',
    //     to: '/parent/payment'
    // },
    // {
    //     icon: 'lnr-alarm',
    //     label: 'EVENTS',
    //     to: '/parent/events'
    // }
];
export let PlayerNav = [
    {
        icon: <img src={menu_blackboard}/>,
        label: 'CLASSES',
        to: '/player/classes'
    },
    {
        icon: <img src={menu_dashboard}/>,
        label: 'BOOKINGS',
        to: '/player/booking'
    },
    {
        icon: <img src={user}/>,
        label: 'PROFILE',
        to: '/player/profile'
    }
];
Nav = {AdminNav, InstructorNav, ParentNav, PlayerNav}
export default Nav;
