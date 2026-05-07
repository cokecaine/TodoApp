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
  dueDate?: string; // Format: "YYYY-MM-DD"
};

export default function TodoScreen() {
  // Data initialized (Task for Affan to connect to database/state)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isDateEnabled, setIsDateEnabled] = useState(false);


  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  // Fungsi Logika dikosongkan (Hanya kerangka)
  // Format date to string (YYYY-MM-DD)
  const formatDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Format date for display
  const formatDateDisplay = (dateString?: string): string => {
    if (!dateString) return "No due date";
    const [year, month, day] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString("default", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Add Task Logic
  const addTask = () => {
    if (inputText.trim() === "") {
      return; // Don't add empty tasks
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: inputText.trim(),
      completed: false,
      dueDate: isDateEnabled ? formatDateString(selectedDate) : undefined,
    };

    setTasks([...tasks, newTask]);
    setInputText("");
    setSelectedDate(new Date()); // Reset to today
    setIsDateEnabled(false); // Reset date enabled toggle
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  // Logic functions left empty (Just framework)
  const addTask = () => {
    // Will be filled by Affan in feature/add-task branch
  };

  const toggleTask = (id: string) => {
    // Will be filled in feature/edit-task branch or similar
  };

  const deleteTask = (id: string) => {
    // Nanti diisi di branch feature/delete-task
  // Delete Task Logic
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
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
      <View style={styles.taskContent}>
        <Text
          style={[
            styles.taskTitle,
            item.completed && styles.taskTitleCompleted,
          ]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text style={styles.taskDate}>{formatDateDisplay(item.dueDate)}</Text>
      </View>
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

                {/* Date Toggle Button */}
                <TouchableOpacity
                  style={[
                    styles.dateToggleBtn,
                    isDateEnabled && styles.dateToggleBtnActive,
                  ]}
                  onPress={() => setIsDateEnabled(!isDateEnabled)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.dateToggleIcon}>📅</Text>
                  <Text
                    style={[
                      styles.dateToggleText,
                      isDateEnabled && styles.dateToggleTextActive,
                    ]}
                  >
                    {isDateEnabled ? "Remove Date" : "Add Date"}
                  </Text>
                </TouchableOpacity>

                {/* Date Picker - Only show if enabled */}
                {isDateEnabled && (
                  <View style={styles.datePickerSection}>
                    <TouchableOpacity
                      style={styles.datePickerBtn}
                      onPress={() =>
                        setSelectedDate(
                          new Date(
                            selectedDate.getFullYear(),
                            selectedDate.getMonth(),
                            selectedDate.getDate() - 1,
                          ),
                        )
                      }
                      activeOpacity={0.7}
                    >
                      <Text style={styles.datePickerArrow}>◀</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.dateDisplay}
                      onPress={() => setShowDatePicker(!showDatePicker)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.dateDisplayText}>
                        📅 {formatDateDisplay(formatDateString(selectedDate))}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.datePickerBtn}
                      onPress={() =>
                        setSelectedDate(
                          new Date(
                            selectedDate.getFullYear(),
                            selectedDate.getMonth(),
                            selectedDate.getDate() + 1,
                          ),
                        )
                      }
                      activeOpacity={0.7}
                    >
                      <Text style={styles.datePickerArrow}>▶</Text>
                    </TouchableOpacity>
                  </View>
                )}
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

        {/* Bottom Navigation - Hanya 3 Menu (Focus Dihapus) */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
            <Text style={styles.navIconActive}>☑</Text>
            <Text style={styles.navLabelActive}>Tasks</Text>
          </TouchableOpacity>
          

          <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
            <Text style={styles.navIcon}>📅</Text>
            <Text style={styles.navLabel}>Calendar</Text>
          </TouchableOpacity>
          

          <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
            <Text style={styles.navIcon}>⚙</Text>
            <Text style={styles.navLabel}>Settings</Text>
          </TouchableOpacity>
        </View>
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

  // Date Toggle Button
  dateToggleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 12,
    gap: 8,
  },
  dateToggleBtnActive: {
    backgroundColor: "#e0f7fa",
    borderColor: "#26C6DA",
  },
  dateToggleIcon: {
    fontSize: 18,
  },
  dateToggleText: {
    color: "#666",
    fontWeight: "600",
    fontSize: 14,
  },
  dateToggleTextActive: {
    color: "#26C6DA",
  },

  // Date Picker Section
  datePickerSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 8,
  },
  datePickerBtn: {
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerArrow: {
    fontSize: 18,
    color: "#26C6DA",
    fontWeight: "600",
  },
  dateDisplay: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dateDisplayText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
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
  taskContent: {
    flex: 1,
  },
  taskDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
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

  // Bottom Nav
  bottomNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  navIcon: {
    fontSize: 22,
    color: "#ccc",
  },
  navIconActive: {
    fontSize: 22,
    color: "#26C6DA",
  },
  navLabel: {
    fontSize: 11,
    color: "#aaa",
    fontWeight: "500",
  },
  navLabelActive: {
    fontSize: 11,
    color: "#26C6DA",
    fontWeight: "700",
  },
  navBadge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "#FF5252",
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  navBadgeText: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "bold",
  },
});
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
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
}
