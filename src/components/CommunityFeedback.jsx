import React, { useState } from 'react';
import { Bug, Star, Send, CheckCircle2, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';
import { submitBugReport, submitReview } from '../firebase';

export default function CommunityFeedback() {
  const [activeTab, setActiveTab] = useState('bug'); // 'bug' | 'review'

  // Bug report form state
  const [bugData, setBugData] = useState({
    platform: 'macos',
    title: '',
    description: '',
    email: '',
  });
  const [bugLoading, setBugLoading] = useState(false);
  const [bugSuccess, setBugSuccess] = useState(false);
  const [bugError, setBugError] = useState(null);

  // Review form state
  const [reviewData, setReviewData] = useState({
    name: '',
    rating: 5,
    comment: '',
    platform: 'macos',
  });
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState(null);

  const handleBugSubmit = async (e) => {
    e.preventDefault();
    if (!bugData.description.trim()) {
      setBugError('Please describe the issue you encountered.');
      return;
    }
    setBugLoading(true);
    setBugError(null);
    try {
      await submitBugReport(bugData);
      setBugSuccess(true);
      setBugData({ platform: 'macos', title: '', description: '', email: '' });
      setTimeout(() => setBugSuccess(false), 5000);
    } catch (err) {
      setBugError('Could not send report. Please check your network or try again.');
    } finally {
      setBugLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewData.comment.trim()) {
      setReviewError('Please write a brief comment or review.');
      return;
    }
    setReviewLoading(true);
    setReviewError(null);
    try {
      await submitReview(reviewData);
      setReviewSuccess(true);
      setReviewData({ name: '', rating: 5, comment: '', platform: 'macos' });
      setTimeout(() => setReviewSuccess(false), 5000);
    } catch (err) {
      setReviewError('Could not send review. Please check your network or try again.');
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <section id="feedback" className="py-24 border-t border-white/10 relative bg-black">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-transparent mb-4 text-[11px] font-mono uppercase tracking-widest text-neutral-400">
            Community & Support
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Help Shape Tadaao
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Report an issue you encountered or share your experience using Tadaao peer-to-peer transfer.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            type="button"
            id="tab-bug-report"
            onClick={() => setActiveTab('bug')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 border ${
              activeTab === 'bug'
                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Bug className="w-4 h-4" />
            Found a Bug?
          </button>

          <button
            type="button"
            id="tab-leave-review"
            onClick={() => setActiveTab('review')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 border ${
              activeTab === 'review'
                ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                : 'bg-transparent text-neutral-400 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            <Star className="w-4 h-4" />
            Leave a Review
          </button>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl border border-white/10 bg-neutral-950/70 backdrop-blur-sm p-6 sm:p-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]">
          {activeTab === 'bug' ? (
            /* BUG REPORT FORM */
            <form onSubmit={handleBugSubmit} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <Bug className="w-4 h-4 text-rose-400" />
                    Report an Issue
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Describe any crash, transfer timeout, or UI glitch so we can patch it rapidly.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-neutral-500">
                  AUTO-LOGS TO FIREBASE
                </span>
              </div>

              {bugSuccess && (
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono flex items-center gap-3 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>
                    Thank you! Your bug report has been directly logged into the developer registry.
                  </span>
                </div>
              )}

              {bugError && (
                <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-mono flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{bugError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Platform Selector */}
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-2 uppercase tracking-wider">
                    Platform / OS
                  </label>
                  <select
                    value={bugData.platform}
                    onChange={(e) => setBugData({ ...bugData, platform: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="macos">macOS (.dmg)</option>
                    <option value="windows">Windows (.zip)</option>
                    <option value="android">Android (.apk)</option>
                    <option value="cross-device">Cross-device transfer</option>
                    <option value="web">Web Landing Page</option>
                  </select>
                </div>

                {/* Bug Short Summary */}
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-2 uppercase tracking-wider">
                    Issue Summary
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Socket failed on Android 14"
                    value={bugData.title}
                    onChange={(e) => setBugData({ ...bugData, title: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Bug Description */}
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-2 uppercase tracking-wider">
                  What happened? / Steps to reproduce <span className="text-rose-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Explain what occurred, device models, or any error message displayed..."
                  value={bugData.description}
                  onChange={(e) => setBugData({ ...bugData, description: e.target.value })}
                  className="w-full bg-black border border-white/15 rounded-xl p-4 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Optional Contact Email */}
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-2 uppercase tracking-wider">
                  Your Email (Optional, for resolution updates)
                </label>
                <input
                  type="email"
                  placeholder="you@domain.com"
                  value={bugData.email}
                  onChange={(e) => setBugData({ ...bugData, email: e.target.value })}
                  className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="submit-bug-btn"
                disabled={bugLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all duration-200 disabled:opacity-50"
              >
                {bugLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting Report...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Bug Report
                  </>
                )}
              </button>
            </form>
          ) : (
            /* USER REVIEW FORM */
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    Share Your Review
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1">
                    Rate Tadaao and share your thoughts on transfer speed, privacy, and UX.
                  </p>
                </div>
                <span className="text-[11px] font-mono text-neutral-500">
                  REAL-TIME REVIEW LOG
                </span>
              </div>

              {reviewSuccess && (
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono flex items-center gap-3 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>
                    Thank you for your review! Your feedback helps us build the cleanest transfer app.
                  </span>
                </div>
              )}

              {reviewError && (
                <div className="p-3.5 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-mono flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{reviewError}</span>
                </div>
              )}

              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-2.5 uppercase tracking-wider">
                  Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewData({ ...reviewData, rating: star })}
                      className="p-1 text-neutral-600 hover:text-amber-400 focus:outline-none transition-colors"
                      aria-label={`${star} Star`}
                    >
                      <Star
                        className={`w-6 h-6 transition-all duration-150 ${
                          star <= reviewData.rating
                            ? 'text-amber-400 fill-amber-400 scale-110'
                            : 'text-neutral-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-xs font-mono text-neutral-400">
                    {reviewData.rating} of 5 Stars
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name / Alias */}
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-2 uppercase tracking-wider">
                    Your Name or Alias
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex M. or Anonymous"
                    value={reviewData.name}
                    onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                {/* Primary Platform Used */}
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-2 uppercase tracking-wider">
                    Platform Used
                  </label>
                  <select
                    value={reviewData.platform}
                    onChange={(e) => setReviewData({ ...reviewData, platform: e.target.value })}
                    className="w-full bg-black border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="macos">macOS</option>
                    <option value="windows">Windows</option>
                    <option value="android">Android</option>
                    <option value="multiple">Multiple Devices</option>
                  </select>
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-mono text-neutral-400 mb-2 uppercase tracking-wider">
                  Review & Feedback <span className="text-amber-400">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="How was the transfer speed? Did it solve your cross-platform workflow?"
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  className="w-full bg-black border border-white/15 rounded-xl p-4 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Submit Review Button */}
              <button
                type="submit"
                id="submit-review-btn"
                disabled={reviewLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-neutral-200 transition-all duration-200 disabled:opacity-50"
              >
                {reviewLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting Review...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Review
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
