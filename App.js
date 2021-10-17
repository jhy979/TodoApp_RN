import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { theme } from "./colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@toDos";
export default function App() {
  useEffect(() => {
    loadTodos();
  }, []);

  // useState
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState({});

  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);

  const addTodo = async () => {
    if (text === "") return;
    const newTodos = { ...todos, [Date.now()]: { text, working } };
    setTodos(newTodos);
    await saveTodos(newTodos);
    setText("");
  };
  //AsyncStorage 저장
  const saveTodos = async (toSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (err) {}
  };
  //AsyncStorage 읽기
  const loadTodos = async () => {
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setTodos(JSON.parse(s));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Work 선택 버튼 */}
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.tc }}
          >
            Work
          </Text>
        </TouchableOpacity>
        {/* Travel 선택 버튼 */}
        <TouchableOpacity onPress={travel}>
          <Text
            style={{ ...styles.btnText, color: working ? theme.tc : "white" }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        {/* 할 일 입력하기 */}
        <TextInput
          style={styles.input}
          placeholder={working ? "무엇을 할까요?" : "어디로 떠날까요?"}
          placeholderTextColor={theme.tc}
          onChangeText={onChangeText}
          onSubmitEditing={addTodo}
          returnKeyType="done"
          value={text}
        />
        {/* 스크롤뷰 (할 일 리스트 보이기) */}
        <ScrollView style={{ height: "100%" }}>
          {Object.keys(todos).map((el) => {
            return todos[el].working === working ? (
              <View style={styles.todo} key={el}>
                <Text style={styles.todoText}>{todos[el].text}</Text>
              </View>
            ) : null;
          })}
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "space-between",
  },
  btnText: {
    fontSize: 35,
  },
  input: {
    backgroundColor: theme.toggle,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18,
    color: theme.tc,
    marginBottom: 20,
  },
  todo: {
    backgroundColor: theme.toggle,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  todoText: {
    color: "#fff",
    fontSize: 16,
  },
});
