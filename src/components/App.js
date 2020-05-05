import React, { PureComponent } from "react";
import io from "socket.io-client";
import { DragDropContext } from "react-beautiful-dnd";

import Column from "./Column";
import Login from "./Login";
import Home from "./Home";
import Header from "./Header";
import AddModal from "./AddModal";
import AddErrorModal from "./AddErrorModal";
import DeleteConfirmationModal from "./DeleteConfimationModal";
import AdminLoginFailedModal from "./AdminLoginFailedModal";

import strings from "./utils/strings";

var socket;
var currentMemberIdToDelete;
var currentColumnIdToDeleteFrom;
var addMemberColumn;
var isAdmin = false;

const adminUserName = strings.ADMIN_LOGIN_USER_ID;
const adminPassword = strings.ADMIN_LOGIN_PASSWORD;

class App extends PureComponent {
  state = {};

  componentDidMount() {
    socket = io(strings.SERVER_URL);
    socket.on("init", this.init);
    socket.on("updateButtonState", this.updateButtonState);
    socket.on("updateTimer", this.updateTimer);
    socket.on("updateStat", this.updateStat);
    socket.on("updateState", this.updateState);
    socket.on("addMemberError", this.addMemberError);
  }

  init = (data) => {
    this.setState({
      ...data,
      showHome: true,
      showUI: false,
      showDeleteConfirmation: false,
      showAdminLoginForm: false,
      showAdminLoginFailed: false,
      showAddModal: false,
      showAddError: false,
      selectedGroup: strings.DEFAULT_SELECTED_GROUP,
    });
  };

  updateState = (data) => {
    console.log("update state ", this.state.selectedGroup);
    this.setState({
      ...data,
      showHome: false,
      showUI: true,
      showDeleteConfirmation: false,
      showAdminLoginForm: false,
      showAdminLoginFailed: false,
      showAddModal: false,
      showAddError: false,
      selectedGroup: this.state.selectedGroup,
    });
  };

  onGroupSelected = (selected) => {
    console.log("onGroupSelected ", selected);
    // console.log('onGroupSelected ', selected.value);

    this.setState({ ...this.state, selectedGroup: selected });
    console.log("onGroupSelected ", this.state.selectedGroup);
  };

  updateStat = ({
    selectedGroup,
    columnId,
    groupOnVPNCount,
    groupAvailableVPNs,
    columnOnVpns,
  }) => {
    this.setState((prevState) => ({
      ...prevState,
      groups: {
        ...prevState.groups,
        [selectedGroup]: {
          ...prevState.groups[selectedGroup],
          onVpnCount: groupOnVPNCount,
          availableVPNs: groupAvailableVPNs,
          columns: {
            ...prevState.groups[selectedGroup].columns,
            [columnId]: {
              ...prevState.groups[selectedGroup].columns[columnId],
              onVpnInColumn: columnOnVpns,
            },
          },
        },
      },
    }));
  };

  updateButtonState = ({ selectedGroup, id, buttonState }) => {
    this.setState((prevState) => ({
      ...prevState,
      groups: {
        ...prevState.groups,
        [selectedGroup]: {
          ...prevState.groups[selectedGroup],
          members: {
            ...prevState.groups[selectedGroup].members,
            [id]: {
              ...prevState.groups[selectedGroup].members[id],
              checked: buttonState,
            },
          },
        },
      },
    }));
  };

  updateTimer = ({ selectedGroup, id, timerCount }) => {
    this.setState((prevState) => ({
      ...prevState,
      groups: {
        ...prevState.groups,
        [selectedGroup]: {
          ...prevState.groups[selectedGroup],
          members: {
            ...prevState.groups[selectedGroup].members,
            [id]: {
              ...prevState.groups[selectedGroup].members[id],
              time: timerCount,
            },
          },
        },
      },
    }));
  };

  handleDeleteMember = (memberId, columnId) => {
    currentMemberIdToDelete = memberId;
    currentColumnIdToDeleteFrom = columnId;
    this.setState({
      showDeleteConfirmation: true,
      showUI: false,
      showHome: false,
      showAdminLoginForm: false,
      showAdminLoginFailed: false,
      showAddModal: false,
      showAddError: false,
    });
  };

