import React, { PureComponent } from 'react';
import strings from './utils/strings';

import {
  HomeContainer,
  HomeTitle,
  HomeLogin,
} from './utils/styledComponentsSetup';

class Home extends PureComponent {
  onAnonymousButton = () => {
    this.props.handleHomeLoginButtons('anonymous');
  };

  onAdminButton = () => {
    this.props.handleHomeLoginButtons('admin');
  };

  render() {
    return (
      <div className="ui container">
        <div>
          <br /> <br /> <br />
          <HomeTitle>
            <h1>{strings.HOME_TITLE}</h1>
            <h2>{strings.LOGIN_TITLE}</h2>
          </HomeTitle>
          <HomeLogin>
            <HomeContainer>
              <button
                className="large ui button primary"
                onClick={this.onAnonymousButton}
              >
                {strings.ANONYMOUS_LOGIN_BUTTON}
              </button>
              <button
                className="large ui button primary"
                onClick={this.onAdminButton}
              >
                {strings.ADMIN_LOGIN_BUTTON}
              </button>
            </HomeContainer>
          </HomeLogin>
        </div>
      </div>
    );
  }
}

export default Home;
