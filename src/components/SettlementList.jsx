export default function SettlementList({ balances, settlements, roommates }) {
  return (
    <div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mb-6">
        <div className="bg-zinc-800 px-5 py-3 flex justify-between text-xs font-bold text-zinc-500 uppercase tracking-wider">
          <span>Person</span><span>Net balance</span>
        </div>
        {roommates.map((r) => {
          const b = balances[r] || 0;
          return (
            <div key={r} className="px-5 py-4 border-t border-zinc-800 flex justify-between items-center">
              <span className="font-semibold">{r}</span>
              <span className={`font-mono text-sm font-medium ${
                b > 0.01 ? "text-green-400" : b < -0.01 ? "text-red-400" : "text-zinc-500"
              }`}>
                {b > 0.01 ? `gets back ₹${b.toFixed(0)}` : b < -0.01 ? `owes ₹${Math.abs(b).toFixed(0)}` : "settled"}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Who pays whom</p>
      {settlements.length === 0 ? (
        <p className="text-zinc-600 font-mono text-sm">Everyone is settled up!</p>
      ) : (
        settlements.map((s, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 mb-2 flex items-center gap-3">
            <span className="font-bold">{s.from}</span>
            <span className="text-lime-400 text-lg">→</span>
            <span className="font-bold">{s.to}</span>
            <span className="ml-auto font-mono text-orange-400 font-medium">₹{s.amount.toFixed(0)}</span>
          </div>
        ))
      )}
    </div>
  );
}