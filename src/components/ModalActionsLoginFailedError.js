import React, { PureComponent } from 'react';
import strings from './utils/strings';

export default class ModalActionsLoginFailedError extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <button
          onClick={this.props.dismissLoginFailedError}
          className="ui button primary"
        >
          {strings.OK}
        </button>
      </React.Fragment>
    );
  }
}
