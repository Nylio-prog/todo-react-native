// DateDisplay.js
import React, { useState } from "react";

import { format, isToday, isTomorrow, isYesterday } from "date-fns";
import { Entypo } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  HeaderButton,
  HeaderDateText,
  HeaderTitleIcon,
  RightIcon,
  colors,
} from "../styles/appStyles";

const DateDisplay = ({ date, setDate }) => {
  const [mode, setMode] = useState("date");
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

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

  const formattedDate = isToday(date)
    ? "Today"
    : isTomorrow(date)
    ? "Tomorrow"
    : isYesterday(date)
    ? "Yesterday"
    : format(date, "MM/dd/yy");

  return (
    <HeaderTitleIcon>
      <HeaderDateText>{formattedDate}</HeaderDateText>
      <RightIcon>
        <HeaderButton color={colors.primary} onPress={showDatepicker}>
          <Entypo name="calendar" size={30} color={colors.tertiary} />
        </HeaderButton>
      </RightIcon>
      {showDateTimePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </HeaderTitleIcon>
  );
};

export default DateDisplay;
