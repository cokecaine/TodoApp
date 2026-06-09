import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTasks, useTheme } from "../context";

export default function SettingsScreen() {
  const { tasks, clearAllTasks } = useTasks();
  const { colors, isDark, toggleTheme } = useTheme();

  const totalTasks = tasks.length;
  const activeTasks = tasks.filter((t) => !t.completed).length;
  const completedTasks = tasks.filter((t) => t.completed).length;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={["top"]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
      </View>

      <ScrollView style={styles.flex} contentContainerStyle={styles.scrollContent}>
        {/* Stats Overview Card */}
        <View style={[styles.statsCard, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <Text style={[styles.statsCardTitle, { color: colors.text }]}>Overview</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.accent }]}>{totalTasks}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Total</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.warning }]}>{activeTasks}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Active</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.success }]}>{completedTasks}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>Done</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textLight }]}>APPEARANCE</Text>
        <View style={[styles.sectionBlock, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconWrap, { backgroundColor: colors.surfaceAlt }]}>
                <MaterialCommunityIcons 
                  name={isDark ? "weather-night" : "white-balance-sunny"} 
                  size={22} 
                  color={colors.accent} 
                />
              </View>
              <View>
                <Text style={[styles.settingTitle, { color: colors.text }]}>Dark Mode</Text>
                <Text style={[styles.settingSub, { color: colors.textMuted }]}>
                  {isDark ? "Currently using dark theme" : "Currently using light theme"}
                </Text>
              </View>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.borderStrong, true: colors.accentLight }}
              thumbColor={isDark ? colors.accent : "#f4f3f4"}
            />
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textLight }]}>DANGER ZONE</Text>
        <View style={[styles.sectionBlock, { backgroundColor: colors.dangerBg, borderColor: colors.dangerBorder }]}>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconWrap, { backgroundColor: 'transparent' }]}>
                <MaterialCommunityIcons name="delete-sweep-outline" size={24} color={colors.danger} />
              </View>
              <View>
                <Text style={[styles.settingTitle, { color: colors.danger }]}>Clear All Tasks</Text>
                <Text style={[styles.settingSub, { color: colors.danger, opacity: 0.8 }]}>
                  This action cannot be undone
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.dangerBtn, { backgroundColor: colors.danger }]}
              onPress={clearAllTasks}
              activeOpacity={0.8}
            >
              <Text style={styles.dangerBtnText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: colors.textLight }]}>Todo App v1.0.0</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  statsCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    marginBottom: 32,
  },
  statsCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: "600",
  },
  statDivider: {
    width: 1,
    height: 40,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionBlock: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 32,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  settingSub: {
    fontSize: 13,
    fontWeight: "400",
  },
  dangerBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  dangerBtnText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 14,
  },
  versionContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  versionText: {
    fontSize: 13,
    fontWeight: "500",
  },
});