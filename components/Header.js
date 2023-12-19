import React from "react";
import { Entypo } from "@expo/vector-icons";

import {
  HeaderView,
  HeaderTitle,
  HeaderButton,
  colors,
} from "./../styles/appStyles";

const Header = ({ handleClearTodos }) => {
  return (
    <HeaderView>
      <HeaderTitle>Todos</HeaderTitle>
      <HeaderButton onPress={handleClearTodos}>
        <Entypo name="trash" size={25} color={colors.tertiary} />
      </HeaderButton>
    </HeaderView>
  );
};

export default Header;
