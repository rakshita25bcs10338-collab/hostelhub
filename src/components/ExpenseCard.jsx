export default function ExpenseCard({ expense, onDelete }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 mb-3 flex justify-between items-center">
      <div>
        <p className="font-bold text-white">{expense.name}</p>
        <p className="text-xs text-zinc-500 font-mono mt-1">
          {expense.paidBy} paid · split {expense.splitAmong.join(", ")}
        </p>
      </div>
      <div className="text-right">
        <p className="text-lime-400 font-bold font-mono text-lg">
          ₹{expense.amount.toFixed(0)}
        </p>
        <button
          onClick={() => onDelete(expense.id)}
          className="text-xs text-zinc-600 hover:text-red-400 transition mt-1"
        >
          remove
        </button>
      </div>
    </div>
  );
}