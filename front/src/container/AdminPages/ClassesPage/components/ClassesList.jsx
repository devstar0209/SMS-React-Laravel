import React from 'react'
import DataTable, { createTheme } from 'react-data-table-component';

export default ({data, handleSelectRow}) => {
    createTheme('solarized', {
        context: {
          background: '#FFFFFF',
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
            name: 'Class Type',
            cell: row => <p className="fsize-3">{row.type}</p>
        },
        {
          name: 'MAX No.',
          cell: row => <p>{row.max_no}</p>
        },
        {
          name: ' No.of Students',
          cell: row => <p>{row.student_count}</p>
        }
      ];
    return(
        
            <DataTable
                noHeader="true"
                columns={columns}
                theme="solarized"
                data={data}
                pagination="true"
                paginationPerPage="10"
                paginationRowsPerPageOptions={[10, 20, 30]}
                paginationComponentOptions={{rowsPerPageText: 'rows'}}
                highlightOnHover="true"
                pointerOnHover="true"
                onRowClicked={handleSelectRow}
            />
           
    )
}