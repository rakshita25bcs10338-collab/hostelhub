import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account created! Welcome to HostelHub!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Welcome back!");
      }
    } catch (err) {
      if (err.code === "auth/email-already-in-use") toast.error("Email already in use!");
      else if (err.code === "auth/wrong-password") toast.error("Wrong password!");
      else if (err.code === "auth/user-not-found") toast.error("No account found!");
      else if (err.code === "auth/weak-password") toast.error("Password must be 6+ characters!");
      else toast.error(err.message);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <ToastContainer position="top-right" autoClose={2500} theme="dark"
        toastStyle={{ background: "#1a1a1a", border: "1px solid #333" }} />

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white mb-1">
          Hostel<span className="text-lime-400">Hub</span>
        </h1>
        <p className="text-zinc-400 text-sm mb-6">
          {isSignup ? "Create your account" : "Welcome back"}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-lime-400"
            type="email" placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)} required
          />
          <input
            className="bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-lime-400"
            type="password" placeholder="Password (min 6 chars)"
            value={password} onChange={(e) => setPassword(e.target.value)} required
          />
          <button
            type="submit" disabled={loading}
            className="bg-lime-400 text-zinc-950 font-bold py-3 rounded-xl hover:bg-lime-300 transition disabled:opacity-50"
          >
            {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-zinc-500 text-xs text-center mt-4">
          {isSignup ? "Already have an account?" : "New here?"}{" "}
          <button className="text-lime-400 hover:underline" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}