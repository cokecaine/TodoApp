import React, { createContext, useContext, useState } from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// ─── TYPES ────────────────────────────────────────────────────────
export type Task = {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string; // "YYYY-MM-DD"
};

// ─── TASKS CONTEXT ────────────────────────────────────────────────
type TasksContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearAllTasks: () => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function useTasks(): TasksContextType {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used inside RootLayout");
  return ctx;
}

// ─── THEME CONTEXT ────────────────────────────────────────────────
type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof lightColors;
};

const lightColors = {
  background: "#ffffff",
  surface: "#f9f9f9",
  surfaceAlt: "#f7f7f7",
  border: "#f0f0f0",
  borderStrong: "#e0e0e0",
  text: "#333333",
  textMuted: "#999999",
  textLight: "#aaaaaa",
  accent: "#26C6DA",
  accentLight: "#e0f7fa",
  danger: "#FF6B6B",
  dangerBg: "#fff5f5",
  dangerBorder: "#ffe0e0",
  tabBar: "#ffffff",
  inputBg: "#f7f7f7",
  cardBg: "#fafafa",
};

const darkColors: typeof lightColors = {
  background: "#121212",
  surface: "#1e1e1e",
  surfaceAlt: "#252525",
  border: "#2a2a2a",
  borderStrong: "#333333",
  text: "#f0f0f0",
  textMuted: "#888888",
  textLight: "#666666",
  accent: "#26C6DA",
  accentLight: "#003d45",
  danger: "#FF6B6B",
  dangerBg: "#2a1515",
  dangerBorder: "#4a2020",
  tabBar: "#1a1a1a",
  inputBg: "#252525",
  cardBg: "#1e1e1e",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside RootLayout");
  return ctx;
}

// ─── ROOT LAYOUT ──────────────────────────────────────────────────
export default function RootLayout() {
  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
  const toggleTask = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  const deleteTask = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));
  const clearAllTasks = () => setTasks([]);

  // Theme state
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);
  const colors = isDark ? darkColors : lightColors;

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, toggleTask, deleteTask, clearAllTasks }}
    >
      <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
        <StatusBar style={isDark ? "light" : "dark"} />
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: true,
            tabBarActiveTintColor: "#26C6DA",
            tabBarInactiveTintColor: isDark ? "#555" : "#ccc",
            tabBarStyle: {
              backgroundColor: colors.tabBar,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              paddingBottom: 8,
              paddingTop: 8,
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: "600",
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Todo",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="check-all"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="calendar"
            options={{
              title: "Calendar",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="calendar-month"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "Settings",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="cog"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </ThemeContext.Provider>
    </TasksContext.Provider>
  );
}