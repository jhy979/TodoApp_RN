import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from './colors';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.btnText}>Work</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.btnText}>Travel</Text>
        </TouchableOpacity>

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal:20,
  },
  header:{
    flexDirection:"row",
    marginTop:100,
    justifyContent:"space-between",
  },
  btnText:{
    fontSize:35,
    color:theme.tc,
  }
});
