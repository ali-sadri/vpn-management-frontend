import React, { PureComponent } from "react";
import Switch from "react-switch";
import { Draggable } from "react-beautiful-dnd";
import {
  MemberContainer,
  MemberTime,
  MemberTitle,
} from "./utils/styledComponentsSetup";
import strings from "./utils/strings";

export default class Member extends PureComponent {
  handleChange = (checked) => {
    this.props.handleStateChange({
      checked,
      id: this.props.member.id,
      columnId: this.props.columnId,
    });
  };

  convertSecondsToTimeDisplay = (d) => {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);
    let s = Math.floor((d % 3600) % 60);

    let hDisplay = h > 0 ? h + (h === 1 ? " hr, " : " hr, ") : "";
    let mDisplay = m > 0 ? m + (m === 1 ? " min, " : " min, ") : "";
    let sDisplay = s > 0 ? s + (s === 1 ? " sec" : " sec") : "";
    return hDisplay + mDisplay + sDisplay;
  };

  onDelete = () => {
    this.props.handleDeleteMember(this.props.member.id, this.props.columnId);
  };

  render() {
    let titleClassName = this.props.isAdmin
      ? "seven wide column"
      : "nine wide column";

    return (
      <Draggable
        draggableId={this.props.member.id}
        index={this.props.index}
        isDragDisabled={!this.props.isAdmin}
      >
        {(provided, snapshot) => (
          <MemberContainer
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <div className="ui stackable grid container">
              <div className={titleClassName}>
                <MemberTitle>{this.props.member.id}</MemberTitle>
              </div>
              <div className="six wide column">
                <Switch
                  onChange={this.handleChange}
                  checked={this.props.member.checked}
                />
              </div>
              {this.props.isAdmin && (
                <div className="two wide column">
                  <button
                    type="button"
                    className="mini ui button negative"
                    style={{
                      width: "25px",
                      height: "25px",
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: "bold",
                      padding: "10px",
                      paddingLeft: "7px",
                      paddingTop: "6px",
                    }}
                    id="deleteButton"
                    onClick={this.onDelete}
                  >
                    {strings.X}
                  </button>
                </div>
              )}

              <br />
            </div>
            {this.props.member.time != null && (
              <div>
                <MemberTime>
                  {"\u00a0 "}
                  {Number(this.props.member.time) === 0
                    ? `0 sec`
                    : this.convertSecondsToTimeDisplay(this.props.member.time)}
                </MemberTime>
              </div>
            )}
          </MemberContainer>
        )}
      </Draggable>
    );
  }
}
