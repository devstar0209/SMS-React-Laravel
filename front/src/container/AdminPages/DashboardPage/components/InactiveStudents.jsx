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
            name: 'Name',
            cell:row => <label>{row.first_name} {row.last_name}</label>,
        },
        {
            name: 'STATUS',
            selector: 'active',
            cell: row => <Badge  className={classNames(`badge_active_status_${row.active === 2?'Inactive':'Trial'}`)} style={{width:100}}>{row.active === 2?'Inactive':'Trial'}</Badge>,
            right: true,
        },
      ];
    return(
        <Card className="main-card mt-3">
            <CardHeader>
                <i className="header-icon lnr-screen icon-gradient bg-warm-flame"> </i>
                Inactive Students
            </CardHeader>
            <CardBody>
            <DataTable
                noHeader="true"
                columns={columns}
                theme="solarized"
                data={data}
                pagination="true"
                paginationPerPage="5"
                paginationRowsPerPageOptions={[5]}
                paginationComponentOptions={{rowsPerPageText: 'rows'}}
                highlightOnHover="true"
                pointerOnHover="true"
            />
            </CardBody>
        </Card>
    )
}