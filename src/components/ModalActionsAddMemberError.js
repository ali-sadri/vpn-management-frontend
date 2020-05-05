import React, { PureComponent } from 'react';
import strings from './utils/strings';

export default class ModalActionsAddMemberError extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <button
          onClick={this.props.dismissAddMemberError}
          className="ui button primary"
        >
          {strings.OK}
        </button>
      </React.Fragment>
    );
  }
}
