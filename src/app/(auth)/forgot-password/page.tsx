"use client";
import { useState } from "react";
import Link from "next/link";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const { error: authError } = await (authClient as any).forgetPassword({
        email,
        redirectTo: "/reset-password",
      });
      
      if (authError) {
        setError(authError.message || "There some problem");
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      setError("Terjadi kesalahan pada sistem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col text-center">
      <h2 className="text-xl font-bold text-neutral-900 mb-2">
        Forgot Password
      </h2>
      <p className="text-xs text-neutral-500 mb-6 px-2 leading-relaxed">
        We are so sorry for that, but don't worry we'll help you. Please enter
        your email address, and our team will send you a link to create a new
        password.
      </p>

      {isSuccess ? (
        <div className="rounded-xl border border-green-200 bg-green-50 p-5 text-center transition-all animate-in fade-in zoom-in duration-300">
          <p className="text-sm font-medium text-green-800">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="mt-2 text-xs text-green-600">
            Please check your inbox or spam folder.
          </p>
          <Link
            href="/login"
            className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-amber-500 hover:text-amber-600"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-center text-xs font-semibold text-red-600">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-left text-xs font-extrabold text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yourname@mail.com"
                className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center rounded-full bg-[#f89c1e] py-2.5 text-sm font-bold text-white transition hover:bg-[#e08918] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Send"
            )}
          </button>

          <div className="pt-2 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 transition hover:text-amber-500"
            >
              <ArrowLeft className="h-3 w-3" /> Back to Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}