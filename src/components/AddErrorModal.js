import React, { PureComponent } from 'react';
import Modal from './Modal';
import ModalActionsAddMemberError from './ModalActionsAddMemberError';
import strings from './utils/strings';

export default class AddErrorModal extends PureComponent {
  render() {
    return (
      <div>
        <Modal
          title={strings.ADD_MEMBER_ERROR}
          content={
            <div className="ui negative message">
              <div className="header">
                {strings.MEMBER_EXISTS_MSG}
              </div>
            </div>
          }
          actions={
            <ModalActionsAddMemberError
              dismissAddMemberError={this.props.dismissAddMemberError}
            />
          }
        />
      </div>
    );
  }
}
