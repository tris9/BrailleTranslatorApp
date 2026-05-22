import React, { useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Button, TouchableOpacity,} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';

const innerRadi = 95;
const outerRadi = 100;

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
      <SafeAreaView style={{ flexDirection: "row" }}>
        <Pressable onPress={() => handlePress(idx)}>
          <View style={styles.outerCircle}>
            <View
              style={{ ...styles.innerCircle, backgroundColor: buttons[idx] }}
            ></View>
          </View>
        </Pressable>
        <Pressable onPress={() => handlePress(idx + 1)}>
          <View style={styles.outerCircle}>
            <View
              style={{
                ...styles.innerCircle,
                backgroundColor: buttons[idx + 1],
              }}
            ></View>
          </View>
        </Pressable>
      </SafeAreaView>
    );
  };

  /**
   *
   * @param buttonArr
   * @returns
   */
  const buttonsToChar = (buttonArr: Array<Color>): string => {
    let binaryDots: string = buttonArr.map((n) => Object.values(Color).indexOf(n)).join("");
    console.log("Binary dots:", binaryDots);
    return dotsToText[binaryDots];
  };

  const handleEnterButton = () => {
    let newText: string = "";
    if (textResult) {
      newText = savedText + textResult;
      setSavedText(newText);
      setTextResult("");
      setDotButtons(new Array(6).fill(Color.White));
    }
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
      <SafeAreaView style={{ flexDirection: "column", alignItems: "center", top: 50 }} >

        <TouchableOpacity style={styles.navButton} onPress={() => router.navigate('/text')} >
          <Text style={styles.navButtonText}>⇋</Text>
        </TouchableOpacity>

        <View style={{ top: 20 }}>
          {createRow(0)}
          {createRow(1)}
          {createRow(2)}
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={styles.resultText}>{textResult}</Text>

          <TouchableOpacity style={styles.enterButton} onPress={() => handleEnterButton()} >
            <Text style={styles.enterButtonText}>↲</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.savedTextArea}>
          <Text style={styles.savedText}>{savedText}</Text>
        </View>

        <TouchableOpacity style={styles.clearButton} onPress={() => handleClearButton()} >
          <Text style={styles.clearButtonText}>☒</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => handleBackButton()} >
          <Text style={styles.clearButtonText}>⌫</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  innerCircle: {
    width: innerRadi,
    height: innerRadi,
    borderRadius: innerRadi / 2,
    margin: (outerRadi - innerRadi) / 2,
  },
  outerCircle: {
    width: outerRadi,
    height: outerRadi,
    borderRadius: outerRadi / 2,
    marginHorizontal: 15,
    backgroundColor: "black",
  },
  resultText: {
    fontSize: 100,
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
  },
  savedTextArea: {
    borderRadius: 25,
    padding: 10,
    top: 20,
    position: "center",
    backgroundColor: 'lightgray'

  },
  savedText: {
    fontSize: 40,
  },
  clearButton: {
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "tomato",
    position: "absolute",
    left: 25,
    bottom: -75,
    alignSelf: "center",
  },
  clearButtonText: {
    fontSize: 50,
  },
  backButton: {
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "khaki",
    position: "absolute",
    right: 25,
    bottom: -75,
    alignSelf: "center",
  },
  backButtonText: {
    fontSize: 50,
  },
  enterButton: {
    paddingHorizontal: 10,
    borderRadius: 30,
    backgroundColor: "teal",
    position: "absolute",
    right: 25,
  },
  enterButtonText: {
    fontSize: 100,
    bottom: 10,
  },
  navButton: {
    borderRadius: 20,
    backgroundColor: "lightsteelblue",
    position: "absolute",
    top: 5,
    left: 25,
    alignSelf: "center",
  },
  navButtonText: {
    fontSize: 50,
    bottom: 7,
  }
});
