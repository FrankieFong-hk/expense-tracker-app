import { sql } from "../config/db.js";

export async function getTransactionsByUserId(req, res) {
  try {
    const { userId } = req.params;
    const transactions =
      await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
}

export async function createTransaction(req, res) {
  try {
    const { title, amount, category, user_id } = req.body;

    if (!title || amount === undefined || !category || !user_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const transaction = await sql`
            INSERT INTO transactions (user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *`;

    res.status(201).json({ transaction });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ error: "Failed to add transaction" });
  }
}

export async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      return res.status(400).json({ error: "Invalid transaction ID" });
    }

    const result =
      await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;

    if (result.length === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Failed to delete transaction" });
  }
}

export async function getTransactionSummaryByUserId(req, res) {
  try {
    const { userId } = req.params;
    const balanceResult =
      await sql`SELECT COALESCE(SUM(amount), 0) as balance FROM transactions 
            WHERE user_id = ${userId}`;

    const incomeResult = await sql`
          SELECT COALESCE(SUM(amount), 0) as income FROM transactions 
          WHERE user_id = ${userId} AND amount > 0
          `;

    const expenseResult = await sql`
          SELECT COALESCE(SUM(amount), 0) as expense FROM transactions 
          WHERE user_id = ${userId} AND amount < 0
          `;

    res.status(200).json({
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expense: expenseResult[0].expense,
    });
  } catch (error) {
    console.error("Error fetching transaction summary:", error);
    res.status(500).json({ error: "Failed to fetch transaction summary" });
  }
}
