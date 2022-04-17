import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-web';
import Control from './src/components/control';
import CountDown from './src/components/countDown';
export default class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      isTimerRunning: false,
      isTimerPaused: false,
      timerState: 0,
      timer:[
        { minutes: 25, seconds: 0, type: "Work" },
        { minutes: 5, seconds: 0, type: "Break" },
      ]
      
    }
  }
  startPauseButton = (type) => {
    if (this.state.isTimerPaused && !this.state.isTimerRunning) {
      this.startTimer(type);
    } else if (this.state.isTimerRunning) {
      this.stopTimer(type);
    } else {
      // fresh start
      this.resetTimer();
      this.startTimer(type);
    }
  };
  
  componentWillUnmount() {
    clearInterval(this.timerID);
  }


  resetTimer = () => {
      this.setState({
        isTimerPaused:true,
        isTimerRunning:false,
        timer:[
          { minutes: 25, seconds: 0, type: "Work" },
          { minutes: 5, seconds: 0, type: "Break" },
      ]})
      clearInterval(this.timerID)
  }
  
  startTimer = () => {
    this.setState({isTimerRunning:true, isTimerPaused:false});
    this.timerID = setInterval(
      () => this.timeCountDown(this.state.timerState),
      1000
    );
  }

  // countDown = () => setInterval(() => this.timeCountDown(type), 1000);
  stopTimer = () => {
    this.setState({isTimerPaused:true, isTimerRunning:false});
    clearInterval(this.timerID);
  }

  timeCountDown = (type) => {
    if (this.state.timer[type].minutes == 0 & this.state.timer[type].seconds == 0){
      this.setState({timerState:!this.timerState});
    }
    if (this.state.timer[type].seconds > 0){
      const timer = [...this.state.timer];
      // timer[type].minutes--;
      timer[type].seconds--;
      this.setState({timer});
    }
    if (this.state.timer[type].minutes > 0 & this.state.timer[type].seconds == 0){
      const timer = [...this.state.timer];
      timer[type].minutes--;
      timer[type].seconds = 59;
      this.setState({timer});      
    }
    console.log(this.state);
  }

  workPress = () => {
    this.setState({timerState:0});
    // console.log(this.state.timerState);
  }

  breakPress = () => {
    this.setState({timerState:1});
    // console.log(this.state.timerState);
  }
  render() {
    return (
      <View >
        <View style = {styles.container}>
          <Text>Pomodoro Time</Text>
        </View>
        <View style = {styles.typeContainer}>
          <Button style={styles.button} onPress={this.workPress} title={'Work'}/>
          <Button style={styles.button} onPress={this.breakPress} title={'Break'}/>
        </View>

        <View>
          {/* {console.log(this.state.timer[this.state.timerState])} */}
          <CountDown time = {this.state.timer[this.state.timerState]}></CountDown>
          <Control isTimerRunning={this.state.isTimerRunning} type={this.state.timerState} onStartPausePress = {this.startPauseButton} onResetPress = {this.resetTimer}></Control>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeContainer: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "space-around",
    padding: 5,
    
  },
  button: {
    margin: 5,
    padding: 5,
  },
});
