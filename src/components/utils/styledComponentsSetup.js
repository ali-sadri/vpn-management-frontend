import styled from "styled-components";

export const ColumnContainer = styled.div`
  border: 1px solid grey;
  border-radius: 2px;
  padding: 5px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const ColumnTitle = styled.h3`
  text-align: center;
  padding: 0px;
  font-size: 24px;
`;

export const ColumnConnectedTitle = styled.div`
  text-align: center;
  font-size: 18px;
  padding-bottom: 7px;
  font-weight: bold;
`;

export const ColumnButton = styled.button`
  font-size: 1.1em;
  margin: 0.5em;
  padding: 0.25em 1em;
  border: 1px solid grey;
  border-radius: 3px;
  background-color: #2e86c1;
  height: 40px;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

export const ColumnMemberList = styled.div`
  padding: 8px;
  background-color: ${(props) =>
    props.isDraggingOver ? "lightgrey" : "white"};
  flex-grow: 1;
  min-height: 300px;
`;

export const HeaderTotalVPNs = styled.span`
  color: #2980b9;
`;

export const HeaderAvailableVPNsText = styled.h2`
  margin-left: 60px;
`;

export const HeaderAvailableVPNs = styled.span`
  color: red;
`;

export const HomeContainer = styled.div`
  border: 1px solid grey;
  border-radius: 2px;
  padding: 35px;
  width: 700px;
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
`;

export const HomeTitle = styled.div`
  text-align: center;
`;

export const HomeLogin = styled.div`
  display: flex;
  justify-content: center;
`;

export const LoginFormContainer = styled.div`
  border: 1px solid grey;
  border-radius: 2px;
  padding: 20px;
  padding-bottom: 20px;
  max-width: 700px;
  min-height: 320px;
`;

export const MemberContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 5px;
  padding-top: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: ${(props) => (props.isDragging ? "#AED6F1" : "white")};
`;

export const MemberTime = styled.h4`
  text-align: center;
  font-size: 18px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

export const MemberTitle = styled.h3`
  text-align: center;
`;
