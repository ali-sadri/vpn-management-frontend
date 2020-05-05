import React, { PureComponent } from 'react';
import strings from './utils/strings';

export default class ModalActionsDeleteConfirm extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <button
          onClick={this.props.deleteMember}
          className="ui button primary"
        >
          {strings.DELETE}
        </button>
        <button
          onClick={this.props.deleteCancelled}
          className="ui button primary"
        >
          {strings.CANCEL}
        </button>
      </React.Fragment>
    );
  }
}
