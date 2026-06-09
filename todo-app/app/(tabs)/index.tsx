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
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTasks, useTheme, Task } from "../context";

export default function TodoScreen() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const { colors, isDark } = useTheme();

  const [inputText, setInputText] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDateEnabled, setIsDateEnabled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);
  const totalTasks = tasks.length;
  const completedCount = completedTasks.length;
  const progressPercent = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning ☀️";
    if (hour < 18) return "Good afternoon 🌤";
    return "Good evening 🌙";
  };

  const formatDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDateDisplay = (dateString?: string): string => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString("default", {
      month: "short",
      day: "numeric",
    });
  };

  const formatYearDisplay = (dateString?: string): string => {
    if (!dateString) return "";
    return dateString.split("-")[0];
  };

  const isOverdue = (dateString?: string): boolean => {
    if (!dateString) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [year, month, day] = dateString.split("-");
    const taskDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return taskDate < today;
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

  const renderTaskItem = (item: Task) => {
    const overdue = !item.completed && isOverdue(item.dueDate);

    return (
      <View
        style={[
          styles.taskItem,
          { backgroundColor: colors.cardBg, borderColor: colors.border },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.checkbox,
            { borderColor: item.completed ? colors.accent : colors.borderStrong },
            item.completed && { backgroundColor: colors.accent },
          ]}
          onPress={() => toggleTask(item.id)}
          activeOpacity={0.7}
        >
          {item.completed && (
            <MaterialCommunityIcons name="check" size={14} color="#FFF" />
          )}
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
          {item.dueDate && (
            <View style={styles.dateChipWrap}>
              <MaterialCommunityIcons
                name="calendar-blank-outline"
                size={12}
                color={overdue ? colors.danger : colors.textMuted}
                style={{ marginRight: 4 }}
              />
              <Text
                style={[
                  styles.taskDate,
                  { color: overdue ? colors.danger : colors.textMuted },
                  item.completed && { color: colors.textLight },
                ]}
              >
                {formatDateDisplay(item.dueDate)} {formatYearDisplay(item.dueDate)}
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => deleteTask(item.id)}
          activeOpacity={0.6}
        >
          <MaterialCommunityIcons name="trash-can-outline" size={20} color={colors.textLight} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={["top"]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <FlatList
          data={[]}
          renderItem={null}
          keyExtractor={() => "dummy"}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              {/* Header */}
              <View style={styles.header}>
                <View>
                  <Text style={[styles.greetingText, { color: colors.textMuted }]}>
                    {getGreeting()}
                  </Text>
                  <Text style={[styles.headerTitle, { color: colors.text }]}>My Tasks</Text>
                </View>
                <View style={[styles.activeBadge, { backgroundColor: colors.accentLight }]}>
                  <Text style={[styles.activeBadgeText, { color: colors.accent }]}>
                    {activeTasks.length} pending
                  </Text>
                </View>
              </View>

              {/* Progress Card */}
              <View style={[styles.progressCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
                <View style={styles.progressHeader}>
                  <Text style={[styles.progressTitle, { color: colors.text }]}>Daily Progress</Text>
                  <Text style={[styles.progressPercent, { color: colors.accent }]}>
                    {Math.round(progressPercent)}%
                  </Text>
                </View>
                <View style={[styles.progressBarBg, { backgroundColor: colors.progressBg }]}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${progressPercent}%`, backgroundColor: colors.accent },
                    ]}
                  />
                </View>
              </View>

              {/* Input Section */}
              <View style={styles.createSection}>
                <View
                  style={[
                    styles.inputContainer,
                    { backgroundColor: colors.inputBg, borderColor: isFocused ? colors.accent : colors.border },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={20}
                    color={isFocused ? colors.accent : colors.textLight}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="What needs to be done?"
                    placeholderTextColor={colors.textLight}
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={handleAddTask}
                    returnKeyType="done"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                  <TouchableOpacity
                    style={[
                      styles.addBtn,
                      { backgroundColor: inputText.trim() ? colors.accent : colors.borderStrong },
                    ]}
                    onPress={handleAddTask}
                    activeOpacity={0.8}
                    disabled={!inputText.trim()}
                  >
                    <MaterialCommunityIcons name="arrow-up" size={20} color="#FFF" />
                  </TouchableOpacity>
                </View>

                {/* Date Toggle */}
                <TouchableOpacity
                  style={[
                    styles.dateToggleBtn,
                    { borderColor: isDateEnabled ? colors.accent : "transparent" },
                    isDateEnabled && { backgroundColor: colors.accentLight },
                  ]}
                  onPress={() => setIsDateEnabled(!isDateEnabled)}
                  activeOpacity={0.7}
                >
                  <MaterialCommunityIcons
                    name="calendar-month-outline"
                    size={18}
                    color={isDateEnabled ? colors.accent : colors.textMuted}
                  />
                  <Text
                    style={[
                      styles.dateToggleText,
                      { color: isDateEnabled ? colors.accent : colors.textMuted },
                    ]}
                  >
                    {isDateEnabled ? "Due date enabled" : "Add due date"}
                  </Text>
                </TouchableOpacity>

                {isDateEnabled && (
                  <View style={styles.datePickerSection}>
                    <TouchableOpacity
                      style={[styles.datePickerBtn, { backgroundColor: colors.inputBg, borderColor: colors.border }]}
                      onPress={() => {
                        const d = new Date(selectedDate);
                        d.setDate(d.getDate() - 1);
                        setSelectedDate(d);
                      }}
                      activeOpacity={0.7}
                    >
                      <MaterialCommunityIcons name="chevron-left" size={24} color={colors.textSecondary} />
                    </TouchableOpacity>
                    <View style={[styles.dateDisplay, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
                      <Text style={[styles.dateDisplayText, { color: colors.text }]}>
                        {formatDateDisplay(formatDateString(selectedDate))}
                      </Text>
                      <Text style={[styles.dateDisplayYear, { color: colors.textMuted }]}>
                        {formatYearDisplay(formatDateString(selectedDate))}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={[styles.datePickerBtn, { backgroundColor: colors.inputBg, borderColor: colors.border }]}
                      onPress={() => {
                        const d = new Date(selectedDate);
                        d.setDate(d.getDate() + 1);
                        setSelectedDate(d);
                      }}
                      activeOpacity={0.7}
                    >
                      <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* Active Tasks */}
              <View style={styles.listSection}>
                {activeTasks.length === 0 ? (
                  <View style={styles.emptyStateContainer}>
                    <View style={[styles.emptyStateIconWrap, { backgroundColor: colors.surfaceAlt }]}>
                      <MaterialCommunityIcons name="check-all" size={48} color={colors.accentLight} />
                    </View>
                    <Text style={[styles.emptyStateTitle, { color: colors.text }]}>All caught up!</Text>
                    <Text style={[styles.emptyStateSub, { color: colors.textMuted }]}>
                      You have no pending tasks right now.
                    </Text>
                  </View>
                ) : (
                  activeTasks.map((item) => <View key={item.id}>{renderTaskItem(item)}</View>)
                )}
              </View>

              {/* Completed Tasks */}
              {completedTasks.length > 0 && (
                <View style={styles.listSection}>
                  <View style={styles.listHeader}>
                    <Text style={[styles.listLabel, { color: colors.textMuted }]}>COMPLETED</Text>
                  </View>
                  {completedTasks.map((item) => (
                    <View key={item.id}>{renderTaskItem(item)}</View>
                  ))}
                </View>
              )}

              <View style={{ height: 100 }} />
            </>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  greetingText: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  activeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeBadgeText: {
    fontSize: 13,
    fontWeight: "700",
  },
  progressCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: "800",
  },
  progressBarBg: {
    height: 8,
    borderRadius: 4,
    width: "100%",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  createSection: {
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    paddingVertical: 10,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  dateToggleBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 12,
    gap: 6,
  },
  dateToggleText: {
    fontWeight: "600",
    fontSize: 13,
  },
  datePickerSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 12,
  },
  datePickerBtn: {
    borderWidth: 1,
    borderRadius: 12,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  dateDisplay: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  dateDisplayText: {
    fontSize: 15,
    fontWeight: "700",
  },
  dateDisplayYear: {
    fontSize: 15,
    fontWeight: "500",
  },
  listSection: {
    marginBottom: 24,
  },
  listHeader: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  listLabel: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  taskContent: { flex: 1 },
  taskTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
  },
  dateChipWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  taskDate: {
    fontSize: 12,
    fontWeight: "500",
  },
  deleteBtn: {
    padding: 8,
    marginLeft: 8,
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyStateIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  emptyStateSub: {
    fontSize: 14,
    fontWeight: "500",
  },
});