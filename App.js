import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { theme } from "./colors";

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);
  const onChangeText = (payload) => setText(payload);
  const addTodo = () => {
    if (text === "") return;
    // 할 일 저장
    const newTodos = { ...todos, [Date.now()]: { text, working } };
    setTodos(newTodos);
    setText("");
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
    color: theme.tc,
    fontSize: 16,
  },
});
