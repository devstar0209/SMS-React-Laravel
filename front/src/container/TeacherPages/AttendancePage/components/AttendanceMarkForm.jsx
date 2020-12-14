import React from 'react'
import ReactTable from 'react-table'

export default (props) => {
    const {handleCheck} = props
    const {term, startday} = props
    var columns = []
    columns = term && term.map(item => {
        return {
            Header: item.substr(8, 2),
            id: 'days',
            accessor: "",
            Cell: ({original, index}) => <input
                        type="checkbox"
                        className="checkbox"
                        checked={original.days.includes(item)}
                        onChange={(e) => handleCheck(original.id, index, item)}
                    />
            
        }

    })

    var week = startday !== undefined ? startday.substr(5, 2) + ' - ' + startday.substr(0, 4): ''

    return(
        <React.Fragment>
            
                <ReactTable
                    data={props.initialValues}
                    columns={[
                        {
                            Header: "Name",
                            columns: [
                                {
                                    Header: "First Name",
                                    id: "first_name",
                                    accessor: d => d.first_name

                                },
                                {
                                    Header: "Last Name",
                                    id: "last_name",
                                    accessor: d => d.last_name
                                }
                            ]
                        },
                        {
                            Header: week,
                            columns: columns
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight"
                />
                
        </React.Fragment>
    )
}