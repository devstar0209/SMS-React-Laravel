import React, {Fragment} from 'react';

export default class WizardStep4 extends React.Component {
    render() {
        return (
            <Fragment>
                <div className="form-wizard-content">
                    <div className="no-results">
                        <div className="sa-icon sa-success animate">
                            <span className="sa-line sa-tip animateSuccessTip"/>
                            <span className="sa-line sa-long animateSuccessLong"/>

                            <div className="sa-placeholder"/>
                            <div className="sa-fix"/>
                        </div>
                        <div className="results-subtitle mt-4">Congratulations!</div>
                        <div className="results-title">You completed profile!</div>
                        <div className="mt-3 mb-3"/>
                    </div>
                </div>
            </Fragment>
        );
    }
}
