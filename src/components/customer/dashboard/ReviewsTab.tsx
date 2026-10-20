"use client";

import React, { useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";

export default function ReviewsTab() {
  const [activeTab, setActiveTab] = useState<"need" | "my">("need");
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setActiveTab("my");
    }, 1500);
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-neutral-900">Review</h1>
        <p className="mt-0.5 text-xs text-neutral-500">
          Share how your feelings at the experience
        </p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("need")}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
            activeTab === "need"
              ? "bg-amber-100 text-amber-600"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          Need Review
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("my")}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
            activeTab === "my"
              ? "bg-amber-100 text-amber-600"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          My Review
        </button>
      </div>

      {activeTab === "need" ? (
        <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-xs">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <CheckCircle2 className="h-12 w-12 text-emerald-500 mb-3" />
              <h3 className="text-sm font-bold text-neutral-900">Review Submitted!</h3>
              <p className="text-xs text-neutral-500 mt-1">Thank you for sharing your feedback.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 border-b border-neutral-100 pb-4">
                <div className="h-14 w-14 overflow-hidden rounded-xl bg-neutral-100 flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=60"
                    alt="Event thumbnail"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-neutral-900">
                    Night Symphony Classic Meets Rock
                  </h3>
                  <p className="text-[11px] text-neutral-500 mt-0.5">Ticket VIP x1</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">Attended at 20 Sep 2026</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-5 space-y-5">
                <div>
                  <label className="text-xs font-bold text-neutral-800">
                    How was it? <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-2 flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= (hoverRating || rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-neutral-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-semibold text-neutral-600">
                      {rating > 0 ? `${rating} / 5` : ""}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1.5">
                    Feedback (Optional)
                  </label>
                  <textarea
                    rows={4}
                    maxLength={200}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Tell others what you liked or what could be better"
                    className="w-full rounded-xl border border-neutral-200 bg-white p-3 text-xs text-neutral-800 placeholder-neutral-400 focus:border-amber-500 focus:outline-none"
                  />
                  <div className="mt-1 text-right text-[10px] text-neutral-400">
                    {reviewText.length}/200
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={rating === 0}
                    className="rounded-xl bg-amber-500 px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-start justify-between border-b border-neutral-100 pb-4">
            <div className="flex gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-lg bg-neutral-100 flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=200&auto=format&fit=crop&q=60"
                  alt="Event"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-900">Jazz Evening at the Park</h4>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-[10px] text-neutral-400 ml-1">5.0</span>
                </div>
              </div>
            </div>
            <span className="text-[10px] text-neutral-400">15 Sep 2026</span>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            &ldquo;Acara sangat meriah dan tata suaranya luar biasa bagus. Semoga tahun depan diadakan lagi!&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}