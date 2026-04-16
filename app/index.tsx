import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

let innerRadi = 95;
let outerRadi = 100;

export default function HomeScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flexDirection: 'column'}}>
        <SafeAreaView style={{flexDirection: 'row'}}>
          <View style={styles.outerCircle} >
            <View style={styles.innerCircle} >
            </View>
          </View>
          <View style={styles.outerCircle} >
            <View style={styles.innerCircle} >
            </View>
          </View>
        </SafeAreaView>
        <SafeAreaView style={{flexDirection: 'row'}}>
          <View style={styles.outerCircle} >
            <View style={styles.innerCircle} >
            </View>
          </View>
          <View style={styles.outerCircle} >
            <View style={styles.innerCircle} >
            </View>
          </View>
        </SafeAreaView>
        <SafeAreaView style={{flexDirection: 'row'}}>
          <View style={styles.outerCircle} >
            <View style={styles.innerCircle} >
            </View>
          </View>
          <View style={styles.outerCircle} >
            <View style={styles.innerCircle} >
            </View>
          </View>
        </SafeAreaView>
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
    backgroundColor: 'white'
  },
  outerCircle: {
    width: outerRadi,
    height: outerRadi,
    borderRadius: outerRadi / 2,
    margin: 10,
    backgroundColor: 'black'
  },
});