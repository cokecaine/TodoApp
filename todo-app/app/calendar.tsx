import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTasks, useTheme, Task } from "./_layout";

const SCREEN_WIDTH = Dimensions.get("window").width;
const HORIZONTAL_PADDING = 16;
const GRID_WIDTH = SCREEN_WIDTH - HORIZONTAL_PADDING * 2;
const CELL_SIZE = Math.floor(GRID_WIDTH / 7) - 4;

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { tasks, toggleTask } = useTasks();
  const { colors } = useTheme();

  const getDaysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const formatDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getTasksForDate = (date: Date) =>
    tasks.filter((task) => task.dueDate === formatDateString(date));

  const hasTasksOnDate = (date: Date) => getTasksForDate(date).length > 0;

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) =>
    date.getDate() === selectedDate.getDate() &&
    date.getMonth() === selectedDate.getMonth() &&
    date.getFullYear() === selectedDate.getFullYear();

  const goToPreviousMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );

  const goToNextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const generateCalendarRows = (): (Date | null)[][] => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const flat: (Date | null)[] = [];
    for (let i = 0; i < firstDay; i++) flat.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      flat.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), d));
    }
    while (flat.length % 7 !== 0) flat.push(null);
    const rows: (Date | null)[][] = [];
    for (let i = 0; i < flat.length; i += 7) {
      rows.push(flat.slice(i, i + 7));
    }
    return rows;
  };

  const calendarRows = generateCalendarRows();
  const tasksForSelectedDate = getTasksForDate(selectedDate);

  const renderDayCell = (day: Date | null, colIndex: number) => {
    if (!day) {
      return (
        <View
          key={`empty-${colIndex}`}
          style={[styles.cell, { width: CELL_SIZE, height: CELL_SIZE }]}
        />
      );
    }

    const hasTask = hasTasksOnDate(day);
    const isTodayDate = isToday(day);
    const isSelectedDate = isSelected(day);

    let cellBg = colors.background;
    let cellBorder = colors.borderStrong;
    let cellBorderWidth = 1;
    let textColor = colors.text;

    if (isTodayDate && !isSelectedDate) {
      cellBg = colors.accentLight;
      cellBorder = colors.accent;
      cellBorderWidth = 2;
      textColor = colors.accent;
    }
    if (isSelectedDate) {
      cellBg = colors.accent;
      cellBorder = colors.accent;
      cellBorderWidth = 2;
      textColor = "#fff";
    }

    return (
      <TouchableOpacity
        key={`${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`}
        style={[
          styles.cell,
          {
            width: CELL_SIZE,
            height: CELL_SIZE,
            backgroundColor: cellBg,
            borderColor: cellBorder,
            borderWidth: cellBorderWidth,
          },
        ]}
        onPress={() => setSelectedDate(day)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.dayText,
            {
              color: textColor,
              fontWeight: isTodayDate || isSelectedDate ? "700" : "500",
            },
          ]}
        >
          {day.getDate()}
        </Text>
        {hasTask && (
          <View
            style={[
              styles.taskDot,
              { backgroundColor: isSelectedDate ? "#fff" : colors.danger },
            ]}
          />
        )}
      </TouchableOpacity>
    );
  };

  // FIX: Tidak pakai FlatList, langsung .map() dengan key prop yang benar
  const renderTaskItem = (item: Task) => (
    <View
      style={[
        styles.taskItem,
        { backgroundColor: colors.surface, borderLeftColor: colors.accent },
      ]}
    >
      <TouchableOpacity
        onPress={() => toggleTask(item.id)}
        style={[
          styles.checkbox,
          { borderColor: colors.accent },
          item.completed && { backgroundColor: colors.accent },
        ]}
      >
        {item.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
      <Text
        style={[
          styles.taskTitle,
          { color: colors.text },
          item.completed && {
            color: colors.textMuted,
            textDecorationLine: "line-through",
          },
        ]}
        numberOfLines={2}
      >
        {item.title}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={
          colors.background === "#ffffff" ? "dark-content" : "light-content"
        }
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Calendar
          </Text>
        </View>

        {/* Month Navigation */}
        <View
          style={[
            styles.monthNavigation,
            { backgroundColor: colors.surface },
          ]}
        >
          <TouchableOpacity
            onPress={goToPreviousMonth}
            style={styles.monthButton}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={28}
              color={colors.accent}
            />
          </TouchableOpacity>
          <View style={styles.monthCenter}>
            <Text style={[styles.monthText, { color: colors.text }]}>
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </Text>
            <TouchableOpacity
              onPress={goToToday}
              style={[styles.todayButton, { backgroundColor: colors.accent }]}
              activeOpacity={0.7}
            >
              <Text style={styles.todayButtonText}>Today</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={goToNextMonth}
            style={styles.monthButton}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="chevron-right"
              size={28}
              color={colors.accent}
            />
          </TouchableOpacity>
        </View>

        {/* Weekday Labels */}
        <View style={styles.weekdayRow}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <View key={day} style={[styles.weekdayCell, { width: CELL_SIZE + 4 }]}>
              <Text style={[styles.weekdayText, { color: colors.textMuted }]}>
                {day}
              </Text>
            </View>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={[styles.calendarGrid, { backgroundColor: colors.surface }]}>
          {calendarRows.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.calendarRow}>
              {row.map((day, colIndex) => renderDayCell(day, colIndex))}
            </View>
          ))}
        </View>

        {/* Selected Date Info */}
        <View
          style={[
            styles.selectedDateSection,
            { borderBottomColor: colors.borderStrong },
          ]}
        >
          <Text style={[styles.selectedDateTitle, { color: colors.text }]}>
            {selectedDate.toLocaleString("default", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </Text>
          <Text style={[styles.taskCountText, { color: colors.textMuted }]}>
            {tasksForSelectedDate.length}{" "}
            {tasksForSelectedDate.length === 1 ? "Task" : "Tasks"}
          </Text>
        </View>

        {/* Task List untuk tanggal yang dipilih */}
        <View style={styles.tasksSection}>
          {tasksForSelectedDate.length === 0 ? (
            <Text style={[styles.noTasksText, { color: colors.textMuted }]}>
              No tasks for this date
            </Text>
          ) : (
            // FIX: key prop ada di sini
            tasksForSelectedDate.map((item) => (
              <View key={item.id}>{renderTaskItem(item)}</View>
            ))
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, paddingHorizontal: HORIZONTAL_PADDING },
  header: { paddingVertical: 20 },
  headerTitle: { fontSize: 28, fontWeight: "bold" },
  monthNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  monthButton: { padding: 8 },
  monthCenter: { alignItems: "center", flex: 1, gap: 8 },
  monthText: { fontSize: 18, fontWeight: "600" },
  todayButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 3,
  },
  todayButtonText: { color: "#fff", fontWeight: "700", fontSize: 12 },
  weekdayRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 4,
    paddingHorizontal: 2,
  },
  weekdayCell: { alignItems: "center", paddingVertical: 6 },
  weekdayText: { fontSize: 12, fontWeight: "600" },
  calendarGrid: {
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 2,
    marginBottom: 20,
  },
  calendarRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 2,
  },
  cell: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  dayText: { fontSize: 13 },
  taskDot: {
    position: "absolute",
    bottom: 3,
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  selectedDateSection: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  selectedDateTitle: { fontSize: 18, fontWeight: "600", marginBottom: 4 },
  taskCountText: { fontSize: 14 },
  tasksSection: { marginTop: 8 },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkmark: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  taskTitle: { flex: 1, fontSize: 14, fontWeight: "500" },
  noTasksText: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 20,
  },
});