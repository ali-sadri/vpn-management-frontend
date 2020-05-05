import React, { PureComponent } from 'react';
import Modal from './Modal';
import ModalActionsLoginFailedError from './ModalActionsLoginFailedError';
import strings from './utils/strings';

export default class AdminLoginFailedModal extends PureComponent {
  render() {
    return (
      <div>
        <Modal
          title={strings.LOGIN_ERROR}
          content={
            <div className="ui negative message">
              <div className="header">
                {strings.ADMIN_LOGIN_FAILED}
              </div>
            </div>
          }
          actions={
            <ModalActionsLoginFailedError
              dismissLoginFailedError={
                this.props.dismissLoginFailedError
              }
            />
          }
        />
      </div>
    );
  }
}
