import styled from "styled-components/native";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  TextInput,
} from "react-native";
import Constants from "expo-constants";

// Colors
export const colors = {
  primary: "#3C5A6B", // Icy Blue
  secondary: "#F49578", // Warm Coral
  tertiary: "#F0E5D8", // Soft Cream
  alternative: "#7F848E", // Cool Gray
};

const statusBarHeight = Constants.statusBarHeight;

export const Container = styled.SafeAreaView`
  background-color: ${colors.primary};
  padding: 20px;
  padding-bottom: 0px;
  flex: 1;
  padding-top: ${statusBarHeight}px;
`;

// Header
export const HeaderView = styled.View`
  padding-vertical: 10px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitleIcon = styled.View`
  padding-vertical: 10px;
  margin-bottom: 15px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

export const HeaderTitle = styled.Text`
  font-size: 35px;
  font-weight: bold;
  color: ${colors.tertiary};
  letter-spacing: 2px;
  font-style: italic;
`;

export const HeaderDateText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${colors.tertiary};
  letter-spacing: 2px;
  text-align: center;
`;

export const HeaderButton = styled.TouchableOpacity`
  font-weight: bold;
  color: ${colors.tertiary};
`;

export const ChevronButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: ${colors.tertiary};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  align-self: center;
  font-weight: bold;
  color: ${colors.primary};
`;

// List
export const ListContainer = styled.View`
  margin-bottom: 30px;
  flex: 1;
  padding-bottom: 40px;
`;

export const ListView = styled.TouchableHighlight`
  background-color: ${colors.secondary};
  min-height: 85px;
  width: 100%;
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-radius: 10px;
`;

export const ListViewHidden = styled.View`
  background-color: ${colors.tertiary};
  min-height: 85px;
  width: 100%;
  padding: 15px;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 15px;
  border-radius: 10px;
`;

export const HiddenButton = styled.TouchableOpacity`
  width: 55px;
  align-items: center;
`;

export const NothingTodoContainer = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 45px;
`;

export const NothingTodoText = styled.Text`
  font-size: 18px;
  letter-spacing: 2px;
  color: ${colors.tertiary};
  font-weight: bold;
  font-style: italic;
`;

export const TodoText = styled.Text`
  font-size: 16px;
  letter-spacing: 1px;
  color: ${colors.tertiary};
`;

export const RowCompleteIcon = styled.Text`
  font-size: 10px;
  letter-spacing: 1px;
  color: ${colors.alternative};
  text-align: right;
  text-transform: uppercase;
`;

// Text for swiped todo row
export const CompletedTodoText = styled(TodoText)`
  color: ${colors.alternative};
  font-style: italic;
  text-decoration: line-through;
`;

// Modal
export const ModalButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  background-color: ${colors.tertiary};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  align-self: center;
  position: absolute;
`;

export const ModalContainer = styled.View`
  padding: 20px;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: ${colors.primary};
`;

export const ModalView = styled.View`
  background-color: ${colors.secondary};
  border-radius: 20px;
  padding: 35px;
`;

export const ModalTitleIcon = styled.View`
  padding-vertical: 10px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 300px;
`;

export const ModalDateText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.tertiary};
  letter-spacing: 2px;
`;

export const StyledInput = styled.TextInput`
  width: 300px;
  height: 50px;
  background-color: ${colors.tertiary};
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  color: ${colors.secondary};
  letter-spacing: 1px;
`;

export const ModalAction = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.color};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const ModalActionGroup = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 30px;
`;

export const ModalIcon = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

//Icon
export const RightIcon = styled.View`
  position: absolute;
  right: 0px;
`;

export const VerticalLine = styled.View`
  border-bottom-color: ${colors.secondary};
  border-bottom-width: 1px;
  margin-bottom: 15px;
`;

export const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  background-color: ${colors.primary};
  bottom: 30px;
  width: 100%;
  height: 60px;
`;

export const CheckboxContainer = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