  handleStateChange = ({ checked, id, columnId }) => {
    this.setState(
      (prevState) => ({
        ...prevState,
        groups: {
          ...prevState.groups,
          [this.state.selectedGroup]: {
            ...prevState.groups[this.state.selectedGroup],
            members: {
              ...prevState.groups[this.state.selectedGroup].members,
              [id]: {
                ...prevState.groups[this.state.selectedGroup].members[id],
                checked: checked,
              },
            },
          },
        },
      }),
      () => {
        if (checked) {
          socket.emit("startTimer", id, this.state.selectedGroup, columnId);
        } else {
          socket.emit("stopTimer", id, this.state.selectedGroup, columnId);
        }
      }
    );
  };

  onAddMember = (columnId) => {
    addMemberColumn = columnId;
    this.setState({
      showAddModal: true,
      showAddError: false,
      showAdminLoginFailed: false,
      showAdminLoginForm: false,
      showDeleteConfirmation: false,
      showHome: false,
      showUI: false,
    });
  };

  onSort = (columnId) => {
    console.log("sortColumn ", this.state.selectedGroup);
    socket.emit("sortColumn", columnId, this.state.selectedGroup);
  };

  AddMemberFormSubmitted = (formState) => {
    this.setState({
      showAddModal: false,
      showUI: true,
      showHome: false,
      showDeleteConfirmation: false,
      showAdminLoginForm: false,
      showAdminLoginFailed: false,
      showAddError: false,
    });
    if (formState.name.length !== 0) {
      socket.emit(
        "addNewMember",
        formState.name,
        addMemberColumn,
        this.state.selectedGroup
      );
    }
    console.log("add member at socket.emit", this.state.selectedGroup);
  };

  addMemberError = () => {
    this.setState({
      showAddError: true,
      showAddModal: false,
      showAdminLoginFailed: false,
      showAdminLoginForm: false,
      showDeleteConfirmation: false,
      showHome: false,
      showUI: false,
    });
  };

  dismissAddMemberError = () => {
    this.setState({
      showAdminLoginForm: false,
      showAddError: false,
      showAddModal: false,
      showAdminLoginFailed: false,
      showDeleteConfirmation: false,
      showHome: false,
      showUI: true,
    });
  };

  dismissLoginFailedError = () => {
    this.setState({
      showAdminLoginForm: true,
      showAddError: false,
      showAddModal: false,
      showAdminLoginFailed: false,
      showDeleteConfirmation: false,
      showHome: false,
      showUI: false,
    });
  };

  deleteMember = () => {
    this.setState({
      showUI: true,
      showDeleteConfirmation: false,
      showAddError: false,
      showAddModal: false,
      showAdminLoginFailed: false,
      showAdminLoginForm: false,
      showHome: false,
    });
    if (
      this.state.groups[this.state.selectedGroup].members[
        currentMemberIdToDelete
      ].checked
    ) {
      socket.emit(
        "stopTimer",
        currentMemberIdToDelete,
        this.state.selectedGroup,
        currentColumnIdToDeleteFrom,
        (timerStopped) => {
          if (timerStopped) {
            socket.emit(
              "deleteMember",
              currentMemberIdToDelete,
              currentColumnIdToDeleteFrom,
              this.state.selectedGroup
            );
          }
        }
      );
    } else {
      socket.emit(
        "deleteMember",
        currentMemberIdToDelete,
        currentColumnIdToDeleteFrom,
        this.state.selectedGroup
      );
    }
    console.log("delete member at socket.emit", this.state.selectedGroup);
  };

  deleteCancelled = () => {
    this.setState({
      showUI: true,
      showDeleteConfirmation: false,
      showAddError: false,
      showAddModal: false,
      showAdminLoginFailed: false,
      showAdminLoginForm: false,
      showHome: false,
    });
  };

  renderAddModal = () => {
    return <AddModal AddMemberFormSubmitted={this.AddMemberFormSubmitted} />;
  };

  renderAddErrorModal = () => {
    return <AddErrorModal dismissAddMemberError={this.dismissAddMemberError} />;
  };

