import { profileDetail } from "../../container/AdminPages/ProfilePage/profilesaga";

export default {
    login: 'oauth/token',
    signup: 'signup',
    logout: 'logout',
    user: {
        login: 'teacher/oauth/token',
        registerTeacher: 'register/teacher',
    },
    profile:{
        detail: 'profile/detail',
        account_update: 'profile/update',
        card_payment_update: 'profile/payment/card/update',
        bank_payment_update: 'profile/payment/bank/update',
    },
    parent: {
        register: 'parent/register',
        kid: {
            list: 'parent/kid/list',
            detail: 'parent/kid/detail',
            create: 'parent/kid/create',
            update: 'parent/kid/update',
            delete: 'parent/kid/delete',
            payment: {
                detail: 'parent/kid/payment/detail'
            },
            contact: {
                update: 'parent/kid/contact/update',
                delete: 'parent/kid/contact/delete',
            },
            attendance: {
                index: 'parent/kid/attendance'
            }
        },
        event: {
            list: 'parent/event/list',
            detail: 'parent/event/detail'
        },
        booking: {
            list: 'parent/booking/list'
        }
    },
    player: {
        register: 'register/player',
        member: {
            data: 'player/member/request',
            fee: 'player/member/pay'
        },
        class: {
            list: 'classes/list',
            checkout: 'class/checkout'
        },
        bookings: {
            list: 'bookings/list',
        }
    },
    teacher:{
        class:{
            list: 'teacher/class/list',
            detail: 'teacher/class/detail',
        },
        attendance: {
            save: 'teacher/attendance/save',
            detail: 'teacher/attendance/detail',
            today: 'teacher/attendance/today',
            prev: 'teacher/attendance/prev',
            next: 'teacher/attendance/next',
        },
        profile:{
            detail: 'teacher/profile/detail',
            update: 'teacher/profile/update',
        },
        event:{
            list: 'teacher/event/list',
            detail: 'teacher/event/detail',
            coaches: 'teacher/event/coaches',
        },
        student:{
            list: 'teacher/student/list',
            detail: 'teacher/student/detail',
            contact: {
                detail:'teacher/student/contact/detail',
            },
            payment: {
                detail:'teacher/student/payment/detail',
            }
        }
    },
    admin:{
        init: 'admin/dashboard/init',
        
        coache:{
            list: 'admin/coache/list',
            detail: 'admin/coache/detail',
            create: 'admin/coache/create',
            update: 'admin/coache/update',
            delete: 'admin/coache/delete',
        },
        player:{
            list: 'admin/player/list',
            detail: 'admin/player/detail',
            update: 'admin/player/update',
            delete: 'admin/player/delete',
            approve: 'admin/player/approve',
        },
        member: {
            approve: 'admin/member/approve'
        },
        class:{
            list: 'admin/class/list',
            detail: 'admin/class/detail',
            create: 'admin/class/create',
            update: 'admin/class/update',
            delete: 'admin/class/delete',
            coaches: 'admin/class/coaches',

        },
        event:{
            list: 'admin/event/list',
            detail: 'admin/event/detail',
            create: 'admin/event/create',
            update: 'admin/event/update',
            delete: 'admin/event/delete',
            coaches: 'admin/event/coaches',

        },
        student:{
            list: 'admin/student/list',
            detail: 'admin/student/detail',
            create: 'admin/student/create',
            update: 'admin/student/update',
            delete: 'admin/student/delete',
            contact: {
                create:'admin/student/contact/create',
                update:'admin/student/contact/update',
                detail:'admin/student/contact/detail',
                delete:'admin/student/contact/delete',
            },
            payment: {
                create:'admin/student/payment/create',
                update:'admin/student/payment/update',
                detail:'admin/student/payment/detail',
                delete:'admin/student/payment/delete',
            },
            paymentOption: {
                create: 'admin/student/paymentoption/create',
                update: 'admin/student/paymentoption/update',
            },
            checkout: 'admin/student/checkout',
            attendance: {
                index: 'admin/student/attendance',
                save: 'admin/student/attendance/save'
            },
            makeup_save: 'admin/student/makeup/save'
        },
        report: 'admin/report',
        attendance:{
            save: 'admin/attendance/save',
            detail: 'admin/attendance/detail',
        },
    }
}