import React, { useState, useEffect } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Entypo } from "@expo/vector-icons";
import {
  ListView,
  ListViewHidden,
  HiddenButton,
  CompletedTodoText,
  NothingTodoContainer,
  NothingTodoText,
  TodoText,
  TodoDate,
  colors,
} from "./../styles/appStyles";
const ListItems = ({ todos, setTodos, handleTriggerEdit, date }) => {
  const [sortedTodos, setSortedTodos] = useState(todos);
  const [selectedDateTodos, setSelectedDateTodos] = useState(todos);

  useEffect(() => {
    // Filter todos for the selected date
    const filteredTodos = todos.filter((todo) => {
      const [month, day, year] = todo.date.split("/");
      const todoDate = new Date(new Date(`20${year}`, month - 1, day));
      return (
        todoDate.getDate() === date.getDate() &&
        todoDate.getMonth() === date.getMonth() &&
        todoDate.getFullYear() === date.getFullYear()
      );
    });

    setSelectedDateTodos(filteredTodos);
  }, [date, todos]);

  useEffect(() => {
    if (!selectedDateTodos || selectedDateTodos.length === 0) {
      setSortedTodos([]);
    } else {
      const completedTodos = selectedDateTodos
        .filter((todo) => todo.completed)
        .sort((a, b) => b.key - a.key);
      const incompletedTodos = selectedDateTodos
        .filter((todo) => !todo.completed)
        .sort((a, b) => b.key - a.key);
      const orderedTodos = incompletedTodos.concat(completedTodos);

      setSortedTodos(orderedTodos);
    }
  }, [selectedDateTodos]);

  const handleCompleteTodo = (todoKey) => {
    const newTodos = [...todos];
    const todoIndex = todos.findIndex((todo) => todo.key === todoKey);

    if (todoIndex !== -1) {
      newTodos[todoIndex] = {
        ...newTodos[todoIndex],
        completed: true,
      };

      console.log(newTodos);

      AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos))
        .then(() => {
          setTodos(newTodos);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleDeleteTodo = (rowKey) => {
    const newTodos = [...todos];
    const todoIndex = todos.findIndex((todo) => todo.key === rowKey);
    newTodos.splice(todoIndex, 1);

    AsyncStorage.setItem("storedTodos", JSON.stringify(newTodos))
      .then(() => {
        setTodos(newTodos);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {sortedTodos?.length == 0 && (
        <NothingTodoContainer>
          <NothingTodoText>Nothing</NothingTodoText>
        </NothingTodoContainer>
      )}
      {sortedTodos?.length != 0 && (
        <SwipeListView
          data={sortedTodos}
          renderItem={(data) => {
            const RowText =
              data.item.completed == true ? CompletedTodoText : TodoText;
            return (
              <ListView
                underlayColor={colors.primary}
                onPress={() => {
                  handleTriggerEdit(data.item);
                }}
              >
                <>
                  <RowText>{data.item.title}</RowText>
                  <TodoDate>{data.item.date}</TodoDate>
                </>
              </ListView>
            );
          }}
          renderHiddenItem={(data) => {
            return (
              <ListViewHidden>
                <HiddenButton onPress={() => handleDeleteTodo(data.item.key)}>
                  <Entypo name="trash" size={25} color={colors.secondary} />
                </HiddenButton>
              </ListViewHidden>
            );
          }}
          rightOpenValue={-80}
          leftActivationValue={125}
          onLeftAction={(todoKey) => {
            handleCompleteTodo(todoKey);
          }}
          previewRowKey={"1"}
          previewOpenValue={-80}
          previewOpenDelay={3000}
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            paddingBottom: 30,
            marginBottom: 40,
          }}
        />
      )}
    </>
  );
};

export default ListItems;
