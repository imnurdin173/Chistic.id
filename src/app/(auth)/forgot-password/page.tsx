"use client";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="flex flex-col text-center">
      <h2 className="text-xl font-bold text-neutral-900 mb-2">
        Forgot Password
      </h2>
      <p className="text-xs tex-neutral-500 mb-6 px-2 leading-relaxed">
        We are so sorry for that, but don't worry we'll help you. Please enter
        your email address, and our team will send you a link to create a new
        password.
      </p>

      <form className="space-y-6 text-left">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-neutral-700">
            Email
          </label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3 w-4 h-4 text-neutral-400" />
            <input
              type="email"
              placeholder="yourname@mail.com"
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-neutral 300 rounded-full outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>
        <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 rounded-full transition-colors text-sm">Send</button>
      </form>
    </div>
  );
}
