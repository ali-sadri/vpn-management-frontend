import React, { PureComponent } from 'react';
import {
  LoginFormContainer,
  HomeTitle,
} from './utils/styledComponentsSetup';
import strings from './utils/strings';

class Login extends PureComponent {
  state = { userName: '', password: '' };
  onNameChange = (e) => {
    this.setState({ userName: e.target.value });
  };
  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  clearFields = () => {
    this.setState({ userName: '', password: '' });
  };

  onCancel = () => {
    this.props.onAdminLoginFormSubmit(this.state, true);
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    this.clearFields();
    this.props.onAdminLoginFormSubmit(this.state, false);
  };

  render() {
    return (
      <div className="ui container">
        <br />
        <br />
        <div className="ui grid">
          <div className="four wide column"></div>
          <div className="seven wide column">
            {' '}
            <LoginFormContainer>
              <div className="ui header">
                <h3>
                  <HomeTitle>{strings.ADMIN_LOGIN_TITLE}</HomeTitle>
                </h3>
              </div>
              <form onSubmit={this.onFormSubmit} className="ui form">
                <div className="field">
                  <label>{strings.USER_NAME}</label>
                  <input
                    type="text"
                    value={this.state.userName}
                    onChange={this.onNameChange}
                    autoFocus
                  />
                </div>
                <div className="field">
                  <label>{strings.PASSWORD}</label>
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                  />
                </div>

                <br />
                <div>
                  <button
                    className="ui button primary right floated"
                    disabled={
                      !this.state.userName || !this.state.password
                    }
                  >
                    {strings.SUBMIT}
                  </button>
                </div>
              </form>
              {'\u00a0'}
              <button
                onClick={this.onCancel}
                className="ui button primary right floated"
              >
                {strings.CANCEL}
              </button>
            </LoginFormContainer>
          </div>
          <div className="five wide column"></div>
        </div>
      </div>
    );
  }
}

export default Login;
