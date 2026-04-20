import { useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useNotices } from "../hooks/useNotices";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Notices() {
  const { user } = useAuth();
  const roomId = user.uid;
  const { notices, addNotice, deleteNotice } = useNotices(roomId);
  const [text, setText] = useState("");

  const handleAdd = useCallback(async () => {
    if (!text.trim()) return;
    const author = user.email.split("@")[0];
    await addNotice(text.trim(), author);
    setText("");
    toast.success("Notice posted!");
  }, [text, user, addNotice]);

  const handleDelete = useCallback(async (id) => {
    await deleteNotice(id);
    toast.info("Notice removed.");
  }, [deleteNotice]);

  function timeAgo(ts) {
    if (!ts) return "just now";
    const diff = Date.now() - ts.toDate().getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <ToastContainer position="top-right" autoClose={2500} theme="dark"
        toastStyle={{ background: "#1a1a1a", border: "1px solid #333" }} />
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">Notice Board</p>

        {/* Post a notice */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-6">
          <textarea
            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-lime-400 resize-none"
            placeholder="Post a notice for your roommates... e.g. 'Electricity bill due Friday!'"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handleAdd}
            className="mt-3 bg-lime-400 text-zinc-950 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-lime-300 transition">
            Post Notice
          </button>
        </div>

        {/* Notices list */}
        {notices.length === 0 ? (
          <p className="text-center text-zinc-600 font-mono text-sm py-16">No notices yet. Post one!</p>
        ) : (
          notices.map((n) => (
            <div key={n.id} className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 mb-3">
              <p className="text-white text-sm leading-relaxed">{n.text}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-zinc-500 font-mono">
                  {n.author} · {timeAgo(n.createdAt)}
                </span>
                <button onClick={() => handleDelete(n.id)}
                  className="text-xs text-zinc-600 hover:text-red-400 transition">
                  remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}