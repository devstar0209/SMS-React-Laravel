import React, { PureComponent } from 'react';
import AccessControlService from '../Services/accessControlService';

class Can extends PureComponent {
  render() {
    const { children, userTypes, action, context, data } = this.props;
    return (
      <React.Fragment>
        {
          AccessControlService.doesUserHaveAccess(userTypes, action, context, data)
            ? children
            : null
        }
      </React.Fragment>
    );
  }
}

export default Can;
