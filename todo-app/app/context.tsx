import React, { createContext, useContext, useState, useEffect } from "react";
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
export const lightColors = {
  background: "#F0F4FF",
  surface: "#FFFFFF",
  surfaceAlt: "#F7F9FF",
  surfaceElevated: "#FFFFFF",
  border: "#E8EDFF",
  borderStrong: "#C5D0FF",
  text: "#1A1D3A",
  textSecondary: "#4A5080",
  textMuted: "#8890B8",
  textLight: "#B0B8D8",
  accent: "#6C63FF",
  accentSecondary: "#9D97FF",
  accentLight: "#EBE9FF",
  accentGradientStart: "#6C63FF",
  accentGradientEnd: "#9D97FF",
  success: "#22C55E",
  successLight: "#DCFCE7",
  danger: "#F43F5E",
  dangerBg: "#FFF1F4",
  dangerBorder: "#FECDD3",
  warning: "#F59E0B",
  tabBar: "#FFFFFF",
  inputBg: "#FFFFFF",
  cardBg: "#FFFFFF",
  cardShadow: "rgba(108,99,255,0.08)",
  progressBg: "#E8EDFF",
};

export const darkColors: typeof lightColors = {
  background: "#0D0E1A",
  surface: "#161828",
  surfaceAlt: "#1C1E32",
  surfaceElevated: "#1C1E32",
  border: "#252840",
  borderStrong: "#363A5E",
  text: "#E8EAFF",
  textSecondary: "#9BA3CC",
  textMuted: "#6B7299",
  textLight: "#454A70",
  accent: "#7B74FF",
  accentSecondary: "#A89EFF",
  accentLight: "#1E1B45",
  accentGradientStart: "#7B74FF",
  accentGradientEnd: "#A89EFF",
  success: "#22C55E",
  successLight: "#052E1A",
  danger: "#F43F5E",
  dangerBg: "#200A10",
  dangerBorder: "#4A1525",
  warning: "#F59E0B",
  tabBar: "#161828",
  inputBg: "#1C1E32",
  cardBg: "#161828",
  cardShadow: "rgba(0,0,0,0.3)",
  progressBg: "#252840",
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

// ─── PROVIDERS ────────────────────────────────────────────────────
export function AppProviders({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDark, setIsDark] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // LOAD data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [savedTasks, savedTheme] = await Promise.all([
          AsyncStorage.getItem("@todo_app_tasks"),
          AsyncStorage.getItem("@todo_app_theme"),
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

  // SAVE tasks
  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem("@todo_app_tasks", JSON.stringify(tasks)).catch((e) =>
      console.error("Gagal menyimpan tasks", e)
    );
  }, [tasks, isLoaded]);

  // SAVE theme
  useEffect(() => {
    if (!isLoaded) return;
    AsyncStorage.setItem("@todo_app_theme", JSON.stringify(isDark)).catch((e) =>
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
        {children}
      </ThemeContext.Provider>
    </TasksContext.Provider>
  );
}

// Dummy default export so Expo Router doesn't complain about missing default export
export default function ContextDummy() {
  return null;
}
