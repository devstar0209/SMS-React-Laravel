import React from 'react'
import ReactTable from 'react-table'

export default (props) => {
    const { term, startday, attendance_data } = props;
    const {handleChangeMark} = props;
    var columns = []
    columns = term && term.map(item => {
        return {
            Header: item,
            id: 'days',
            accessor: "",
            Cell: ({ original, index }) => <input
                type="checkbox"
                className="checkbox"
                checked={attendance_data.includes(item)}
                // onChange={(e)=>handleChangeMark(item, e)}
            />

        }

    });

    return (
        <React.Fragment>
            
                    {attendance_data && 
                    <ReactTable
                        data={attendance_data}
                        columns={columns}
                        defaultPageSize={1}
                        showPaginationBottom={false}
                        className="-striped -highlight"
                    />
                    }
               
        </React.Fragment>
    )
}