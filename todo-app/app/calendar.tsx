import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string; // Format: "YYYY-MM-DD"
};

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);

  // Get all days in current month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Get tasks for a specific date
  const getTasksForDate = (date: Date): Task[] => {
    const dateString = formatDateString(date);
    return tasks.filter((task) => task.dueDate === dateString);
  };

  // Format date to string (YYYY-MM-DD)
  const formatDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Check if date has tasks
  const hasTasksOnDate = (date: Date): boolean => {
    return getTasksForDate(date).length > 0;
  };

  // Check if date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if date is selected
  const isSelected = (date: Date): boolean => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  // Navigate to today
  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    setSelectedDate(today);
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
      );
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const tasksForSelectedDate = getTasksForDate(selectedDate);

  const renderCalendarDay = (day: Date | null, index: number) => {
    if (!day) {
      return <View key={`empty-${index}`} style={styles.emptyDay} />;
    }

    const hasTask = hasTasksOnDate(day);
    const isTodayDate = isToday(day);
    const isSelectedDate = isSelected(day);

    return (
      <TouchableOpacity
        key={day.getDate()}
        style={[
          styles.dayButton,
          isTodayDate && styles.todayDateButton,
          isSelectedDate && styles.selectedButton,
        ]}
        onPress={() => setSelectedDate(day)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.dayText,
            isTodayDate && styles.todayText,
            isSelectedDate && styles.selectedText,
          ]}
        >
          {day.getDate()}
        </Text>
        {hasTask && (
          <View
            style={[
              styles.taskIndicator,
              isSelectedDate && styles.selectedTaskIndicator,
            ]}
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <View style={[styles.checkbox, item.completed && styles.checkboxChecked]}>
        {item.completed && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text
        style={[styles.taskTitle, item.completed && styles.taskTitleCompleted]}
        numberOfLines={2}
      >
        {item.title}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Calendar</Text>
        </View>

        {/* Month Navigation */}
        <View style={styles.monthNavigation}>
          <TouchableOpacity
            onPress={goToPreviousMonth}
            style={styles.monthButton}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={28}
              color="#26C6DA"
            />
          </TouchableOpacity>

          <View style={styles.monthCenter}>
            <Text style={styles.monthText}>
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </Text>
            <TouchableOpacity
              onPress={goToToday}
              style={styles.todayButton}
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
              color="#26C6DA"
            />
          </TouchableOpacity>
        </View>

        {/* Weekday Headers */}
        <View style={styles.weekdayRow}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <View key={day} style={styles.weekdayCell}>
              <Text style={styles.weekdayText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          {calendarDays.map((day, index) => renderCalendarDay(day, index))}
        </View>

        {/* Selected Date Info */}
        <View style={styles.selectedDateSection}>
          <Text style={styles.selectedDateTitle}>
            {selectedDate.toLocaleString("default", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </Text>
          <Text style={styles.taskCountText}>
            {tasksForSelectedDate.length}{" "}
            {tasksForSelectedDate.length === 1 ? "Task" : "Tasks"}
          </Text>
        </View>

        {/* Tasks for Selected Date */}
        <View style={styles.tasksSection}>
          {tasksForSelectedDate.length === 0 ? (
            <Text style={styles.noTasksText}>No tasks for this date</Text>
          ) : (
            <FlatList
              scrollEnabled={false}
              data={tasksForSelectedDate}
              renderItem={renderTask}
              keyExtractor={(item) => item.id}
              style={styles.tasksList}
            />
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  monthNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  monthButton: {
    padding: 8,
  },
  monthCenter: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 8,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  todayButton: {
    backgroundColor: "#26C6DA",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: "#26C6DA",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  todayButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.3,
  },
  weekdayRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  weekdayCell: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  weekdayText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
    padding: 4,
  },
  dayButton: {
    width: "14.28%", // 100 / 7 days
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    position: "relative",
  },
  emptyDay: {
    width: "14.28%",
    aspectRatio: 1,
    margin: 2,
  },
  dayText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  todayDateButton: {
    backgroundColor: "#e0f7fa",
    borderColor: "#26C6DA",
    borderRadius: 8,
    borderWidth: 2,
  },
  todayText: {
    color: "#26C6DA",
    fontWeight: "700",
  },
  selectedButton: {
    backgroundColor: "#26C6DA",
    borderColor: "#26C6DA",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "700",
  },
  taskIndicator: {
    position: "absolute",
    bottom: 4,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#FF6B6B",
  },
  selectedTaskIndicator: {
    backgroundColor: "#fff",
  },
  selectedDateSection: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  selectedDateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  taskCountText: {
    fontSize: 14,
    color: "#999",
  },
  tasksSection: {
    marginTop: 16,
  },
  tasksList: {
    marginTop: 8,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#26C6DA",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#26C6DA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: "#26C6DA",
  },
  checkmark: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  taskTitle: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  taskTitleCompleted: {
    color: "#999",
    textDecorationLine: "line-through",
  },
  noTasksText: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 20,
  },
});
