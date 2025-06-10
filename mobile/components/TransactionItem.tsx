import { View, Text, TouchableOpacity } from "react-native";
import React, { ComponentProps } from "react";
import { Transaction } from "@/types/transactions";
import { styles } from "@/assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import { formatDate } from "@/lib/utils";

const CATEGORY_ICONS: Record<string, ComponentProps<typeof Ionicons>["name"]> =
  {
    "Food & Drinks": "fast-food",
    Transportation: "car",
    Shopping: "cart",
    Entertainment: "ticket",
    "Health & Fitness": "medkit",
    Education: "school",
    Utilities: "home",
    Income: "cash",
    Bills: "receipt",
    Others: "help-circle-outline",
  };

const TransactionItem = ({
  item,
  onDelete,
}: {
  item: Transaction;
  onDelete: (id: string) => void;
}) => {
  const isIncome = parseFloat(item.amount) > 0;
  const iconName = CATEGORY_ICONS[item.category] || "pricetag-outline";

  return (
    <View style={styles.transactionCard} key={item.id}>
      <TouchableOpacity style={styles.transactionContent}>
        <View style={styles.categoryIconContainer}>
          <Ionicons
            name={iconName}
            size={22}
            color={isIncome ? COLORS.income : COLORS.expense}
          />
        </View>
        <View style={styles.transactionLeft}>
          <Text style={styles.transactionTitle}>{item.title}</Text>
          <Text style={styles.transactionCategory}>{item.category}</Text>
        </View>
        <View style={styles.transactionRight}>
          <Text
            style={[
              styles.transactionAmount,
              { color: isIncome ? COLORS.income : COLORS.expense },
            ]}
          >
            {isIncome ? "+" : "-"}$
            {Math.abs(parseFloat(item.amount)).toFixed(2)}
          </Text>
          <Text style={styles.transactionDate}>
            {formatDate(item.created_at)}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color={COLORS.expense} />
      </TouchableOpacity>
    </View>
  );
};

export default TransactionItem;
