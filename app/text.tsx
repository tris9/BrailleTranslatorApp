import React, { useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Button, TouchableOpacity, TextInput} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';

const textToBraille: Record<string, string> = {
  "a":"⠁",
  "b":"",
  "c":"",
  "d":"",
  "e":"",
  "f":"",
  "g":"",
  "h":"",
  "i":"",
  "j":"",
  "k":"",
  "l":"",
  "m":"",
  "n":"",
  "o":"",
  "p":"",
  "q":"",
  "r":"",
  "s":"",
  "t":"",
  "u":"",
  "v":"",
  "w":"",
  "x":"",
  "y":"",
  "z":"",
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
}

export default function TextScreen() {
  const [text, onChangeText] = React.useState('');
  const brailleResult = "";

  const router = useRouter();

  const onChangeText = () => {
    brailleResult = "";
    for (const char of text){
      brailleResult += textToBraille[char];
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flexDirection: "column", alignItems: "center", top: 50 }} >

        <TouchableOpacity style={styles.navButton} onPress={() => router.back()} >
          <Text style={styles.navButtonText}>⇋</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />

        <View>
          <Text>{brailleResult}</Text>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
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
    }
  });