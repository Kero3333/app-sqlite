import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

import * as SQLite from "expo-sqlite";

export default function App() {
  const db = SQLite.openDatabase("database.db");

  const [input, setInput] = React.useState("");

  const handleAdd = () => {
    console.log(input);
  };

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS person (id INTEGER PRIMARY KEY, name VARCHAR(100) NOT NULL)",
        [],
        (obj, res) => console.log(res),
        (obj, err) => console.error(err)
      );
    });
    db.transaction((tx) =>
      tx.executeSql(
        "SELECT * FROM person",
        [],
        (obj, res) => console.log(res.rows),
        // names != [res.rows._array] ? setNames([res.rows._array]) : "",
        (obj, err) => console.error(err)
      )
    );
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="name..."
          onChangeText={(text) => setInput(text)}
          value={input}
        />
        <Button title="Submit" onPress={handleAdd} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
