import React, {useRef, useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const innerRadi = 95;
const outerRadi = 100;

const ROW_SIZE = 2;
const ROWS = 3

enum Color {
  Black = "black",
  White = "white",
}

let buttonArray: Array<Color> = new Array(6).fill(Color.White)

export default function HomeScreen() {
  const [buttons, onButtonsChanged] = useState(buttonArray);

  const handlePress = (idx: number) => {
    const newButtons = [...buttons]
    newButtons[idx] = newButtons[idx] === Color.White ? Color.Black : Color.White;
    onButtonsChanged(newButtons);

    console.log("Pressed item ID:", idx);
    console.log("Button color:", newButtons[idx]);
    console.log(newButtons);
  };

  const createRow = (row: number) => {
    const idx = row * ROW_SIZE;
    return (<SafeAreaView style={{flexDirection: 'row'}}>
            <Pressable onPress={() => handlePress(idx)}>
              <View style={styles.outerCircle} >
                <View style={{...styles.innerCircle, backgroundColor: buttons[idx]}} >
                </View>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress(idx+1)}>
              <View style={styles.outerCircle} >
                <View  style={{...styles.innerCircle, backgroundColor: buttons[idx+1]}} >
                </View>
              </View>
            </Pressable>
          </SafeAreaView>)
  }

  return (
    <SafeAreaProvider>
        <SafeAreaView style={{flexDirection: 'column', alignItems: 'center' , top: 50}}>

          {createRow(0)}
          {createRow(1)}
          {createRow(2)}

        </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  innerCircle: {
    width: innerRadi,
    height: innerRadi,
    borderRadius: innerRadi / 2,
    margin: (outerRadi - innerRadi)/2,
  },
  outerCircle: {
    width: outerRadi,
    height: outerRadi,
    borderRadius: outerRadi / 2,
    margin: 10,
    backgroundColor: 'black'
  },
});
