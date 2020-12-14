import React from 'react'
import {Card, CardHeader, CardBody, Col, Button} from 'reactstrap'

export default (props) => {
    const {handleBook} = props
    const {data} = props
    const renderDay = (day) =>{
        switch(day) {
            case 1:
                return 'Mon'
            case 2:
                return 'Tue'
            case 3:
                return 'Wed'
            case 4:
                return 'Thu'
            case 5:
                return 'Fri'
            case 6:
                return 'Sat'
            case 7:
                return 'Sun'
        }
    }
    return (
        <React.Fragment>
            <Card>
                <CardHeader>
                    <p>{data.type}</p>
                </CardHeader>
                <CardBody>
                    <Col md="12">
                        Start Time: {data.start_time}
                    </Col>
                    <Col md="12">
                        Finish Time: {data.finish_time}
                    </Col>
                    <Col md="12">
                        Open Day: {renderDay(data.day)}
                    </Col>
                    <Col md="12">
                        Age: {data.min_age} - {data.max_age}
                    </Col>
                    <Col md="12">
                        Max Qty: {data.max_no}
                    </Col>
                    <Col md="12">
                        Amount: ${data.price}
                    </Col>
                    <Col md="12">
                        Casual Rate: ${data.price}
                    </Col>
                    <Col md="12">
                        Member Rate: ${data.member_fee}
                    </Col>
                    <Col>
                        <Button onClick={(e)=>handleBook(data.id)} className="mt-3 btn-common btn-default-size" color="danger" block>Book Now</Button>
                    </Col>
                </CardBody>
            </Card>
        </React.Fragment>
    )
}