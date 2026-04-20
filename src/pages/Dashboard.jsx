import { useState, useEffect, useMemo, useCallback } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useExpenses } from "../hooks/useExpenses";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseCard from "../components/ExpenseCard";
import Navbar from "../components/Navbar";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { saveMembers, getRoom } from "../services/roomService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const { user } = useAuth();
  const roomId = user.uid;
  const { expenses, addExpense, deleteExpense } = useExpenses(roomId);
  const [roommates, setRoommates] = useState([]);
  const [newName, setNewName] = useState("");
  const [loadingRoom, setLoadingRoom] = useState(true);

  // useMemo — only recalculates when expenses change
  const totalSpent = useMemo(
    () => expenses.reduce((s, e) => s + e.amount, 0),
    [expenses]
  );

  useEffect(() => {
    async function loadRoom() {
      const data = await getRoom(roomId);
      if (data) {
        setRoommates(data.members || []);
      } else {
        const initial = [user.email.split("@")[0]];
        await saveMembers(roomId, initial);
        setRoommates(initial);
      }
      setLoadingRoom(false);
    }
    loadRoom();
  }, [roomId]);

  // useCallback — stable function reference
  const handleAddRoommate = useCallback(async () => {
    const name = newName.trim();
    if (!name) return;
    if (roommates.includes(name)) {
      toast.error(`${name} is already in the room!`);
      return;
    }
    const updated = [...roommates, name];
    setRoommates(updated);
    await saveMembers(roomId, updated);
    setNewName("");
    toast.success(`${name} added!`);
  }, [newName, roommates, roomId]);

  const handleRemoveRoommate = useCallback(async (name) => {
    const updated = roommates.filter((r) => r !== name);
    setRoommates(updated);
    await saveMembers(roomId, updated);
    toast.info(`${name} removed.`);
  }, [roommates, roomId]);

  const handleAddExpense = useCallback(async (expense) => {
    await addExpense(expense);
    toast.success(`₹${expense.amount} for "${expense.name}" added!`);
  }, [addExpense]);

  const handleDeleteExpense = useCallback(async (id) => {
    await deleteExpense(id);
    toast.info("Expense removed.");
  }, [deleteExpense]);

  const COLORS = ["#c8f135","#ff6b35","#6b8cff","#ff4da6","#4dffc8","#ffd74d"];

  if (loadingRoom) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-500 font-mono text-sm">Loading your room...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <ToastContainer position="top-right" autoClose={2500} theme="dark"
        toastStyle={{ background: "#1a1a1a", border: "1px solid #333" }} />
      <Navbar />

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Total */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 mb-4 flex justify-between items-center">
          <span className="text-zinc-400 text-sm font-medium">Total spent</span>
          <span className="text-lime-400 text-2xl font-bold font-mono">
            ₹{totalSpent.toFixed(0)}
          </span>
        </div>

        {/* Room members */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 mb-6">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Room members</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {roommates.map((r, i) => (
              <div key={r} className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 rounded-full px-3 py-1.5">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-zinc-950"
                  style={{ background: COLORS[i % COLORS.length] }}>
                  {r[0].toUpperCase()}
                </div>
                <span className="text-sm font-semibold">{r}</span>
                <button onClick={() => handleRemoveRoommate(r)}
                  className="text-zinc-600 hover:text-red-400 transition text-base leading-none ml-1">×</button>
              </div>
            ))}
            {roommates.length === 0 && (
              <p className="text-zinc-600 text-sm font-mono">No members yet.</p>
            )}
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-2 text-sm outline-none focus:border-lime-400"
              placeholder="Add member name..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddRoommate()}
            />
            <button onClick={handleAddRoommate}
              className="bg-lime-400 text-zinc-950 font-bold px-4 py-2 rounded-xl text-sm hover:bg-lime-300 transition">
              + Add
            </button>
          </div>
        </div>

        {/* Expenses */}
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Expenses</p>
        {roommates.length === 0 ? (
          <p className="text-center text-zinc-600 font-mono text-sm py-10">Add room members first!</p>
        ) : (
          <AddExpenseForm roommates={roommates} onAdd={handleAddExpense} />
        )}
        <div className="mt-4">
          {expenses.length === 0 ? (
            <p className="text-center text-zinc-600 py-10 font-mono text-sm">No expenses yet!</p>
          ) : (
            expenses.map((e) => (
              <ExpenseCard key={e.id} expense={e} onDelete={handleDeleteExpense} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}