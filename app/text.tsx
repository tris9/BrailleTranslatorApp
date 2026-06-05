import React, { useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Button, TouchableOpacity, TextInput} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import {isCharAlphaNum, charToNum, textToBraille, windowWidth, windowHeight} from './utils';

export default function TextScreen() {
  const [text, onChangeText] = React.useState('');
  const [brailleText, setBrailleText] = React.useState('');

  const router = useRouter();

  const changeTextToBraille = () => {
    let brailleResult = "";
    const lowerText: string = text.toLowerCase();
    for (const char of lowerText){
      brailleResult += textToBraille[char] === undefined ? '☐' : textToBraille[char];
    }
    setBrailleText(brailleResult)
  }

  return (
    <SafeAreaProvider style={{ flexDirection: "column", alignItems: "center"}}>
      <TouchableOpacity style={styles.navButton} onPress={() => router.back()} >
        <Text style={styles.navButtonText}>⇋</Text>
      </TouchableOpacity>

      <View style={{ top: windowHeight*0.1 }}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
        <TouchableOpacity style={styles.enterButton} onPress={() => changeTextToBraille()} >
          <Text style={styles.enterButtonText}>⇓</Text>
        </TouchableOpacity>

        <Text selectable={true} style={styles.brailleResult}>{brailleText}</Text>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  input: {
      borderRadius: 20,
      height: windowHeight*0.1,
      width: windowWidth*0.7,
      borderWidth: 1,
      padding: 15,
      top: windowHeight*0.1,
      fontSize: windowHeight*0.04,
      alignSelf: 'center',
    },
  enterButton: {
    paddingHorizontal: windowWidth*0.05,
    borderRadius: 30,
    backgroundColor: "teal",
    position: "center",
    alignSelf: 'center',
    top: windowHeight*0.15,
  },
 enterButtonText: {
    fontSize: windowWidth*0.3,
    bottom: windowHeight*0.02,
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
  },
  brailleResult: {
    fontSize: windowWidth*0.1,
    top: windowHeight*0.2,
    paddingHorizontal: windowWidth*0.01,
    paddingVertical: windowHeight*0.02,
    backgroundColor: 'lightgrey',
    borderRadius: 20,
  }
  });