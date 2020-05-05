import React, { PureComponent } from 'react';
import Modal from './Modal';
import ModalActionsDeleteConfirm from './ModalActionsDeleteConfirm';
import strings from './utils/strings';

export default class DeleteConfirmationModal extends PureComponent {
  render() {
    return (
      <div>
        <Modal
          title={strings.DELETE_MODAL_TITLE}
          content={
            <div className="ui primary message">
              <div className="header">
                {`${strings.DELETE_CONFIRM_MSG} "${this.props.currentMemberIdToDelete}"`}
              </div>
            </div>
          }
          actions={
            <ModalActionsDeleteConfirm
              deleteMember={this.props.deleteMember}
              deleteCancelled={this.props.deleteCancelled}
            />
          }
        />
      </div>
    );
  }
}
