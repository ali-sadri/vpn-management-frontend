import React, { PureComponent } from "react";
import { Combobox } from "react-widgets";
//import { options } from "./utils/reactSelectconfig";
import "react-widgets/dist/css/react-widgets.css";

import {
  HeaderTotalVPNs,
  HeaderAvailableVPNsText,
  HeaderAvailableVPNs,
} from "./utils/styledComponentsSetup";

import strings from "./utils/strings";
const options = [
  "IT Solution Delivery",
  "BI Sovereign",
  "CBS",
  "P&C Delivery",
  "P&C Claims",
  "P&C Digital And QA",
  "Digital Solutions",
  "Data Governance",
];
export default class Header extends PureComponent {
  onGroupSelected = (value) => {
    this.props.onGroupSelected(value);
  };
  render() {
    return (
      <div className="ui container">
        <div className="ui grid">
          <div className="six wide column"></div>
          <div className="five wide column">
            <h1>{strings.APP_TITLE}</h1>
          </div>
          <div className="five wide column">
            <Combobox
              data={options}
              value={this.props.state.selectedGroup}
              onChange={(value) => this.onGroupSelected(value)}
            />
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="ui grid">
          <div className="six wide column">
            <h2>
              {strings.TOTAL_VPN_IN_USE}:{"\u00a0"}
              {this.props.state.selectedGroup && (
                <HeaderTotalVPNs>
                  {
                    this.props.state.groups[this.props.state.selectedGroup]
                      .onVpnCount
                  }
                </HeaderTotalVPNs>
              )}
            </h2>
          </div>
          <div className="five wide column"></div>
          <div className="five wide column">
            <HeaderAvailableVPNsText>
              {strings.AVAILABLE_VPNS}:
              {this.props.state.selectedGroup && (
                <HeaderAvailableVPNs>
                  {"\u00a0"}
                  {
                    this.props.state.groups[this.props.state.selectedGroup]
                      .availableVPNs
                  }
                </HeaderAvailableVPNs>
              )}
            </HeaderAvailableVPNsText>
          </div>
        </div>
      </div>
    );
  }
}
