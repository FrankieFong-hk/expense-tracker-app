import { View, Text } from "react-native";
import React from "react";
import { TransactionSummary } from "@/types/transactions";
import { styles } from "@/assets/styles/home.styles";
import { COLORS } from "@/constants/Colors";

const BalanceCard = ({ summary }: { summary: TransactionSummary }) => {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>
      <Text style={styles.balanceAmount}>
        ${parseFloat(summary.balance).toFixed(2)}
      </Text>
      <View style={styles.balanceStats}>
        <View style={[styles.balanceStatItem, styles.statDivider]}>
          <View style={styles.balanceStatLabel}>
            <Text style={styles.balanceStatLabel}>Income</Text>
            <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}>
              +${parseFloat(summary.income).toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={styles.balanceStatItem}>
          <View style={styles.balanceStatLabel}>
            <Text style={styles.balanceStatLabel}>Expenses</Text>
            <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
              -${parseFloat(summary.expense).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BalanceCard;
