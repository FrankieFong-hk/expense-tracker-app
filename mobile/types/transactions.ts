import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export interface Transaction {
  id: string;
  title: string;
  amount: string;
  category: string;
  created_at: string;
}

export interface TransactionSummary {
  balance: string;
  income: string;
  expense: string;
}

export interface Category {
  id: string;
  name: string;
  icon: ComponentProps<typeof Ionicons>["name"];
}
