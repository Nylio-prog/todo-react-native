import { Modal } from "react-native";
import React, { useEffect, useState } from "react";

import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

import { schedulePushNotification } from "./utils/handle-local-notification";

import {
  ModalButton,
  ModalContainer,
  ModalView,
  StyledInput,
  ModalAction,
  ModalActionGroup,
  ModalIcon,
  ModalDateText,
  HeaderTitle,
  colors,
  RightIcon,
  ModalTitleIcon,
  CheckboxContainer,
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
  date,
  setDate,
  todos,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [reminderChecked, setReminderChecked] = useState(false);

  // If we're editing a date, we want to set the date to this date otherwise to the today's date
  useEffect(() => {
    if (todoToBeEdited?.date != null) {
      const [month, day, year] = todoToBeEdited.date.split("/");
      setDate(new Date(`20${year}`, month - 1, day));
    } else {
      setDate(new Date());
    }
  }, [todoToBeEdited]);

  useEffect(() => {
    setShowTimePicker(reminderChecked);
  }, [reminderChecked]);

  const handleLocalPushNotification = async (title, date) => {
    await schedulePushNotification(title, date);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    let currentTime = selectedTime;
    currentTime.setSeconds(0); //Notification is sent at the beginning of the minute
    setShowTimePicker(false);
    setDate(currentTime);
  };

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });

  const handleCloseModal = () => {
    setModalVisible(false);
    setTodoInputValue("");
    setTodoToBeEdited(null);
    setReminderChecked(false);
  };

  const handleSubmit = () => {
    const todoTitle = todoInputValue || "Doing nothing is not a todo";
    if (!todoToBeEdited) {
      handleAddTodo({
        title: todoTitle,
        date: formattedDate,
        key: `${
          (todos[todos?.length - 1] &&
            parseInt(todos[todos?.length - 1].key) + 1) ||
          1
        }`,
        completed: false,
      });
    } else {
      handleEditTodo({
        title: todoTitle,
        date: formattedDate,
        key: todoToBeEdited.key,
        completed: todoToBeEdited.completed,
      });
    }

    //send notification if reminder
    if (reminderChecked) {
      console.log(date);
      handleLocalPushNotification(todoTitle, date);
    }
    setTodoInputValue("");
    setReminderChecked(false);
  };

  return (
    <>
      <ModalButton
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <AntDesign name="plus" size={30} color={colors.primary} />
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
              <ModalTitleIcon>
                <HeaderTitle>Todo</HeaderTitle>
                <RightIcon>
                  <ModalAction
                    color={colors.primary}
                    onPress={setShowDatePicker}
                  >
                    <Entypo name="calendar" size={30} color={colors.tertiary} />
                  </ModalAction>
                </RightIcon>
              </ModalTitleIcon>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="date"
                  is24Hour={true}
                  onChange={onChangeDate}
                />
              )}
              <ModalDateText>{formattedDate}</ModalDateText>
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
            <CheckboxContainer>
              <ModalDateText>Reminder ?</ModalDateText>
              <Checkbox
                color={reminderChecked ? colors.primary : undefined}
                style={{ margin: 8 }}
                value={reminderChecked}
                onValueChange={setReminderChecked}
              />
              {showTimePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode="time"
                  is24Hour={true}
                  onChange={onChangeTime}
                />
              )}
            </CheckboxContainer>
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
