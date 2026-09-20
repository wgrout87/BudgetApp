import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  Account,
  addAccount,
  getAccounts,
  initializeDatabase,
} from "../database/database";

export default function HomeScreen() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountName, setAccountName] = useState("");
  const [startingBalance, setStartingBalance] = useState("");

  useEffect(() => {
    async function setupDatabase() {
      try {
        await initializeDatabase();

        const savedAccounts = await getAccounts();
        setAccounts(savedAccounts);

        console.log("Accounts loaded:", savedAccounts);
      } catch (error) {
        console.error("Failed to initialize database:", error);
      }
    }

    setupDatabase();
  }, []);

  async function handleAddAccount() {
    const balance = Number(startingBalance);

    if (!accountName.trim() || Number.isNaN(balance)) {
      return;
    }

    await addAccount(accountName.trim(), "checking", balance);

    const savedAccounts = await getAccounts();
    setAccounts(savedAccounts);

    setAccountName("");
    setStartingBalance("");
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
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

      <Text style={styles.sectionTitle}>Accounts</Text>

      <View style={styles.accountForm}>
        <TextInput
          style={styles.input}
          placeholder="Account name"
          value={accountName}
          onChangeText={setAccountName}
        />

        <TextInput
          style={styles.input}
          placeholder="Starting balance"
          value={startingBalance}
          onChangeText={setStartingBalance}
          keyboardType="decimal-pad"
        />

        <Pressable style={styles.addButton} onPress={handleAddAccount}>
          <Text style={styles.addButtonText}>Add Account</Text>
        </Pressable>
      </View>

      {accounts.length === 0 ? (
        <Text style={styles.emptyMessage}>No accounts yet.</Text>
      ) : (
        accounts.map((account) => (
          <View key={account.id} style={styles.balanceCard}>
            <Text style={styles.label}>{account.type}</Text>
            <Text style={styles.amount}>{account.name}</Text>
            <Text style={styles.balance}>${account.balance.toFixed(2)}</Text>
          </View>
        ))
      )}

      <Text style={styles.emptyMessage}>No transactions yet.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
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
  accountForm: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#222",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
