import React from "react";
import { Entypo } from "@expo/vector-icons";

import {
  HeaderView,
  HeaderTitle,
  HeaderButton,
  VerticalLine,
  colors,
} from "./../styles/appStyles";

import DateDisplay from "./DateDisplay";

const Header = ({ handleClearTodos, date, setDate }) => {
  return (
    <>
      <HeaderView>
        <HeaderTitle>Todos</HeaderTitle>
        <HeaderButton onPress={handleClearTodos}>
          <Entypo name="trash" size={25} color={colors.tertiary} />
        </HeaderButton>
      </HeaderView>
      <VerticalLine />
      <DateDisplay date={date} setDate={setDate} />
      <VerticalLine />
    </>
  );
};

export default Header;
