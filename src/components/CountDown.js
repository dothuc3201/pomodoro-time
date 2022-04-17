import React, { Component } from 'react';
import { View } from 'react-native-web';
import ClockView from './ClockView';
class CountDown extends Component {
    constructor(props) {
        super(props);
    } 
    
    render() { 
        return ( 
            // {this.props}
            <View>
            <ClockView time={this.props.time} /> 
            </View>
        );
    }
}
 
export default CountDown;