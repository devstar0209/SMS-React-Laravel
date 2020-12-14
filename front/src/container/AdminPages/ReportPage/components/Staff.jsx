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
        divider: {
            default: '#ffffff',
        },
        background: {
            default: '#ededed',
          },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    });

    const columns = [

        {
            name: 'Staff Name',
            cell:row => <label>{row.first_name} {row.last_name}</label>,
        },
        {
            name: 'No. Classes',
            selector: 'classes_count',
            right: true,
        },
    ];
    return (
        <Card className="main-card mt-3">
            <CardHeader>
                <i className="header-icon lnr-screen icon-gradient bg-warm-flame"> </i>
                Student Grade Report
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