import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTasks, useTheme, Task } from "../context";

const SCREEN_WIDTH = Dimensions.get("window").width;
const HORIZONTAL_PADDING = 20;

export default function CalendarScreen() {
  const { tasks, toggleTask, deleteTask } = useTasks();
  const { colors, isDark } = useTheme();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const isSameDay = (d1: Date, d2: Date) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const isToday = (date: Date) => isSameDay(date, new Date());

  const getTasksForDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;
    return tasks.filter((t) => t.dueDate === dateStr);
  };

  const getTaskDotStatus = (date: Date) => {
    const dayTasks = getTasksForDate(date);
    if (dayTasks.length === 0) return null;
    const allCompleted = dayTasks.every((t) => t.completed);
    return allCompleted ? "success" : "pending";
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleGoToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const selectedTasks = selectedDate ? getTasksForDate(selectedDate) : [];
  const selectedCompletedCount = selectedTasks.filter(t => t.completed).length;
  const selectedProgress = selectedTasks.length > 0 
    ? (selectedCompletedCount / selectedTasks.length) * 100 
    : 0;

  const renderTaskItem = (item: Task) => (
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
        >
          {item.title}
        </Text>
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

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={["top"]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Calendar</Text>
        <TouchableOpacity
          style={[styles.todayChip, { backgroundColor: colors.accentLight }]}
          onPress={handleGoToToday}
        >
          <Text style={[styles.todayChipText, { color: colors.accent }]}>Today</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={selectedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderTaskItem(item)}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Month Card */}
            <View style={[styles.monthCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
              <View style={styles.monthHeader}>
                <Text style={[styles.monthText, { color: colors.text }]}>
                  {currentDate.toLocaleDateString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
                <View style={styles.monthNav}>
                  <TouchableOpacity
                    style={[styles.navBtn, { backgroundColor: colors.inputBg, borderColor: colors.border }]}
                    onPress={handlePrevMonth}
                  >
                    <MaterialCommunityIcons name="chevron-left" size={24} color={colors.textSecondary} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.navBtn, { backgroundColor: colors.inputBg, borderColor: colors.border }]}
                    onPress={handleNextMonth}
                  >
                    <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textSecondary} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.weekDaysRow}>
                {weekDays.map((day, index) => (
                  <Text key={index} style={[styles.weekDayText, { color: colors.textMuted }]}>
                    {day}
                  </Text>
                ))}
              </View>

              <View style={styles.daysGrid}>
                {calendarDays.map((date, index) => {
                  if (!date) return <View key={`empty-${index}`} style={styles.dayCell} />;

                  const isSelected = isSameDay(date, selectedDate);
                  const isCurrentToday = isToday(date);
                  const dotStatus = getTaskDotStatus(date);

                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.dayCell,
                        isSelected && { backgroundColor: colors.accent, borderColor: colors.accent },
                        !isSelected && isCurrentToday && { borderColor: colors.accent },
                      ]}
                      onPress={() => setSelectedDate(date)}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          { color: colors.text },
                          isSelected && { color: "#FFF", fontWeight: "700" },
                          !isSelected && isCurrentToday && { color: colors.accent, fontWeight: "700" },
                        ]}
                      >
                        {date.getDate()}
                      </Text>
                      
                      {dotStatus && (
                        <View
                          style={[
                            styles.taskDot,
                            { backgroundColor: dotStatus === "success" ? colors.success : colors.danger },
                            isSelected && dotStatus === "success" && { backgroundColor: "#FFF" },
                          ]}
                        />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Selected Date Header Card */}
            <View style={[styles.selectedDateCard, { backgroundColor: colors.surfaceAlt }]}>
              <View>
                <Text style={[styles.selectedDateTitle, { color: colors.text }]}>
                  {selectedDate.toLocaleDateString("default", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
                <Text style={[styles.selectedDateSub, { color: colors.textMuted }]}>
                  {selectedTasks.length === 0
                    ? "No tasks for this day"
                    : `${selectedCompletedCount} of ${selectedTasks.length} completed`}
                </Text>
              </View>
              
              {selectedTasks.length > 0 && (
                <View style={styles.miniProgressWrap}>
                  <View style={[styles.miniProgressBg, { backgroundColor: colors.borderStrong }]}>
                    <View 
                      style={[
                        styles.miniProgressFill, 
                        { width: `${selectedProgress}%`, backgroundColor: colors.accent }
                      ]} 
                    />
                  </View>
                </View>
              )}
            </View>
            
            {/* Empty state within the list body */}
            {selectedTasks.length === 0 && (
              <View style={styles.emptyStateContainer}>
                <MaterialCommunityIcons name="calendar-check-outline" size={48} color={colors.borderStrong} />
                <Text style={[styles.emptyStateText, { color: colors.textLight }]}>
                  Your schedule is clear.
                </Text>
              </View>
            )}
          </>
        }
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingVertical: 14,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  todayChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  todayChipText: {
    fontSize: 14,
    fontWeight: "700",
  },
  scrollContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  monthCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    marginBottom: 24,
  },
  monthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  monthText: {
    fontSize: 20,
    fontWeight: "700",
  },
  monthNav: {
    flexDirection: "row",
    gap: 8,
  },
  navBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  weekDaysRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  weekDayText: {
    fontSize: 13,
    fontWeight: "600",
    width: 32,
    textAlign: "center",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  dayCell: {
    width: (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - 32) / 7,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "transparent",
  },
  dayText: {
    fontSize: 15,
    fontWeight: "500",
  },
  taskDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    position: "absolute",
    bottom: 6,
  },
  selectedDateCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  selectedDateTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  selectedDateSub: {
    fontSize: 13,
    fontWeight: "500",
  },
  miniProgressWrap: {
    width: 60,
    justifyContent: "center",
  },
  miniProgressBg: {
    height: 6,
    borderRadius: 3,
    width: "100%",
  },
  miniProgressFill: {
    height: "100%",
    borderRadius: 3,
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
    fontWeight: "500",
  },
  deleteBtn: {
    padding: 8,
  },
  emptyStateContainer: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 20,
  },
  emptyStateText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "500",
  },
});