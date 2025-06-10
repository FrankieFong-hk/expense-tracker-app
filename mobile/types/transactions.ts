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
