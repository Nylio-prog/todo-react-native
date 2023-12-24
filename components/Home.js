import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Entypo } from "@expo/vector-icons";

import Header from "./Header";
import ListItems from "./ListItems";
import InputModal from "./InputModal";
import {
  FooterContainer,
  RightIcon,
  HeaderButton,
  colors,
} from "../styles/appStyles";

import { cancelScheduledNotification } from "./utils/handle-local-notification";

const Home = ({ todos, setTodos, isSnowTheme, setIsSnowTheme }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [todoInputValue, setTodoInputValue] = useState();
  const [todoToBeEdited, setTodoToBeEdited] = useState(null);
  const [date, setDate] = useState(new Date());

  const handleCancelPushNotification = async (uuid) => {
    await cancelScheduledNotification(uuid);
  };

  const handleClearTodos = () => {
    // Partition the todos into two arrays: toDelete and toKeep
    const { toDelete, toKeep } = todos.reduce(
      (acc, todo) => {
        const [month, day, year] = todo.date.split("/");
        const todoDate = new Date(new Date(`20${year}`, month - 1, day));

        if (
          todoDate.getDate() === date.getDate() &&
          todoDate.getMonth() === date.getMonth() &&
          todoDate.getFullYear() === date.getFullYear()
        ) {
          acc.toDelete.push(todo);
        } else {
          acc.toKeep.push(todo);
        }

        return acc;
      },
      { toDelete: [], toKeep: [] }
    );

    // Cancel notifications for todos to be deleted
    toDelete.forEach((todo) => {
      handleCancelPushNotification(todo.uuid);
    });

    AsyncStorage.setItem("storedTodos", JSON.stringify(toKeep))
      .then(() => {
        setTodos(toKeep); // Also triggers to reset the selectedDateTodos
      })
      .catch((error) => console.log(error));
  };

  const handleTriggerEdit = (item) => {
    setTodoToBeEdited(item);
    setModalVisible(true);
    setTodoInputValue(item.title);
  };

  const handleAddTodo = (todo) => {
    const newTodos = [...todos, todo];

    AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos))
      .then(() => {
        setTodos(newTodos);
        setModalVisible(false);
      })
      .catch((error) => console.log(error));
  };

  const handleEditTodo = (editedTodo) => {
    const newTodos = [...todos];
    const todoIndex = todos.findIndex((todo) => todo.key === editedTodo.key);
    newTodos.splice(todoIndex, 1, editedTodo);

    AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos))
      .then(() => {
        setTodos(newTodos);
        setTodoToBeEdited(null);
        setModalVisible(false);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Header
        handleClearTodos={handleClearTodos}
        date={date}
        setDate={setDate}
      />
      <ListItems
        todos={todos}
        setTodos={setTodos}
        handleTriggerEdit={handleTriggerEdit}
        date={date}
      />
      <FooterContainer>
        <InputModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          todoInputValue={todoInputValue}
          setTodoInputValue={setTodoInputValue}
          handleAddTodo={handleAddTodo}
          todoToBeEdited={todoToBeEdited}
          setTodoToBeEdited={setTodoToBeEdited}
          handleEditTodo={handleEditTodo}
          todos={todos}
          date={date}
          setDate={setDate}
        />
        <RightIcon>
          <HeaderButton
            color={colors.primary}
            onPress={() => setIsSnowTheme((prevTheme) => !prevTheme)}
          >
            <>
              <Entypo
                name={isSnowTheme ? "eye" : "eye-with-line"}
                size={26}
                color={colors.tertiary}
              />
            </>
          </HeaderButton>
        </RightIcon>
      </FooterContainer>
    </>
  );
};

export default Home;
