// react custom hook file

import { useCallback, useState } from "react";
import {
  Category,
  Transaction,
  TransactionSummary,
} from "../../types/transactions";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import type { UserResource } from "@clerk/types";

export const useTransactions = (userId: string) => {
  const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<TransactionSummary>({
    balance: "0",
    income: "0",
    expense: "0",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const router = useRouter();

  // useCallback is used for performance reasons, it will memoize the function
  // and prevent it from being re-created on every render
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${userId}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/transactions/summary/${userId}`
      );
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;

    setIsLoading(true);
    try {
      //can be run in parallel
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchSummary, fetchTransactions, userId]);

  const deleteTransaction = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      // Refresh data after deletion
      loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error: unknown) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error", (error as Error).message);
    }
  };

  const createTransaction = async ({
    user,
    title,
    amount,
    selectedCategory,
    isExpense,
  }: {
    user: UserResource | null | undefined;
    title: string;
    amount: string;
    selectedCategory: Category;
    isExpense: boolean;
  }) => {
    try {
      setIsCreateLoading(true);

      //format the amount (negative for expenses, positive for income)
      const formattedAmount = isExpense
        ? -Math.abs(parseFloat(amount))
        : Math.abs(parseFloat(amount));

      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          amount: formattedAmount,
          category: selectedCategory.id,
          user_id: user?.id,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create transaction");
      }

      Alert.alert("Success", "Transaction created successfully");
      router.replace("/");
    } catch (error) {
      console.error("Error creating transaction:", error);
      Alert.alert("Error", (error as Error).message);
    } finally {
      setIsCreateLoading(false);
    }
  };

  return {
    transactions,
    summary,
    isLoading,
    isCreateLoading,
    loadData,
    deleteTransaction,
    createTransaction,
  };
};
