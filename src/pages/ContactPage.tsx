import { useState } from "react";
import { Mail, Phone, MapPin, Check, Send, PhoneCall, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Acquisition Advisory");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && message.trim()) {
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-bold text-gold-500 uppercase tracking-widest block mb-2">Connect With Us</span>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Our Global Offices</h1>
          <p className="text-sm text-slate-500 mt-1">Connect with our dedicated concierge desk for viewing scheduling and listing advisory.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Quick Contact Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 bg-white border border-slate-150 rounded-2xl shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-500">
                <Phone size={20} />
              </div>
              <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">Direct Hotline</h3>
              <p className="text-base font-bold text-slate-700">+1 (310) 555-0199</p>
              <p className="text-xs text-slate-400">Monday to Friday, 9:00 AM to 6:00 PM PST</p>
            </div>

            <div className="p-6 bg-white border border-slate-150 rounded-2xl shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-500">
                <Mail size={20} />
              </div>
              <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">Private Inquiries</h3>
              <a href="mailto:concierge@luxehaven.com" className="text-base font-bold text-primary-500 hover:text-gold-500 block">
                concierge@luxehaven.com
              </a>
              <p className="text-xs text-slate-400">Response guaranteed within 2 standard hours.</p>
            </div>

            <div className="p-6 bg-white border border-slate-150 rounded-2xl shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-500">
                <MapPin size={20} />
              </div>
              <h3 className="font-extrabold text-slate-800 text-sm uppercase tracking-wider">Beverly Hills HQ</h3>
              <p className="text-xs leading-relaxed text-slate-500">
                742 Evergreen Terrace,<br />
                Beverly Hills, CA 90210,<br />
                United States
              </p>
            </div>
          </div>

          {/* Contact Concierge Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 sm:p-10 border border-slate-150 rounded-3xl shadow-sm space-y-6">
              <h3 className="font-extrabold text-slate-800 text-lg border-b border-slate-50 pb-3 flex items-center gap-2">
                <PhoneCall size={18} className="text-gold-500" /> Direct Concierge Request
              </h3>

              {success ? (
                <div className="bg-emerald-50 border border-emerald-200/50 text-emerald-700 p-8 rounded-2xl text-center space-y-3">
                  <Check size={36} className="mx-auto text-emerald-500" />
                  <h4 className="font-extrabold text-base">Inquiry Dispatched</h4>
                  <p className="text-sm leading-relaxed text-emerald-600 max-w-sm mx-auto">
                    Your request has been securely compiled. A luxury acquisition representative will contact you via email shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. john@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Subject Classification</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-750 focus:outline-none focus:ring-2 focus:ring-gold-400"
                    >
                      <option value="Acquisition Advisory">Acquisition Advisory</option>
                      <option value="Private Site Tour">Private Site Tour</option>
                      <option value="Listing Partnership">Listing Partnership</option>
                      <option value="Press / Legal Enquiry">Press / Legal Enquiry</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Brief Message Description</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Outline your acquisition preferences, budget allocations, or listing details..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                      <ShieldCheck size={14} className="text-gold-500" /> SSL Encrypted Correspondence
                    </span>
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-primary-500 hover:bg-gold-500 text-white font-extrabold text-sm rounded-xl transition-all duration-200 shadow-md shadow-primary-500/10 flex items-center gap-2"
                    >
                      <Send size={14} /> Send Advisory Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
