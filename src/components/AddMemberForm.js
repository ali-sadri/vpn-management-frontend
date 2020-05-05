import React, { PureComponent } from 'react';
import strings from './utils/strings';

const nameRegex = /^[A-Z][a-z]+\s[A-Z]+[A-Za-z]*$/;

class AddMemberForm extends PureComponent {
  state = { name: '' };

  onNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.name) {
      this.props.onSubmit(this.state);
      this.clearFields();
    }
  };

  onCancel = () => {
    this.clearFields();
    this.setState({ name: '' });
    this.props.onSubmit({ name: '' });
  };

  clearFields = () => {
    this.setState({ name: '' });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>{strings.ADD_MEMBER_LABEL} </label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.onNameChange}
              autoFocus
            />
          </div>
          <br />
          <button
            disabled={!nameRegex.test(this.state.name)}
            className="ui button primary right floated"
          >
            Add Member
          </button>
        </form>
        <button
          onClick={this.onCancel}
          className="ui button primary right floated"
        >
          Cancel
        </button>
      </div>
    );
  }
}

export default AddMemberForm;
