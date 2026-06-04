import React, { useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Button, TouchableOpacity, Dimensions} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const dotScaleFactor = 4;
const dotLineWidth = 5;
const dotHorizontalSpacing = windowWidth*0.02;
const dotVerticalSpacing = windowHeight*0.02;

const outerRadi = windowWidth/dotScaleFactor;
const innerRadi = outerRadi - dotLineWidth;

const ROW_SIZE = 2;
const ROWS = 3;

enum Color {
  White = "white",
  Black = "black",
}

const dotsToText: Record<string, string> = {
  "100000": "a",
  "101000": "b",
  "110000": "c",
  "110100": "d",
  "100100": "e",
  "111000": "f",
  "111100": "g",
  "101100": "h",
  "011000": "i",
  "011100": "j",
  "100010": "k",
  "101010": "l",
  "110010": "m",
  "110110": "n",
  "100110": "o",
  "111010": "p",
  "111110": "q",
  "101110": "r",
  "011010": "s",
  "011110": "t",
  "100011": "u",
  "101011": "v",
  "011101": "w",
  "110011": "x",
  "110111": "y",
  "100111": "z",
  "001101": ".",
  "001000": ",",
  "001110": "!",
  "001011": "?",
  "001100": ":",
  "001010": ";",
  "000011": "-",
  "010010": "/",
  "100001": "\\",
  "000010": "'",
  "000110": "*",
  "010111": "#",
  "010110": "@",
  "001111": "=",
  "000000": " ",
};

const brailleTextToNumber: Record<string, string> = {
  "a":"1",
  "b":"2",
  "c":"3",
  "d":"4",
  "e":"5",
  "f":"6",
  "g":"7",
  "h":"8",
  "i":"9",
  "j":"0",
};

export default function HomeScreen() {
  const [buttons, setDotButtons] = useState(new Array(6).fill(Color.White));
  const [textResult, setTextResult] = useState("");
  const [savedText, setSavedText] = useState("");

  const router = useRouter();

  const handlePress = (idx: number) => {
    const newButtons = [...buttons];
    newButtons[idx] = newButtons[idx] === Color.White ? Color.Black : Color.White;
    setDotButtons(newButtons);

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
    return (
      <View style={{ flexDirection: "row" }}>
        <Pressable onPress={() => handlePress(idx)}>
          <View style={styles.outerCircle}>
            <View style={{ ...styles.innerCircle, backgroundColor: buttons[idx] }} >
            </View>
          </View>
        </Pressable>
        <Pressable onPress={() => handlePress(idx + 1)}>
          <View style={styles.outerCircle}>
            <View style={{ ...styles.innerCircle, backgroundColor: buttons[idx + 1] }} >
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  /**
   *
   * @param buttonArr
   * @returns
   */
  const buttonsToChar = (buttonArr: Array<Color>): string => {
    let binaryDots: string = buttonArr.map((n) => Object.values(Color).indexOf(n)).join("");
    //console.log("Binary dots:", binaryDots);
    return dotsToText[binaryDots];
  };

  const isCharAlphaNum = (char: string): boolean => {
    return char >= 'a' && char <= 'j';
  };

  const charToNum = (char: string): string => {
    if(char.length == 1){
      return brailleTextToNumber[char];
    } else {
      return "";
    }
  };

  const handleCompound = () => {
    let compoundStr = savedText;
    for(let i = 0; i < savedText.length; i++){
      // Number case
      if (savedText[i] == '#'){
        let hashIndex: int = i;
        i++;

        let charNum: string = "";
        while (isCharAlphaNum(savedText[i]) && i < savedText.length) {
          charNum += charToNum(savedText[i]);
          i++;
        };
        let substr: string = savedText.substring(hashIndex,i);

        if(substr.length > 1 && isCharAlphaNum(substr[1])){
          compoundStr = compoundStr.replace(substr,charNum);
          i--;
        }
      };
    };

    //console.log("Compound String: ", compoundStr);

    setSavedText(compoundStr);
  };

  const handleEnterButton = () => {
    let newText: string = textResult ? savedText + textResult : savedText + " ";

    setSavedText(newText);
    setTextResult("");
    setDotButtons(new Array(6).fill(Color.White));
  };

const handleClearButton = () => {
    setSavedText("");
  };

const handleBackButton = () => {
    if (savedText) {
      let newText: string = savedText.slice(0,-1);
      setSavedText(newText);
    }
  };

  return (
    <SafeAreaProvider>
      <View style={{ flexDirection: "column", alignItems: "center" }} >

        <TouchableOpacity style={styles.navButton} onPress={() => router.navigate('/text')} >
          <Text style={styles.navButtonText}>⇋</Text>
        </TouchableOpacity>

        <View>
          <View style={{ marginTop: windowHeight*0.1 }}>
            {createRow(0)}
          </View>
          <View style={{ marginTop: dotVerticalSpacing }}>
            {createRow(1)}
          </View>
          <View style={{ marginTop: dotVerticalSpacing }}>
            {createRow(2)}
          </View>
        </View>

        <Text style={styles.resultText}>{textResult}</Text>

        <TouchableOpacity style={styles.enterButton} onPress={() => handleEnterButton()} >
          <Text style={styles.enterButtonText}>↲</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.savedTextArea} onPress={() => handleCompound()}>
          <View >
            <Text style={styles.savedText}>{savedText}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearButton} onPress={() => handleClearButton()} >
          <Text style={styles.clearButtonText}>☒</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => handleBackButton()} >
          <Text style={styles.backButtonText}>⌫</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  innerCircle: {
    width: innerRadi,
    height: innerRadi,
    borderRadius: innerRadi / 2,
    margin: dotLineWidth/2,
  },
  outerCircle: {
    width: outerRadi,
    height: outerRadi,
    borderRadius: outerRadi / 2,
    marginHorizontal: dotHorizontalSpacing,
    backgroundColor: "black",
  },
  resultText: {
    fontSize: windowWidth*0.3,
    position: "absolute",
    top: windowHeight*0.52,
    alignItems: 'center',
    textAlign: "center",
    textAlignVertical: "center",
  },
  savedTextArea: {
    borderRadius: 25,
    paddingHorizontal: windowWidth*0.05,
    position: "absolute",
    top: windowHeight*0.78,
    backgroundColor: 'lightgray'

  },
  savedText: {
    fontSize: windowWidth*0.1,
  },
  clearButton: {
    paddingHorizontal: windowWidth*0.05,
    borderRadius: 20,
    backgroundColor: "tomato",
    position: "absolute",
    left: windowWidth*0.05,
    top: windowHeight*0.87,
  },
  clearButtonText: {
    fontSize: windowWidth*0.12,
  },
  backButton: {
    paddingHorizontal: windowWidth*0.05,
    borderRadius: 20,
    backgroundColor: "khaki",
    position: "absolute",
    right: windowWidth*0.05,
    top: windowHeight*0.87,
  },
  backButtonText: {
    fontSize: windowWidth*0.12,
  },
  enterButton: {
    paddingHorizontal: windowWidth*0.03,
    borderRadius: 30,
    backgroundColor: "teal",
    position: "absolute",
    right: windowWidth*0.05,
    top: windowHeight*0.55,
  },
  enterButtonText: {
    fontSize: windowWidth*0.20,
  },
  navButton: {
    paddingHorizontal: windowWidth*0.01,
    borderRadius: 20,
    backgroundColor: "lightsteelblue",
    position: "absolute",
    top: windowHeight*0.05,
    left: windowWidth*0.05,
    alignSelf: "center",
  },
  navButtonText: {
    fontSize: windowWidth*0.1,
  }
});
