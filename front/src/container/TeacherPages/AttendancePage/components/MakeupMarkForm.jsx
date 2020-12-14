import React from 'react'
import ReactTable from 'react-table'

export default (props) => {
    const { data } = props;
    const {handleCheck} = props;
    var columns = []
    columns = data && data.map(item => {
        return {
            Header: item.first_name + ' ' + item.last_name,
            accessor: "",
            Cell: ({ original, index }) => item.status === -1? '' :<input
                type="checkbox"
                className="checkbox"
                // checked={item.status}
                onChange={(e)=>handleCheck(item.id, e)}
            />

        }

    });

    return (
        <React.Fragment>
            
                    {data && 
                    <ReactTable
                        data={data}
                        columns={columns}
                        defaultPageSize={1}
                        showPaginationBottom={false}
                        className="-striped -highlight"
                    />
                    }
               
        </React.Fragment>
    )
}