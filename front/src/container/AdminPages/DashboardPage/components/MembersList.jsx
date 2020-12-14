import React from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import { Badge, Button,
    Card, CardBody,CardHeader
    } from 'reactstrap';

export default (props) => {
    const {data} = props;
    const {onApprove} = props;

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
            cell:row => <label>{row.user.userprofile.first_name} {row.user.userprofile.last_name}</label>,
        },
        {
            name: 'Member Number',
            selector: 'member_no',
        },
        {
            name: 'Member Card',
            // selector: 'member_card',
            cell: row => <img src={row.member_card} width="50" height="50"/>
        },
        {
            name: 'Fee Plan',
            cell: row => <Badge>{row.fee_plan.plan}</Badge>
        },
        {
            name: 'Action',
            cell: row => <Button color="danger" onClick={() => onApprove(row.id)}>Approve</Button>,
            right: true
        }
      ];
    return(
        <Card className="main-card mt-3">
            <CardHeader>
                <i className="header-icon lnr-screen icon-gradient bg-warm-flame"> </i>
                Member Request Players
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