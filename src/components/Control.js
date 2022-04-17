import React from 'react';
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import { Button } from 'react-native-web';

const Control = (props) => {
    const startPauseText = props.isTimerRunning ? "Pause" : "Start";
    return (
      <View style={style.controlContainer}>
        <Button
          style={style.button}
          onPress={() => props.onStartPausePress(props.type)}
          title={startPauseText}
        />
        <Button
          style={style.button}
          onPress={props.onResetPress}
          title="Reset"
        />
      </View>
    );
  };

  const style = StyleSheet.create({
    controlContainer: {
      flex: 1,
      alignSelf: "stretch",
      flexDirection: "row",
      justifyContent: "space-around",
      alignContent: "space-around",
      padding: 5,
    },
    button: {
      margin: 5,
      padding: 5,
    },
  });
  
  export default Control;