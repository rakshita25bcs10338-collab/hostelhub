import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  async function handleLogout() {
    toast.info("Logging out...");
    setTimeout(() => logout(), 1000);
  }

  const links = [
    { to: "/dashboard", label: "Expenses" },
    { to: "/balances", label: "Balances" },
    { to: "/notices", label: "Notices" },
  ];

  return (
    <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-bold text-white">
          Hostel<span className="text-lime-400">Hub</span>
        </h1>
        <nav className="flex gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                location.pathname === l.to
                  ? "bg-lime-400 text-zinc-950"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-zinc-500 text-xs hidden sm:block">{user?.email}</span>
        <button
          onClick={handleLogout}
          className="text-xs text-zinc-500 hover:text-red-400 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}