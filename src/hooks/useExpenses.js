import { useState, useEffect } from "react";
import {
  subscribeToExpenses,
  addExpense as addExpenseService,
  deleteExpense as deleteExpenseService
} from "../services/expenseService";

export function useExpenses(roomId) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    if (!roomId) return;
    const unsub = subscribeToExpenses(roomId, setExpenses);
    return unsub;
  }, [roomId]);

  async function addExpense(expense) {
    await addExpenseService(roomId, expense);
  }

  async function deleteExpense(id) {
    await deleteExpenseService(roomId, id);
  }

  return { expenses, addExpense, deleteExpense };
}