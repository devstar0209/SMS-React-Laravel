import React from 'react'
import ReactTable from 'react-table'

export default (props) => {
    const { data, present } = props;
    const {handleChangeMakeupMark} = props;
    var columns = []
    columns = data && data.map(item => {
        return {
            Header: item,
            id: 'days',
            accessor: "",
            Cell: ({ original, index }) => item === ""?"":<input
                type="checkbox"
                className="checkbox"
                checked={present.includes(item)}
                onChange={(e)=>handleChangeMakeupMark(item, e)}
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