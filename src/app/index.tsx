import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { initializeDatabase } from "../database/database";

export default function HomeScreen() {
  useEffect(() => {
    async function setupDatabase() {
      try {
        await initializeDatabase();
        console.log("Database initialized successfully");
      } catch (error) {
        console.error("Failed to initialize database:", error);
      }
    }

    setupDatabase();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Budget</Text>

      <View style={styles.balanceCard}>
        <Text style={styles.label}>Available to Budget</Text>
        <Text style={styles.balance}>$0.00</Text>
      </View>

      <Text style={styles.sectionTitle}>This Month</Text>

      <View style={styles.summaryRow}>
        <View>
          <Text style={styles.label}>Budgeted</Text>
          <Text style={styles.amount}>$0.00</Text>
        </View>

        <View>
          <Text style={styles.label}>Spent</Text>
          <Text style={styles.amount}>$0.00</Text>
        </View>

        <View>
          <Text style={styles.label}>Remaining</Text>
          <Text style={styles.amount}>$0.00</Text>
        </View>
      </View>

      <Text style={styles.emptyMessage}>No transactions yet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 24,
  },
  balanceCard: {
    backgroundColor: "white",
    padding: 24,
    borderRadius: 12,
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  balance: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
  },
  amount: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 4,
  },
  emptyMessage: {
    textAlign: "center",
    color: "#777",
    marginTop: 40,
  },
});
