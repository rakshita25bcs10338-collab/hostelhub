import { useState } from "react";

export default function AddExpenseForm({ roommates, onAdd }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [splitAmong, setSplitAmong] = useState([]);
  const [open, setOpen] = useState(false);

  function toggleSplit(person) {
    setSplitAmong((prev) =>
      prev.includes(person) ? prev.filter((p) => p !== person) : [...prev, person]
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !amount || !paidBy || splitAmong.length === 0) return;
    await onAdd({ name, amount: parseFloat(amount), paidBy, splitAmong });
    setName(""); setAmount(""); setPaidBy(""); setSplitAmong([]);
    setOpen(false);
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="w-full bg-zinc-900 border border-dashed border-zinc-700 text-zinc-400 hover:border-lime-400 hover:text-lime-400 font-semibold py-3 rounded-2xl text-sm transition">
        + Add New Expense
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-5 mb-4">
      <div>
        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">What for?</label>
        <input className="w-full mt-2 bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-lime-400"
          placeholder="e.g. Biryani, Electricity..." value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Amount (₹)</label>
        <input className="w-full mt-2 bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-lime-400"
          type="number" placeholder="0" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div>
        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Who paid?</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {roommates.map((r) => (
            <button type="button" key={r} onClick={() => setPaidBy(r)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                paidBy === r ? "bg-lime-400 border-lime-400 text-zinc-950" : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
              }`}>{r}</button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Split among</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {roommates.map((r) => (
            <button type="button" key={r} onClick={() => toggleSplit(r)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                splitAmong.includes(r) ? "bg-orange-500 border-orange-500 text-white" : "border-zinc-700 text-zinc-300 hover:border-zinc-500"
              }`}>{r}</button>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={() => setOpen(false)}
          className="flex-1 border border-zinc-700 text-zinc-400 font-bold py-3 rounded-xl text-sm hover:border-zinc-500 transition">
          Cancel
        </button>
        <button type="submit"
          className="flex-1 bg-lime-400 text-zinc-950 font-bold py-3 rounded-xl hover:bg-lime-300 transition">
          Add Expense
        </button>
      </div>
    </form>
  );
}