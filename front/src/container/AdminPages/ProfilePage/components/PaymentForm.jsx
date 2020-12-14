import React, { Fragment } from "react";
import { connect } from "react-redux";

import { Button, Card, CardBody, CardHeader, Collapse } from "reactstrap";
import CreditCardForm from "./CreditCardForm";
import BankForm from "./BankForm";

import { requestCardUpdate, requestBankUpdate } from "../profileactions";

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggleCustom = this.toggleCustom.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: false,
      accordion: [true, false, false],
      custom: [true, false],
      status: "Closed",
      fadeIn: true,
      timeout: 300,

      cardNumber: "",
      expiry: "",
      cvc: "",
      edit_card: false
    };

    this.handleCardUpdate = this.handleCardUpdate.bind(this);
    this.handleBankUpdate = this.handleBankUpdate.bind(this);
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
    this.handleCardExpiryChange = this.handleCardExpiryChange.bind(this);
    this.handleCardCVCChange = this.handleCardCVCChange.bind(this);
  }

  onEntering() {
    this.setState({ status: "Opening..." });
  }

  onEntered() {
    this.setState({ status: "Opened" });
  }

  onExiting() {
    this.setState({ status: "Closing..." });
  }

  onExited() {
    this.setState({ status: "Closed" });
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: state
    });
  }

  toggleCustom(tab) {
    const prevState = this.state.custom;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      custom: state
    });
  }

  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }

  handleCardNumberChange(e) {
    e.preventDefault();
    this.setState({ cardNumber: e.target.value });
  }
  handleCardExpiryChange(e) {
    e.preventDefault();
    this.setState({ expiry: e.target.value });
  }
  handleCardCVCChange(e) {
    e.preventDefault();
    this.setState({ cvc: e.target.value });
  }

  handleCardUpdate(data) {
    data["card_no"] = this.state.cardNumber.replace(/\s+/g, "");
    data["card_expiry"] = this.state.expiry.replace(/\s+/g, "");
    data["card_cvc"] = this.state.cvc;

    this.props.requestCardUpdate(data);
  }

  handleBankUpdate(data) {
    this.props.requestBankUpdate(data);
  }

  render() {
    return (
      <Fragment>
        <div className="form-wizard-content">
          <div id="accordion" className="accordion-wrapper mb-3">
            <Card>
              <CardHeader className="b-radius-0" id="headingOne">
                <Button
                  block
                  color="link"
                  className="text-left m-0 p-0"
                  onClick={() => this.toggleAccordion(0)}
                  aria-expanded={this.state.accordion[0]}
                  aria-controls="collapseTwo"
                >
                  <h3 className="form-heading">
                    Credit Card Informations (Option)
                  </h3>
                </Button>
              </CardHeader>
              <Collapse
                isOpen={this.state.accordion[0]}
                data-parent="#accordion"
                id="collapseOne"
              >
                <CardBody>
                  {(!this.props.data ||
                    (!!this.props.data && !this.props.data.card_alias) ||
                    this.state.edit_card) && (
                    <CreditCardForm
                      initialValues={this.props.data}
                      cardNumber={this.state.cardNumber}
                      expiry={this.state.expiry}
                      cvc={this.state.cvc}
                      handleCardNumberChange={this.handleCardNumberChange}
                      handleCardExpiryChange={this.handleCardExpiryChange}
                      handleCardCVCChange={this.handleCardCVCChange}
                      onSubmit={this.handleCardUpdate}
                    />
                  )}
                  {this.props.data &&
                    this.props.data.card_alias &&
                    !this.state.edit_card && (
                      <div>
                        <p className="fsize-5">{this.props.data.card_alias}</p>
                        <Button
                          className="btn-common btn-default-size"
                          color="primary"
                          onClick={() => this.setState({ edit_card: true })}
                        >
                          Edit
                        </Button>
                      </div>
                    )}
                </CardBody>
              </Collapse>
            </Card>
            <Card>
              <CardHeader id="headingTwo">
                <Button
                  block
                  color="link"
                  className="text-left m-0 p-0"
                  onClick={() => this.toggleAccordion(1)}
                  aria-expanded={this.state.accordion[1]}
                  aria-controls="collapseTwo"
                >
                  <h3 className="form-heading">Bank Informations (Option)</h3>
                </Button>
              </CardHeader>
              <Collapse
                isOpen={this.state.accordion[1]}
                data-parent="#accordion"
                id="collapseTwo"
              >
                <CardBody>
                  <BankForm
                    onSubmit={this.handleBankUpdate}
                    initialValues={this.props.data}
                  />
                </CardBody>
              </Collapse>
            </Card>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = {
  requestCardUpdate,
  requestBankUpdate
};

export default connect(
  null,
  mapDispatchToProps
)(PaymentForm);