  renderDeleteConfirmationModal = () => {
    return (
      <DeleteConfirmationModal
        currentMemberIdToDelete={currentMemberIdToDelete}
        deleteMember={this.deleteMember}
        deleteCancelled={this.deleteCancelled}
      />
    );
  };

  updateFinishColumnDndToDifferentColumn = (
    finishColumn,
    finishColumnMembers,
    draggingMemberObject
  ) => {
    let newFinishColumn = {
      ...finishColumn,
      members: finishColumnMembers,
    };
    if (draggingMemberObject.checked) {
      let newVpnInColumn = newFinishColumn.onVpnInColumn + 1;
      newFinishColumn = {
        ...newFinishColumn,
        onVpnInColumn: newVpnInColumn,
      };
    }
    return newFinishColumn;
  };

  updateStartColumnDndToDifferentColumn = (
    startColumn,
    startColumnMembers,
    draggingMemberObject
  ) => {
    let newStartColumn = {
      ...startColumn,
      members: startColumnMembers,
    };
    if (draggingMemberObject.checked) {
      let newVpnInColumn =
        newStartColumn.onVpnInColumn === 0
          ? 0
          : newStartColumn.onVpnInColumn - 1;
      newStartColumn = {
        ...newStartColumn,
        onVpnInColumn: newVpnInColumn,
      };
    }
    return newStartColumn;
  };

  handleDndToDifferentColumn = (
    source,
    destination,
    draggableId,
    startColumn,
    finishColumn
  ) => {
    const startColumnMembers = Array.from(startColumn.members);
    startColumnMembers.splice(source.index, 1);
    let draggingMemberObject = this.state.groups[this.state.selectedGroup]
      .members[draggableId];

    let newStartColumn = this.updateStartColumnDndToDifferentColumn(
      startColumn,
      startColumnMembers,
      draggingMemberObject
    );
    const finishColumnMembers = Array.from(finishColumn.members);
    finishColumnMembers.splice(destination.index, 0, draggableId);

    let newFinishColumn = this.updateFinishColumnDndToDifferentColumn(
      finishColumn,
      finishColumnMembers,
      draggingMemberObject
    );
    const newState = this.buildNewStateDndToDifferentColumn(
      newStartColumn,
      newFinishColumn
    );
    this.setState(newState);
    socket.emit("dnd", newState);
  };

  buildNewStateDndToSameColumn = (newColumn) => {
    const newState = {
      ...this.state,
      groups: {
        ...this.state.groups,
        [this.state.selectedGroup]: {
          ...this.state.groups[this.state.selectedGroup],
          columns: {
            ...this.state.groups[this.state.selectedGroup].columns,
            [newColumn.id]: newColumn,
          },
        },
      },
    };
    return newState;
  };

  buildNewStateDndToDifferentColumn = (newStartColumn, newFinishColumn) => {
    const newState = {
      ...this.state,
      groups: {
        ...this.state.groups,
        [this.state.selectedGroup]: {
          ...this.state.groups[this.state.selectedGroup],
          columns: {
            ...this.state.groups[this.state.selectedGroup].columns,
            [newStartColumn.id]: newStartColumn,
            [newFinishColumn.id]: newFinishColumn,
          },
        },
      },
    };
    return newState;
  };

