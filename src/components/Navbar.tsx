import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSession, signOut } from "../lib/auth-client.js";
import { Menu, X, Home, Compass, PlusSquare, FolderHeart, Info, Mail, LogOut, LogIn } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    setIsOpen(false);
    navigate("/login");
  };

  const activeClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-250 ${
      isActive
        ? "text-gold-500 bg-primary-500/10 font-semibold"
        : "text-slate-600 hover:text-primary-500 hover:bg-slate-50"
    }`;

  const mobileActiveClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
      isActive
        ? "text-gold-500 bg-primary-500/10"
        : "text-slate-700 hover:bg-slate-50 hover:text-primary-500"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-primary-500 to-gold-500 bg-clip-text text-2xl font-extrabold tracking-wide text-transparent">
              LUXE<span className="text-gold-500">HAVEN</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={activeClass}>
              <Home size={16} /> Home
            </NavLink>
            <NavLink to="/explore" className={activeClass}>
              <Compass size={16} /> Explore
            </NavLink>
            
            {session && (
              <>
                <NavLink to="/items/add" className={activeClass}>
                  <PlusSquare size={16} /> Add Listing
                </NavLink>
                <NavLink to="/items/manage" className={activeClass}>
                  <FolderHeart size={16} /> Manage
                </NavLink>
              </>
            )}

            <NavLink to="/about" className={activeClass}>
              <Info size={16} /> About
            </NavLink>
            <NavLink to="/contact" className={activeClass}>
              <Mail size={16} /> Contact
            </NavLink>
          </div>

          {/* Auth Button/Avatar */}
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-slate-200"></div>
            ) : session ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="h-9 w-9 rounded-full object-cover border-2 border-gold-400"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-white font-bold">
                      {session.user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-slate-700 max-w-[100px] truncate">
                    {session.user.name.split(" ")[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors"
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 rounded-lg bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600 shadow-md shadow-primary-500/10 hover:shadow-lg transition-all duration-200"
              >
                <LogIn size={15} /> Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-2 shadow-lg absolute w-full left-0">
          <NavLink
            to="/"
            end
            onClick={() => setIsOpen(false)}
            className={mobileActiveClass}
          >
            <Home size={18} /> Home
          </NavLink>
          <NavLink
            to="/explore"
            onClick={() => setIsOpen(false)}
            className={mobileActiveClass}
          >
            <Compass size={18} /> Explore
          </NavLink>

          {session && (
            <>
              <NavLink
                to="/items/add"
                onClick={() => setIsOpen(false)}
                className={mobileActiveClass}
              >
                <PlusSquare size={18} /> Add Listing
              </NavLink>
              <NavLink
                to="/items/manage"
                onClick={() => setIsOpen(false)}
                className={mobileActiveClass}
              >
                <FolderHeart size={18} /> Manage Listings
              </NavLink>
            </>
          )}

          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={mobileActiveClass}
          >
            <Info size={18} /> About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={mobileActiveClass}
          >
            <Mail size={18} /> Contact
          </NavLink>

          <hr className="my-2 border-slate-100" />

          {/* Mobile Auth actions */}
          <div className="pt-2 px-2">
            {session ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="h-10 w-10 rounded-full border-2 border-gold-400"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white font-bold text-lg">
                      {session.user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-bold text-slate-800">{session.user.name}</p>
                    <p className="text-xs text-slate-500">{session.user.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-3 text-sm font-bold text-red-600 hover:bg-red-100"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-500 py-3 text-sm font-bold text-white hover:bg-primary-600 shadow-md shadow-primary-500/10"
              >
                <LogIn size={16} /> Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
