import React, { PureComponent } from "react";
import AddMemberForm from "./AddMemberForm";
import Modal from "./Modal";
import strings from "./utils/strings";

export default class AddModal extends PureComponent {
  render() {
    return (
      <React.Fragment>
        <Modal
          title={strings.ADD_NEW_MEMBER}
          content={
            <AddMemberForm onSubmit={this.props.AddMemberFormSubmitted} />
          }
        />
      </React.Fragment>
    );
  }
}
