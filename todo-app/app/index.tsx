import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Type is preserved to keep data structure clear
type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TodoScreen() {
  // Data initialized (Task for Affan to connect to database/state)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState("");

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  // Logic functions left empty (Just framework)
  const addTask = () => {
    // Will be filled by Affan in feature/add-task branch
  };

  const toggleTask = (id: string) => {
    // Will be filled in feature/edit-task branch or similar
  };

  const deleteTask = (id: string) => {
    // Nanti diisi di branch feature/delete-task
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity
        style={[styles.checkbox, item.completed && styles.checkboxChecked]}
        onPress={() => toggleTask(item.id)}
        activeOpacity={0.7}
      >
        {item.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      <Text
        style={[styles.taskTitle, item.completed && styles.taskTitleCompleted]}
        numberOfLines={2}
      >
        {item.title}
      </Text>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => deleteTask(item.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteIcon}>🗑</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoCheck}>✓</Text>
            </View>
            <Text style={styles.headerTitle}>Todo</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.taskBadge}>
              <Text style={styles.taskBadgeText}>
                {activeTasks.length} Tasks
              </Text>
            </View>
            <Text style={styles.moreIcon}>•••</Text>
          </View>
        </View>

        <FlatList
          data={[]}
          renderItem={null}
          keyExtractor={() => "dummy"}
          ListHeaderComponent={
            <>
              {/* Create Task Section */}
              <View style={styles.createSection}>
                <Text style={styles.sectionTitle}>Create Task</Text>
                <View style={styles.inputRow}>
                  <Text style={styles.plusIcon}>＋</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="What needs to be done?"
                    placeholderTextColor="#aaa"
                    value={inputText}
                    onChangeText={setInputText}
                  />
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={addTask}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.addBtnText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Active Tasks Section */}
              <View style={styles.listSection}>
                <View style={styles.listHeader}>
                  <Text style={styles.listLabel}>ACTIVE TASKS</Text>
                  <Text style={styles.gridIcon}>⊞</Text>
                </View>
                {activeTasks.length === 0 && (
                  <Text style={styles.emptyText}>No active tasks yet</Text>
                )}
                {activeTasks.map((item) => (
                  <View key={item.id}>{renderTask({ item })}</View>
                ))}
              </View>

              {/* Completed Tasks Section */}
              <View style={styles.listSection}>
                <View style={styles.listHeader}>
                  <Text style={styles.listLabel}>COMPLETED</Text>
                  <View style={styles.completedBadge}>
                    <Text style={styles.completedBadgeText}>
                      {completedTasks.length}
                    </Text>
                  </View>
                </View>
                {completedTasks.length === 0 && (
                  <Text style={styles.emptyText}>No completed tasks yet</Text>
                )}
                {completedTasks.map((item) => (
                  <View key={item.id}>{renderTask({ item })}</View>
                ))}
              </View>
              <View style={{ height: 100 }} />
            </>
          }
          showsVerticalScrollIndicator={false}
          style={styles.flex}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flex: {
    flex: 1,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#26C6DA",
    alignItems: "center",
    justifyContent: "center",
  },
  logoCheck: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#26C6DA",
    letterSpacing: 0.5,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  taskBadge: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  taskBadgeText: {
    fontSize: 12,
    color: "#555",
    fontWeight: "500",
  },
  moreIcon: {
    fontSize: 16,
    color: "#aaa",
    letterSpacing: 2,
  },

  // Create Section
  createSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 4,
    gap: 8,
  },
  plusIcon: {
    fontSize: 18,
    color: "#26C6DA",
    fontWeight: "300",
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    paddingVertical: 12,
  },
  addBtn: {
    backgroundColor: "#26C6DA",
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  // List Section
  listSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  listLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#aaa",
    letterSpacing: 1.2,
  },
  gridIcon: {
    fontSize: 18,
    color: "#ccc",
  },
  completedBadge: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  completedBadgeText: {
    fontSize: 12,
    color: "#888",
    fontWeight: "600",
  },
  emptyText: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
    paddingVertical: 16,
  },

  // Task Item
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: "#26C6DA",
    borderColor: "#26C6DA",
  },
  checkmark: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  taskTitle: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    fontWeight: "500",
  },
  taskTitleCompleted: {
    textDecorationLine: "line-through",
    color: "#bbb",
  },
  deleteBtn: {
    padding: 4,
    flexShrink: 0,
  },
  deleteIcon: {
    fontSize: 16,
    color: "#ccc",
  },
});
