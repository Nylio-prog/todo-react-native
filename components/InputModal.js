import { Modal } from "react-native";
import React, { useEffect, useState } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign, Entypo } from "@expo/vector-icons";

import {
  ModalButton,
  ModalContainer,
  ModalView,
  StyledInput,
  ModalAction,
  ModalActionGroup,
  ModalIcon,
  HeaderTitle,
  colors,
  HeaderTitleIcon,
  RightIcon,
  DateText,
} from "../styles/appStyles";

const InputModal = ({
  modalVisible,
  setModalVisible,
  todoInputValue,
  setTodoInputValue,
  handleAddTodo,
  todoToBeEdited,
  setTodoToBeEdited,
  handleEditTodo,
  todos,
}) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

  // useEffect(() => {
  //   if (todoToBeEdited?.date != null) {
  //     let dateArray = todoToBeEdited.date.split("/");
  //     setDate(new Date("20" + dateArray[2], dateArray[1] - 1, dateArray[0]));
  //   }
  // }, [todoToBeEdited]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDateTimePicker(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShowDateTimePicker(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });

  const handleCloseModal = () => {
    setModalVisible(false);
    setTodoInputValue("");
    setTodoToBeEdited(null);
  };

  const handleSubmit = () => {
    if (!todoToBeEdited) {
      handleAddTodo({
        title: todoInputValue,
        date: formattedDate,
        key: `${
          (todos[todos.length - 1] &&
            parseInt(todos[todos.length - 1].key) + 1) ||
          1
        }`,
      });
    } else {
      handleEditTodo({
        title: todoInputValue,
        date: formattedDate,
        key: todoToBeEdited.key,
      });
    }
    setTodoInputValue("");
  };

  return (
    <>
      <ModalButton
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <AntDesign name="plus" size={30} color={colors.secondary} />
      </ModalButton>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <ModalContainer>
          <ModalView>
            <ModalIcon>
              <HeaderTitleIcon>
                <HeaderTitle>Todo</HeaderTitle>
                <RightIcon>
                  <ModalAction color={colors.primary} onPress={showDatepicker}>
                    <Entypo name="calendar" size={30} color={colors.tertiary} />
                  </ModalAction>
                </RightIcon>
              </HeaderTitleIcon>
              {showDateTimePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
              <DateText>{formattedDate}</DateText>
            </ModalIcon>
            <StyledInput
              placeholder="Add a todo"
              placeholderTextColor={colors.alternative}
              selectionColor={colors.secondary}
              autoFocus={true}
              onChangeText={(text) => setTodoInputValue(text)}
              value={todoInputValue}
              onSubmitEditing={handleSubmit}
            />

            <ModalActionGroup>
              <ModalAction color={colors.primary} onPress={handleCloseModal}>
                <AntDesign name="close" size={28} color={colors.tertiary} />
              </ModalAction>
              <ModalAction color={colors.tertiary} onPress={handleSubmit}>
                <AntDesign name="check" size={28} color={colors.secondary} />
              </ModalAction>
            </ModalActionGroup>
          </ModalView>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default InputModal;
