/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');

// 跑马灯效果视图(竖直方向，无限循环)
import HorseRaceLamp from './HorseRaceLamp'

const demoData = [{
  leftText: 'leftText1',
  rightText: 'rightText1',
}, {
  leftText: 'leftText2',
  rightText: 'rightText2',
}, {
  leftText: 'leftText3',
  rightText: 'rightText3',
}, {
  leftText: 'leftText4',
  rightText: 'rightText4',
}, {
  leftText: 'leftText5',
  rightText: 'rightText5',
}, {
  leftText: 'leftText6',
  rightText: 'rightText6',
}];

export default class HorseRaceLampDeom extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <HorseRaceLamp 
            dataArr={demoData}
            maxShowNum={4}
            rowHeight={36}
            style={{width: width, marginTop: 100}}
            renderRow={this.renderRow1.bind(this)}
        />
        <HorseRaceLamp 
          dataArr={demoData}
          maxShowNum={5}
          rowHeight={50}
          style={{width: width, marginTop: 50, backgroundColor: '#dddddd', marginBottom: 20}}
          renderRow={this.renderRow2.bind(this)}          
        />
      </View>
    );
  }

  //第一种Row
  renderRow1(item, index, opacity) {
    return (
      <View key={index} style={[styles.rowStyle1,{opacity: opacity}]}>
          <Text style={styles.textStyle1}>{item.leftText}</Text>
          <Text style={styles.textStyle1}>{item.rightText}元</Text>
      </View>
    );
  }

  //第二种Row
  renderRow2(item, index, opacity) {
    return (
      <View key={index} style={[styles.rowStyle2, {opacity: opacity}]}>
        <Text style={styles.textStyle2}>{item.leftText}</Text>
        <Text style={styles.textStyle2}>{item.rightText}万</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  rowStyle1: {
      flexDirection: 'row',
      height: 36,
      marginHorizontal: 15,
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: 'gray'
  },
  textStyle1: {
      fontSize: 18,
      lineHeight: 21,
  },

  rowStyle2: {
      width: width,
      height: 50,
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: 'gray'
  },
  textStyle2: {
      fontSize: 14,
      lineHeight: 20,
      color: '#333',
      flex: 1,
  },

});

AppRegistry.registerComponent('HorseRaceLamp', () => HorseRaceLampDeom);
