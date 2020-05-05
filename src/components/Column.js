import React, { PureComponent } from "react";
import { Droppable } from "react-beautiful-dnd";
import {
  ColumnContainer,
  ColumnTitle,
  ColumnConnectedTitle,
  ColumnButton,
  ColumnMemberList,
} from "./utils/styledComponentsSetup";

import strings from "./utils/strings";

import Member from "./Member";

export default class Column extends PureComponent {
  onAddMember = () => {
    this.props.onAddMember(this.props.column.id);
  };
  onSort = () => {
    this.props.onSort(this.props.column.id);
  };

  render() {
    return (
      <div className="five wide column">
        <ColumnContainer>
          <ColumnTitle>{this.props.column.id}</ColumnTitle>
          <ColumnConnectedTitle>
            {strings.CONNECTED_USERS}: {this.props.column.onVpnInColumn}
          </ColumnConnectedTitle>

          {this.props.isAdmin && (
            <ColumnButton type="button" onClick={this.onAddMember}>
              {strings.ADD_NEW_MEMBER}
            </ColumnButton>
          )}

          {this.props.isAdmin && (
            <ColumnButton type="button" onClick={this.onSort}>
              {strings.SORT_MEMBERS}
            </ColumnButton>
          )}

          <Droppable droppableId={this.props.column.id}>
            {(provided, snapshot) => (
              <ColumnMemberList
                innerRef={provided.innerRef}
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {this.props.members.map((member, index) => {
                  return (
                    <Member
                      key={member.id}
                      member={member}
                      index={index}
                      columnId={this.props.column.id}
                      handleStateChange={this.props.handleStateChange}
                      handleDeleteMember={this.props.handleDeleteMember}
                      isAdmin={this.props.isAdmin}
                    />
                  );
                })}
              </ColumnMemberList>
            )}
          </Droppable>
        </ColumnContainer>
      </div>
    );
  }
}
