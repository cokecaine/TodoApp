import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTasks, useTheme } from "./_layout";

export default function SettingsScreen() {
  const { tasks, clearAllTasks } = useTasks();
  const { isDark, toggleTheme, colors } = useTheme();


  const handleClearAllData = () => {
    if (tasks.length === 0) {
      Alert.alert("No Data", "There are no tasks to delete.");
      return;
    }
    Alert.alert(
      "Clear All Data",
      `This will permanently delete all ${tasks.length} task(s). Are you sure?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete All",
          style: "destructive",
          onPress: clearAllTasks,
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        </View>

        {/* Appearance */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>Appearance</Text>

          {/* Theme toggle */}
          <TouchableOpacity
            style={[
              styles.settingItem,
              { backgroundColor: colors.surface, borderBottomColor: colors.border },
            ]}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons
                name="palette"
                size={24}
                color={colors.accent}
              />
              <View style={styles.settingContent}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Theme</Text>
                <Text style={[styles.settingDescription, { color: colors.textMuted }]}>
                  {isDark ? "Dark" : "Light"} — tap to switch
                </Text>
              </View>
            </View>
            {/* Switch yang menunjukkan status dark mode */}
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: "#e0e0e0", true: colors.accentLight }}
              thumbColor={isDark ? colors.accent : "#fff"}
            />
          </TouchableOpacity>
        </View>

        {/* Data */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>Data</Text>

          {/* Info jumlah tasks */}
          <View
            style={[
              styles.settingItem,
              { backgroundColor: colors.surface, borderBottomColor: colors.border },
            ]}
          >
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons
                name="format-list-checks"
                size={24}
                color={colors.accent}
              />
              <View style={styles.settingContent}>
                <Text style={[styles.settingLabel, { color: colors.text }]}>Total Tasks</Text>
                <Text style={[styles.settingDescription, { color: colors.textMuted }]}>
                  {tasks.length} task(s) stored
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>Danger Zone</Text>

          {/* onPress sekarang terhubung ke handleClearAllData */}
          <TouchableOpacity
            style={[
              styles.settingItem,
              { backgroundColor: colors.dangerBg, borderBottomColor: colors.dangerBorder },
            ]}
            activeOpacity={0.7}
            onPress={handleClearAllData}
          >
            <View style={styles.settingLeft}>
              <MaterialCommunityIcons name="trash-can" size={24} color={colors.danger} />
              <View style={styles.settingContent}>
                <Text style={[styles.settingLabel, { color: colors.danger }]}>
                  Clear All Data
                </Text>
                <Text style={[styles.settingDescription, { color: colors.textMuted }]}>
                  Delete all tasks permanently
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
  },
  container: { 
    flex: 1, 
  },
  header: { 
    paddingHorizontal: 20, 
    paddingVertical: 20 
  },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: "bold" 
  },
  section: { 
    marginBottom: 24 
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 20,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  settingLeft: { 
    flexDirection: "row", 
    alignItems: "center", 
    flex: 1 
  },
  settingContent: { 
    marginLeft: 16, 
    flex: 1 
  },
  settingLabel: { 
    fontSize: 16, 
    fontWeight: "600", 
    marginBottom: 4 
  },
  settingDescription: { 
    fontSize: 13 
  },
});