  handleDndToSameColumn = (source, destination, draggableId, startColumn) => {
    const newMemberIds = Array.from(startColumn.members);
    newMemberIds.splice(source.index, 1);
    newMemberIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...startColumn,
      members: newMemberIds,
    };
    const newState = this.buildNewStateDndToSameColumn(newColumn);
    this.setState(newState);
    socket.emit("dnd", newState);
  };

  onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const startColumn = this.state.groups[this.state.selectedGroup].columns[
      source.droppableId
    ];
    const finishColumn = this.state.groups[this.state.selectedGroup].columns[
      destination.droppableId
    ];
    if (startColumn === finishColumn) {
      this.handleDndToSameColumn(source, destination, draggableId, startColumn);
      return;
    }
    //dragging from one column to another...
    this.handleDndToDifferentColumn(
      source,
      destination,
      draggableId,
      startColumn,
      finishColumn
    );
  };

  handleHomeLoginButtons = (user) => {
    if (user === strings.ANONYMOUS) {
      isAdmin = false;
      this.setState({
        ...this.state,
        showUI: true,
        showHome: false,
        showAdminLoginForm: false,
        showAdminLoginFailed: false,
        showAddError: false,
        showAddModal: false,
        showDeleteConfirmation: false,
      });
    } else {
      this.setState({
        ...this.state,
        showAdminLoginForm: true,
        showHome: false,
        showUI: false,
        showAdminLoginFailed: false,
        showAddModal: false,
        showAddError: false,
        showDeleteConfirmation: false,
      });
    }
  };

  handleAdminLoginCancelled = () => {
    isAdmin = false;
    this.setState({
      ...this.state,
      showHome: true,
      showUI: false,
      showDeleteConfirmation: false,
      showAdminLoginForm: false,
      showAdminLoginFailed: false,
      showAddModal: false,
      showAddError: false,
    });
  };

  handleAdminLoginWrongCredentials = () => {
    isAdmin = false;
    this.setState({
      ...this.state,
      showAdminLoginFailed: true,
      showAddModal: false,
      showAddError: false,
      showAdminLoginForm: false,
      showDeleteConfirmation: false,
      showHome: false,
      showUI: false,
    });
  };

  handleAdminLoginCorrectCredentials = () => {
    isAdmin = true;
    this.setState({
      ...this.state,
      showUI: true,
      showHome: false,
      showDeleteConfirmation: false,
      showAdminLoginForm: false,
      showAdminLoginFailed: false,
      showAddModal: false,
      showAddError: false,
    });
  };

  handleAdminLoginFormSumbit = ({ userName, password }, cancelled) => {
    if (cancelled) {
      this.handleAdminLoginCancelled();
    } else if (userName !== adminUserName || password !== adminPassword) {
      this.handleAdminLoginWrongCredentials();
    } else {
      //corrent uid and password
      this.handleAdminLoginCorrectCredentials();
    }
  };

  renderUIContent = () => {
    if (Object.entries(this.state).length === 0 || this.state.showHome) {
      return this.renderHome();
    } else if (this.state.showUI) {
      return this.renderMainContentUI();
    } else if (this.state.showAdminLoginForm) {
      return this.renderAdminLoginForm();
    } else if (this.state.showAdminLoginFailed) {
      return this.renderAdminLoginFailed();
    } else if (this.state.showAddModal) {
      return this.renderAddModal();
    } else if (this.state.showAddError) {
      return this.renderAddErrorModal();
    } else if (this.state.showDeleteConfirmation) {
      return this.renderDeleteConfirmationModal();
    }
  };

  renderHome = () => {
    return (
      <div>
        <Home handleHomeLoginButtons={this.handleHomeLoginButtons} />
      </div>
    );
  };

  renderAdminLoginFailed = () => {
    return (
      <AdminLoginFailedModal
        dismissLoginFailedError={this.dismissLoginFailedError}
      />
    );
  };

  renderAdminLoginForm = () => {
    return (
      <div>
        <Login onAdminLoginFormSubmit={this.handleAdminLoginFormSumbit} />
      </div>
    );
  };

  renderMainContentUI = () => {
    return (
      <div>
        <br />
        <br />
        <Header state={this.state} onGroupSelected={this.onGroupSelected} />
        <br />
        <br />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="ui container">
            {this.state.selectedGroup && (
              <div className="ui grid">
                {this.state.groups[this.state.selectedGroup].columnOrder.map(
                  (columnId) => {
                    const column = this.state.groups[this.state.selectedGroup]
                      .columns[columnId];
                    const members = column.members.map(
                      (memberId) =>
                        this.state.groups[this.state.selectedGroup].members[
                          memberId
                        ]
                    );

                    return (
                      <Column
                        key={column.id}
                        column={column}
                        members={members}
                        onAddMember={this.onAddMember}
                        onSort={this.onSort}
                        handleStateChange={this.handleStateChange}
                        handleDeleteMember={this.handleDeleteMember}
                        isAdmin={isAdmin}
                      />
                    );
                  }
                )}
              </div>
            )}
          </div>
        </DragDropContext>
      </div>
    );
  };

  render() {
    console.log("render of App ", this.state.selectedGroup);
    return this.renderUIContent();
  }
}
export default App;
