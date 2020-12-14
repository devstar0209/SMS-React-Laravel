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

    const renderPaidPlan = (plan) => {
        switch (plan) {
            case 1:
                return 'Weekly';
            case 2:
                return 'Fortnightly';
            case 3:
                return 'Monthly';
            case 4:
                return 'Full';
            default:
                return 'No Paid';
        }
    }

    const columns = [

        {
            name: 'Name',
            cell:row => <label>{row.first_name} {row.last_name}</label>,
        },
        {
            name: 'Paid Plan',
            cell: row => <label>{ row.payment ? renderPaidPlan(row.payment.plan): 'No Paid' }</label>,
            right: true,
        },
    ];
    return (
        <Card className="main-card mt-3">
            <CardHeader>
                <i className="header-icon lnr-screen icon-gradient bg-warm-flame"> </i>
                Studdent Fee Report
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