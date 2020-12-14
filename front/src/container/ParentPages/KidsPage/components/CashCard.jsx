import React from 'react'
import {Card, CardImg, CardBody, CardTitle, CardText, CardSubtitle, Button} from 'reactstrap'

export default (props) => {
    const{title, price, text, img} = props
    return(
        <React.Fragment>
            <Card>
            <CardImg top width="100%" src={img} alt="Payment Image" />
            <CardBody>
                <CardTitle className="text-center">{title}</CardTitle>
                <CardSubtitle className="text-center">{price}</CardSubtitle>
                <CardText>{text}</CardText>
                <div className="justify-content-center text-center">
                <Button color="danger" className="">Accept</Button>
                </div>
            </CardBody>
            </Card>
        </React.Fragment>
    )
}