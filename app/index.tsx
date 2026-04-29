import React, {useRef, useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const innerRadi = 95;
const outerRadi = 100;

const ROW_SIZE = 2;
const ROWS = 3

enum Color {
  White = "white",
  Black = "black",
}

const dotsToText: Record<string,string> = {
  '100000': 'a',
  '101000': 'b',
  '110000': 'c',
  '110100': 'd',
  '100100': 'e',
  '111000': 'f',
  '111100': 'g',
  '101100': 'h',
  '011000': 'i',
  '011100': 'j',
  '100010': 'k',
  '101010': 'l',
  '110010': 'm',
  '110110': 'n',
  '100110': 'o',
  '111010': 'p',
  '111110': 'q',
  '101110': 'r',
  '011010': 's',
  '011110': 't',
  '100011': 'u',
  '101011': 'v',
  '011101': 'w',
  '110011': 'x',
  '110111': 'y',
  '100111': 'z',
  };

export default function HomeScreen() {
  const [buttons, onButtonsChanged] = useState(new Array(6).fill(Color.White));
  const [textResult, setTextResult] = useState('');

  const handlePress = (idx: number) => {
    const newButtons = [...buttons];
    newButtons[idx] = newButtons[idx] === Color.White ? Color.Black : Color.White;
    onButtonsChanged(newButtons);

    setTextResult(buttonsToChar(newButtons));

    // console.log("Pressed item ID:", idx);
    // console.log("Button color:", newButtons[idx]);
    // console.log(newButtons);
  };

  /**
   * 
   * @param row 
   * @returns 
   */
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

  /**
   * 
   * @param buttonArr 
   * @returns 
   */
  const buttonsToChar = (buttonArr: Array<Color>):string => {

    let binaryDots: string = buttonArr.map(n => Object.values(Color).indexOf(n)).join('');
    console.log("Binary dots:", binaryDots);
    return dotsToText[binaryDots];
  };
  
  return (
    <SafeAreaProvider>
        <SafeAreaView style={{flexDirection: 'column', alignItems: 'center' , top: 50}}>
          
          {createRow(0)}
          {createRow(1)}
          {createRow(2)}

          <Text style={styles.resultText}>
            {textResult}
          </Text>

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
    marginHorizontal: 15,
    backgroundColor: 'black'
  },
  resultText: {
    fontSize: 100,
    marginTop: 25,
  }
});
