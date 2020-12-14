import React from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import { Button, Badge,
    Card, CardBody,CardHeader
    } from 'reactstrap';
import classNames from 'classnames';

import styled from 'styled-components'

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
            name: 'STATUS GRADE',
            selector: 'status',
            cell: row => <Badge  className={classNames(`badge_grade_status_${row.status}`)} style={{width:100}}>{row.status}</Badge>
        },
        {
            name: '',
            selector: 'group',
            sortable: true,
        },
        {
            name: 'STUDENT',
            selector: 'student',
            sortable: true,
        },
        {
            name: 'PARENT',
            selector: 'parent',
            sortable: true,
            right: true,
        },
        {
            name: 'DATE CREATED',
            selector: 'date',
            sortable: true,
            right: true,
        },
        {
            name: 'CONTACT',
            selector: 'contact',
            sortable: true,
            right: true,
        },
        {
            name: 'EMAIL',
            selector: 'email',
            sortable: true,
            right: true,
        },
      ];
    return(
        <Card className="main-card mt-3">
            <CardHeader>
                <i className="header-icon lnr-screen icon-gradient bg-warm-flame"> </i>
                Latest Update
                <div className="btn-actions-pane-right">
                    <Button className="btn-common btn-default-size" >View All</Button>
                </div>
            </CardHeader>
            <CardBody>
            <DataTable
                noHeader="true"
                columns={columns}
                theme="solarized"
                data={data}
                pagination="true"
                paginationPerPage="3"
                paginationRowsPerPageOptions={[3, 5,10]}
                paginationComponentOptions={{rowsPerPageText: 'rows'}}
            />
            </CardBody>
        </Card>
    )
}