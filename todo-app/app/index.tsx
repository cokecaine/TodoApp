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
import { useTasks, useTheme, Task } from "./_layout";

export default function TodoScreen() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const { colors } = useTheme();

  const [inputText, setInputText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDateEnabled, setIsDateEnabled] = useState(false);

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  const formatDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

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

  const handleAddTask = () => {
    if (inputText.trim() === "") return;
    addTask({
      id: Date.now().toString(),
      title: inputText.trim(),
      completed: false,
      dueDate: isDateEnabled ? formatDateString(selectedDate) : undefined,
    });
    setInputText("");
    setSelectedDate(new Date());
    setIsDateEnabled(false);
  };

  // FIX: renderTask sekarang menjadi komponen biasa yang menerima item langsung
  // key prop dipindahkan ke pemanggil (.map), BUKAN di dalam fungsi ini
  const renderTaskItem = (item: Task) => (
    <View style={[styles.taskItem, { backgroundColor: colors.cardBg }]}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          { borderColor: colors.borderStrong },
          item.completed && { backgroundColor: colors.accent, borderColor: colors.accent },
        ]}
        onPress={() => toggleTask(item.id)}
        activeOpacity={0.7}
      >
        {item.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      <View style={styles.taskContent}>
        <Text
          style={[
            styles.taskTitle,
            { color: colors.text },
            item.completed && { textDecorationLine: "line-through", color: colors.textLight },
          ]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text style={[styles.taskDate, { color: colors.textMuted }]}>
          {formatDateDisplay(item.dueDate)}
        </Text>
      </View>
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
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={colors.background === "#ffffff" ? "dark-content" : "light-content"}
      />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Header */}
        <View
          style={[
            styles.header,
            { backgroundColor: colors.background, borderBottomColor: colors.border },
          ]}
        >
          <View style={styles.headerLeft}>
            <View style={[styles.logoIcon, { backgroundColor: colors.accent }]}>
              <Text style={styles.logoCheck}>✓</Text>
            </View>
            <Text style={[styles.headerTitle, { color: colors.accent }]}>Todo</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={[styles.taskBadge, { backgroundColor: colors.surface }]}>
              <Text style={[styles.taskBadgeText, { color: colors.textMuted }]}>
                {activeTasks.length} Tasks
              </Text>
            </View>
          </View>
        </View>

        <FlatList
          data={[]}
          renderItem={null}
          keyExtractor={() => "dummy"}
          ListHeaderComponent={
            <>
              {/* Input Section */}
              <View style={styles.createSection}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  Create Task
                </Text>
                <View style={[styles.inputRow, { backgroundColor: colors.inputBg }]}>
                  <Text style={[styles.plusIcon, { color: colors.accent }]}>＋</Text>
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="What needs to be done?"
                    placeholderTextColor={colors.textLight}
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={handleAddTask}
                    returnKeyType="done"
                  />
                  <TouchableOpacity
                    style={[styles.addBtn, { backgroundColor: colors.accent }]}
                    onPress={handleAddTask}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.addBtnText}>Add</Text>
                  </TouchableOpacity>
                </View>

                {/* Date Toggle */}
                <TouchableOpacity
                  style={[
                    styles.dateToggleBtn,
                    {
                      backgroundColor: colors.background,
                      borderColor: isDateEnabled ? colors.accent : colors.borderStrong,
                    },
                    isDateEnabled && { backgroundColor: colors.accentLight },
                  ]}
                  onPress={() => setIsDateEnabled(!isDateEnabled)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.dateToggleIcon}>📅</Text>
                  <Text
                    style={[
                      styles.dateToggleText,
                      { color: isDateEnabled ? colors.accent : colors.textMuted },
                    ]}
                  >
                    {isDateEnabled ? "Remove Date" : "Add Date"}
                  </Text>
                </TouchableOpacity>

                {isDateEnabled && (
                  <View style={styles.datePickerSection}>
                    <TouchableOpacity
                      style={[styles.datePickerBtn, { backgroundColor: colors.inputBg }]}
                      onPress={() => {
                        const d = new Date(selectedDate);
                        d.setDate(d.getDate() - 1);
                        setSelectedDate(d);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.datePickerArrow, { color: colors.accent }]}>◀</Text>
                    </TouchableOpacity>
                    <View style={[styles.dateDisplay, { backgroundColor: colors.inputBg }]}>
                      <Text style={[styles.dateDisplayText, { color: colors.text }]}>
                        📅 {formatDateDisplay(formatDateString(selectedDate))}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.datePickerBtn, { backgroundColor: colors.inputBg }]}
                      onPress={() => {
                        const d = new Date(selectedDate);
                        d.setDate(d.getDate() + 1);
                        setSelectedDate(d);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.datePickerArrow, { color: colors.accent }]}>▶</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* Active Tasks */}
              <View style={styles.listSection}>
                <View style={styles.listHeader}>
                  <Text style={[styles.listLabel, { color: colors.textLight }]}>
                    ACTIVE TASKS
                  </Text>
                </View>
                {activeTasks.length === 0 && (
                  <Text style={[styles.emptyText, { color: colors.textLight }]}>
                    No active tasks yet
                  </Text>
                )}
                {/* FIX: key prop ada di sini, bukan di dalam renderTaskItem */}
                {activeTasks.map((item) => (
                  <View key={item.id}>{renderTaskItem(item)}</View>
                ))}
              </View>

              {/* Completed Tasks */}
              <View style={styles.listSection}>
                <View style={styles.listHeader}>
                  <Text style={[styles.listLabel, { color: colors.textLight }]}>
                    COMPLETED
                  </Text>
                  <View style={[styles.completedBadge, { backgroundColor: colors.surface }]}>
                    <Text style={[styles.completedBadgeText, { color: colors.textMuted }]}>
                      {completedTasks.length}
                    </Text>
                  </View>
                </View>
                {completedTasks.length === 0 && (
                  <Text style={[styles.emptyText, { color: colors.textLight }]}>
                    No completed tasks yet
                  </Text>
                )}
                {/* FIX: key prop ada di sini */}
                {completedTasks.map((item) => (
                  <View key={item.id}>{renderTaskItem(item)}</View>
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
  safe: { flex: 1 },
  flex: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  logoCheck: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  headerTitle: { fontSize: 20, fontWeight: "700", letterSpacing: 0.5 },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 12 },
  taskBadge: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  taskBadgeText: { fontSize: 12, fontWeight: "500" },
  createSection: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 8 },
  sectionTitle: { fontSize: 22, fontWeight: "800", marginBottom: 16 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 4,
    gap: 8,
  },
  plusIcon: { fontSize: 18 },
  input: { flex: 1, fontSize: 15, paddingVertical: 12 },
  addBtn: { borderRadius: 10, paddingHorizontal: 18, paddingVertical: 10 },
  addBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
  dateToggleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 12,
    gap: 8,
  },
  dateToggleIcon: { fontSize: 18 },
  dateToggleText: { fontWeight: "600", fontSize: 14 },
  datePickerSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    gap: 8,
  },
  datePickerBtn: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  datePickerArrow: { fontSize: 18, fontWeight: "600" },
  dateDisplay: {
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dateDisplayText: { fontSize: 14, fontWeight: "600" },
  listSection: { paddingHorizontal: 20, paddingTop: 24 },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  listLabel: { fontSize: 12, fontWeight: "700", letterSpacing: 1.2 },
  completedBadge: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  completedBadgeText: { fontSize: 12, fontWeight: "600" },
  emptyText: { fontSize: 14, textAlign: "center", paddingVertical: 16 },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
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
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  checkmark: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  taskContent: { flex: 1 },
  taskTitle: { fontSize: 14, lineHeight: 20, fontWeight: "500" },
  taskDate: { fontSize: 12, marginTop: 4 },
  deleteBtn: { padding: 4, flexShrink: 0 },
  deleteIcon: { fontSize: 16 },
});