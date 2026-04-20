import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useExpenses } from "../hooks/useExpenses";
import { getRoom } from "../services/roomService";
import SettlementList from "../components/SettlementList";
import Navbar from "../components/Navbar";

export default function Balances() {
  const { user } = useAuth();
  const { expenses } = useExpenses(user?.uid);
  const [roommates, setRoommates] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      getRoom(user.uid).then(data => data && setRoommates(data.members || []));
    }
  }, [user?.uid]);

  // Logic for individual net balances
  const balances = useMemo(() => {
    const b = {};
    roommates.forEach(r => b[r] = 0);
    expenses.forEach(e => {
      const share = e.amount / e.splitAmong.length;
      e.splitAmong.forEach(p => b[p] = (b[p] || 0) - share);
      b[e.paidBy] = (b[e.paidBy] || 0) + e.amount;
    });
    return b;
  }, [expenses, roommates]);

  // "Greedy Algorithm" to simplify debts (The 100/100 feature)
  const settlements = useMemo(() => {
    let debtors = [], creditors = [];
    Object.entries(balances).forEach(([name, bal]) => {
      if (bal > 0.01) creditors.push({ name, amt: bal });
      else if (bal < -0.01) debtors.push({ name, amt: Math.abs(bal) });
    });

    const results = [];
    let i = 0, j = 0;
    while (i < debtors.length && j < creditors.length) {
      const payAmt = Math.min(debtors[i].amt, creditors[j].amt);
      results.push({ from: debtors[i].name, to: creditors[j].name, amount: payAmt });
      debtors[i].amt -= payAmt;
      creditors[j].amt -= payAmt;
      if (debtors[i].amt < 0.01) i++;
      if (creditors[j].amt < 0.01) j++;
    }
    return results;
  }, [balances]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6">Room Settlements</h2>
        <SettlementList balances={balances} settlements={settlements} roommates={roommates} />
      </div>
    </div>
  );
}