import React from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import { Badge,
    Card, CardBody,CardHeader
    } from 'reactstrap';
import classNames from 'classnames';

export default ({data}) => {
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

      const columns = [
        
        {
            name: 'STUDENT',
            cell:row => <label>{row.first_name} {row.last_name}</label>,
        },
        
        {
            name: 'Amount',
            selector: 'amount',
            sortable: true,
            right: true,
        },
        {
            name: 'Method',
            selector: 'payment_method',
            cell:row => <label>{row.payment_method === 1 ? 'card' : (row.payment_method === 2 ? 'bank' : 'cash')}</label>,
            right: true,
        },
        {
            name: 'DATE',
            selector: 'updated_at',
            sortable: true,
            right: true,
        },
        {
            name: 'STATUS',
            selector: 'status',
            cell: row => <Badge  className={classNames(`badge_grade_status_${row.status}`)} style={{width:100}}>{row.status}</Badge>,
            right: true,
        },
      ];
    return(
        <Card className="main-card mt-3">
            <CardHeader>
                <i className="header-icon lnr-screen icon-gradient bg-warm-flame"> </i>
                Checkout History
            </CardHeader>
            <CardBody>
            <DataTable
                noHeader="true"
                columns={columns}
                theme="solarized"
                data={data}
                paginationPerPage="5"
            />
            </CardBody>
        </Card>
    )
}