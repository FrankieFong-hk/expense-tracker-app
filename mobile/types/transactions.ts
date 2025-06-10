export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  createdAt: string;
}

export interface TransactionSummary {
  balance: number;
  income: number;
  expense: number;
}
