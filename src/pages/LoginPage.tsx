import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn, signUp } from "../lib/auth-client.js";
import { KeyRound, Mail, LogIn, Sparkles } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await signIn.email({
        email,
        password,
      });
      if (res?.error) {
        setError(res.error.message || "Invalid credentials. Please try again.");
      } else {
        navigate("/");
      }
    } catch (err: any) {
      console.error(err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError(null);
    const demoEmail = "demo@luxehaven.com";
    const demoPassword = "DemoPassword123!";
    const demoName = "Demo Luxury Member";

    try {
      // First, attempt to sign in
      const res = await signIn.email({
        email: demoEmail,
        password: demoPassword,
      });

      if (res?.error) {
        // If credentials error, try signing up first (useful on fresh database)
        const signUpRes = await signUp.email({
          email: demoEmail,
          password: demoPassword,
          name: demoName,
        });

        if (signUpRes?.error) {
          setError(signUpRes.error.message || "Failed to initialize demo account.");
          return;
        }

        // Try signing in again after signup
        const retryRes = await signIn.email({
          email: demoEmail,
          password: demoPassword,
        });

        if (retryRes?.error) {
          setError(retryRes.error.message || "Failed to log in to demo account.");
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    } catch (err: any) {
      console.error("Demo login error:", err);
      setError("Failed to execute demo login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-150 shadow-sm relative overflow-hidden">
        {/* Decorative corner */}
        <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gold-500/5 border border-gold-500/5"></div>

        <div className="text-center">
          <Link to="/" className="inline-block text-2xl font-black tracking-wider text-primary-500 mb-6">
            LUXE<span className="text-gold-500">HAVEN</span>
          </Link>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Access Your Sanctuary</h2>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-bold">LuxeHaven Member Portal</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="email"
                required
                placeholder="e.g. member@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
              <a href="#forgot" className="text-xs font-bold text-gold-500 hover:text-gold-600 transition-colors">Forgot?</a>
            </div>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-extrabold text-sm rounded-xl transition-all duration-200 shadow-md shadow-primary-500/10 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Verifying Credentials..." : <><LogIn size={16} /> Sign In</>}
          </button>
        </form>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-100"></div>
          <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest">Or</span>
          <div className="flex-grow border-t border-slate-100"></div>
        </div>

        {/* Demo Login Button */}
        <button
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full py-3.5 border-2 border-dashed border-gold-400 bg-gold-500/5 text-gold-600 hover:bg-gold-500/10 font-bold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Sparkles size={16} className="text-gold-500 animate-pulse" /> Auto-Fill Demo Access
        </button>

        <p className="text-center text-sm text-slate-500 pt-2">
          New to LuxeHaven?{" "}
          <Link to="/register" className="font-bold text-gold-500 hover:text-gold-600 transition-colors">
            Create Member Profile
          </Link>
        </p>
      </div>
    </div>
  );
}
