import React from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import {
    Card, CardBody, CardHeader
} from 'reactstrap';

export default ({ data }) => {
    createTheme('solarized', {
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        background: {
            default: '#ededed',
          },
        divider: {
            default: '#ffffff',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    });

    // renderDay = (day) => {
    //     switch (day) {
    //         case 0:
    //             return 'Sun';
    //         case 1:
    //             return 'Mon';
    //         case 2:
    //             return 'Tue';
    //         case 3:
    //             return 'Wed';
    //         case 4:
    //             return 'Thu';
    //         case 5:
    //             return 'Fri';
    //         case 6:
    //             return 'Sat';
    //     }
    // }

    const columns = [

        {
            name: 'Name',
            selector: 'type',
            // cell:row => <label>{row.type}</label>,
        },
        {
            name: 'No. Students',
            selector: 'student_count',
            right: true,
        },
        {
            name: 'No. Makeup/Trial',
            selector: 'makeup_count',
            right: true,
        },
    ];
    return (
        <Card className="main-card mt-3">
            <CardHeader>
                <i className="header-icon lnr-screen icon-gradient bg-warm-flame"> </i>
                Class Report
            </CardHeader>
            <CardBody>
                <DataTable
                    noHeader="true"
                    columns={columns}
                    theme="solarized"
                    data={data}
                    pagination="true"
                    paginationPerPage="10"
                    paginationRowsPerPageOptions={[10, 20, 30]}
                    paginationComponentOptions={{ rowsPerPageText: 'rows' }}
                    highlightOnHover="true"
                    pointerOnHover="true"
                />
            </CardBody>
        </Card>
    )
}