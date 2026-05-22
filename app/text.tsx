import React, { useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Button, TouchableOpacity, TextInput} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';

const textToBraille: Record<string, string> = {
  "a":"⠁",
  "b":"⠃",
  "c":"⠉",
  "d":"⠙",
  "e":"⠑",
  "f":"⠋",
  "g":"⠛",
  "h":"⠓",
  "i":"⠊",
  "j":"⠚",
  "k":"⠅",
  "l":"⠇",
  "m":"⠍",
  "n":"⠝",
  "o":"⠕",
  "p":"⠏",
  "q":"⠟",
  "r":"⠗",
  "s":"⠎",
  "t":"⠞",
  "u":"⠥",
  "v":"⠧",
  "w":"⠺",
  "x":"⠭",
  "y":"⠽",
  "z":"⠵",
  ".":"",
  ",":"",
  "!":"",
  "?":"",
  ":":"",
  ";":"",
  "-":"",
  "/":"",
  "\\":"",
  "'":"",
  "*":"",
  "#":"",
  "@":"",
  "=":"",
  " ":"⠀",
}

export default function TextScreen() {
  const [text, onChangeText] = React.useState('');
  const [brailleText, setBrailleText] = React.useState('');

  const router = useRouter();

  const changeTextToBraille = () => {
    let brailleResult = "";
    for (const char of text){
      brailleResult += textToBraille[char];
      console.log("Char: ", char)
    }
    setBrailleText(brailleResult)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flexDirection: "column", alignItems: "center", top: 50 }} >

        <TouchableOpacity style={styles.navButton} onPress={() => router.back()} >
          <Text style={styles.navButtonText}>⇋</Text>
        </TouchableOpacity>

        <View style={{ top: 75 }}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={text}
          />
          <TouchableOpacity style={styles.enterButton} onPress={() => changeTextToBraille()} >
            <Text style={styles.enterButtonText}>⇓</Text>
          </TouchableOpacity>

          <Text style={styles.brailleResult}>{brailleText}</Text>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  input: {
      borderRadius: 20,
      height: 80,
      width: 250,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      top: 50,
      fontSize: 50,
      alignSelf: 'center',
    },
  backButtonText: {
      fontSize: 50,
    },
  enterButton: {
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "teal",
    position: "center",
    alignSelf: 'center',
    right: 0,
    top: 100,
  },
 enterButtonText: {
    fontSize: 100,
    bottom: 25,
  },
  navButton: {
      borderRadius: 20,
      backgroundColor: "lightsteelblue",
      position: "absolute",
      top: 10,
      left: 25,
      alignSelf: "center",
    },
    navButtonText: {
      fontSize: 50,
      bottom: 7,
    },
    brailleResult: {
      fontSize: 50,
      top: 150,
      paddingHorizontal: 25,
      paddingVertical: 5,
      backgroundColor: 'lightgrey',
      borderRadius: 20,
    }
  });