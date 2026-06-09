import React, { createContext, useContext, useState, useEffect } from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
  colors: typeof lightColors;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside RootLayout");
  return ctx;
}

// ─── ROOT LAYOUT ──────────────────────────────────────────────────
export default function RootLayout() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // LOAD data saat app dibuka
  useEffect(() => {
    const loadData = async () => {
      try {
        const [savedTasks, savedTheme] = await Promise.all([
          AsyncStorage.getItem("@yolanda_tasks"),
          AsyncStorage.getItem("@yolanda_theme"),
        ]);
        if (savedTasks !== null) setTasks(JSON.parse(savedTasks));
        if (savedTheme !== null) setIsDark(JSON.parse(savedTheme));
      } catch (e) {
        console.error("Gagal memuat data", e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  // SAVE tasks setiap kali berubah (guard isLoaded supaya tidak overwrite saat pertama mount)
  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem("@yolanda_tasks", JSON.stringify(tasks)).catch((e) =>
      console.error("Gagal menyimpan tasks", e)
    );
  }, [tasks, isLoaded]);

  // SAVE theme setiap kali berubah
  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem("@yolanda_theme", JSON.stringify(isDark)).catch((e) =>
      console.error("Gagal menyimpan theme", e)
    );
  }, [isDark, isLoaded]);

  const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
  const toggleTask = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  const deleteTask = (id: string) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));
  const clearAllTasks = () => setTasks([]);

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
            // FIX: tambah padding bottom supaya tidak bentrok dengan navbar bawaan HP
            tabBarStyle: {
              backgroundColor: colors.tabBar,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              paddingBottom: 40,   // <-- naik dari 8 ke 20, beri ruang navbar HP
              paddingTop: 8,
              height: 105,          // <-- tinggi tab bar ditambah
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
                <MaterialCommunityIcons name="check-all" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="calendar"
            options={{
              title: "Calendar",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="calendar-month" size={size} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "Settings",
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="cog" size={size} color={color} />
              ),
            }}
          />
        </Tabs>
      </ThemeContext.Provider>
    </TasksContext.Provider>
  );
}