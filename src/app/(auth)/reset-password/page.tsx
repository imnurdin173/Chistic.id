"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Password dan Konfirmasi Password tidak cocok.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password minimal harus 8 karakter.");
      return;
    }

    if (!token) {
      setError("Token reset password tidak valid atau telah kadaluarsa.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error: authError } = await (authClient as any).resetPassword({
        newPassword,
        token,
      });

      if (authError) {
        setError(
          authError.message ||
            "Gagal mengubah password. Token mungkin sudah tidak berlaku."
        );
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2500);
      }
    } catch (err) {
      setError("Terjadi kesalahan pada sistem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col text-center">
      <h2 className="mb-2 text-xl font-bold text-neutral-900">
        Reset Password
      </h2>
      <p className="mb-6 px-2 text-xs leading-relaxed text-neutral-500">
        Please enter your new password below to regain access to your account.
      </p>

      {isSuccess ? (
        <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center transition-all animate-in fade-in zoom-in duration-300">
          <CheckCircle2 className="mx-auto mb-2 h-10 w-10 text-green-600" />
          <h3 className="text-sm font-bold text-green-800">
            Password Changed Successfully!
          </h3>
          <p className="mt-1 text-xs text-green-600">
            Redirecting you to login page...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-center text-xs font-semibold text-red-600">
              {error}
            </div>
          )}

          {/* New Password Input */}
          <div>
            <label
              htmlFor="newPassword"
              className="mb-1.5 block text-xs font-extrabold text-gray-700"
            >
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1.5 block text-xs font-extrabold text-gray-700"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex w-full items-center justify-center rounded-full bg-[#f89c1e] py-2.5 text-sm font-bold text-white transition hover:bg-[#e08918] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="">
      {/* Main Card */}
      <div className="z-10 w-full max-w-105 rounded-2xl border border-gray-100 bg-white p-8 shadow-2xl sm:p-10">
        <Suspense
          fallback={
            <div className="py-4 text-center text-xs text-gray-500">
              Loading form...
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}