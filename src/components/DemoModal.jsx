import { createContext, useContext, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  Mail,
  MessageSquareText,
  Phone,
  UserRound,
  X,
} from "lucide-react";

const DemoModalContext = createContext(null);

const DEMO_SUBMIT_URL = import.meta.env.VITE_DEMO_SUBMIT_URL?.trim();
const SUBMISSION_MESSAGE_SOURCE = "demo-modal-submit";
const SUBMISSION_TIMEOUT_MS = 12000;

const TIMELINE_OPTIONS = ["Today", "This week", "Next week"];

const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  phone: "",
  help: "",
  timeline: "",
};

function FieldShell({ icon: Icon, children }) {
  return (
    <div className="group flex items-start gap-3 rounded-[22px] border border-[var(--line)] bg-[rgba(255,255,255,0.82)] px-4 py-3 shadow-[0_10px_30px_rgba(47,37,26,0.06)] transition-colors focus-within:border-indigo-300 focus-within:bg-white">
      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--porcelain-50)] text-indigo-600">
        <Icon size={18} />
      </div>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

function DemoModal({ isOpen, onClose }) {
  const [formState, setFormState] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const firstInputRef = useRef(null);
  const pendingSubmissionRef = useRef(false);
  const submissionTimeoutRef = useRef(null);
  const iframeTarget = "demo-form-submit";


  function clearSubmissionTimeout() {
    if (submissionTimeoutRef.current === null) {
      return;
    }

    window.clearTimeout(submissionTimeoutRef.current);
    submissionTimeoutRef.current = null;
  }

  function resetModalState() {
    pendingSubmissionRef.current = false;
    clearSubmissionTimeout();
    setFormState(INITIAL_FORM_STATE);
    setIsSubmitting(false);
    setIsSuccess(false);
    setSubmitError("");
  }

  function handleModalClose() {
    resetModalState();
    onClose();
  }

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const timeoutId = window.setTimeout(() => {
      firstInputRef.current?.focus();
    }, 160);

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleModalClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
      window.clearTimeout(timeoutId);
    };
  }, [isOpen]);

  useEffect(() => () => clearSubmissionTimeout(), []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleSubmissionMessage = (event) => {
      const data = event.data;

      if (!data || data.source !== SUBMISSION_MESSAGE_SOURCE || !pendingSubmissionRef.current) {
        return;
      }

      pendingSubmissionRef.current = false;
      clearSubmissionTimeout();
      setIsSubmitting(false);

      if (data.status === "success") {
        setIsSuccess(true);
        return;
      }

      setSubmitError(data.message || "Submission failed. Please try again.");
    };

    window.addEventListener("message", handleSubmissionMessage);

    return () => {
      window.removeEventListener("message", handleSubmissionMessage);
    };
  }, [isOpen]);

  function updateField(name, value) {
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!DEMO_SUBMIT_URL) {
      setSubmitError("Add VITE_DEMO_SUBMIT_URL in .env.local to connect this form with Google Forms and Sheets.");
      return;
    }

    pendingSubmissionRef.current = true;
    clearSubmissionTimeout();
    setSubmitError("");

    HTMLFormElement.prototype.submit.call(event.currentTarget);

    setIsSubmitting(true);

    submissionTimeoutRef.current = window.setTimeout(() => {
      if (!pendingSubmissionRef.current) {
        return;
      }

      pendingSubmissionRef.current = false;
      setIsSubmitting(false);
      setSubmitError("The Google Forms bridge did not confirm the submission. Please try again.");
    }, SUBMISSION_TIMEOUT_MS);
  }

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="demo-modal-overlay"
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(27,22,15,0.62)] px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              handleModalClose();
            }
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl overflow-hidden rounded-[32px] border border-[var(--line)] bg-[rgba(255,252,246,0.98)] shadow-[0_36px_110px_rgba(20,16,12,0.32)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.1),transparent_25%)]" />
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                handleModalClose();
              }}
              className="absolute right-4 top-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/75 text-[var(--ink-700)] transition-colors hover:text-[var(--ink-900)]"
              aria-label="Close contact form"
            >
              <X size={18} />
            </button>

            <div className="relative z-10 grid md:grid-cols-[0.9fr_1.2fr]">
              <div className="relative hidden overflow-hidden bg-[linear-gradient(160deg,#2f251a_0%,#453420_55%,#5c4b36_100%)] px-6 py-7 text-white md:block">
                <div className="absolute inset-0 bg-grid opacity-20" />
                <div className="relative flex h-full flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-200/90">Get In Touch</p>
                    <h2 id="demo-modal-title" className="mt-4 text-3xl font-bold leading-tight">
                      Tell us a little about your inquiry.
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-white/72">
                      Share a few details and our team will get back to you shortly.
                    </p>
                  </div>

                  <div className="grid gap-3">
                    {["Understand how it fits your workflow", "Quick response", "No pressure, just clarity"].map((item) => (
                      <div key={item} className="rounded-[20px] border border-white/10 bg-white/10 px-4 py-3">
                        <p className="text-sm font-medium text-white/88">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-5 py-6 sm:px-6 sm:py-7">
                {isSuccess ? (
                  <div className="flex min-h-[520px] flex-col justify-center rounded-[28px] border border-emerald-200 bg-emerald-50/75 p-8 text-center shadow-[0_20px_50px_rgba(22,163,74,0.14)]">
                    <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" />
                    <p className="mt-5 text-3xl font-semibold tracking-tight text-[var(--ink-900)]">
                      Thanks, you're all set.
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--ink-700)] sm:text-base">
                      We’ve received your details and our team will be in touch soon.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setFormState(INITIAL_FORM_STATE);
                          setIsSuccess(false);
                        }}
                        className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-900)] transition-transform hover:scale-[1.02]"
                      >
                        Submit another response
                      </button>
                      <button
                        type="button"
                        onClick={handleModalClose}
                        className="inline-flex items-center justify-center rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <form action={DEMO_SUBMIT_URL} method="POST" target="demo-form-submit" onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-indigo-600">Book A Demo</p>
                      <h3 className="mt-2 text-2xl font-bold tracking-tight text-[var(--ink-900)] sm:text-3xl">
                        Let’s start the conversation.
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--ink-700)]">
                        Fill out this short form and we&apos;ll reach out with the next step.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FieldShell icon={UserRound}>
                        <label className="block">
                          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-500)]">Full Name</span>
                          <input
                            ref={firstInputRef}
                            type="text"
                            name="Name"
                            value={formState.name}
                            onChange={(event) => updateField("name", event.target.value)}
                            required
                            disabled={isSubmitting}
                            placeholder="Your full name"
                            className="mt-2 w-full border-none bg-transparent p-0 text-base text-[var(--ink-900)] outline-none placeholder:text-[var(--ink-500)]"
                          />
                        </label>
                      </FieldShell>

                      <FieldShell icon={Mail}>
                        <label className="block">
                          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-500)]">Work Email</span>
                          <input
                            type="email"
                            name="Email"
                            value={formState.email}
                            onChange={(event) => updateField("email", event.target.value)}
                            required
                            disabled={isSubmitting}
                            placeholder="you@company.com"
                            className="mt-2 w-full border-none bg-transparent p-0 text-base text-[var(--ink-900)] outline-none placeholder:text-[var(--ink-500)]"
                          />
                        </label>
                      </FieldShell>
                    </div>

                    <FieldShell icon={Phone}>
                      <label className="block w-full">
                        <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-500)]">Phone Number</span>
                        <input
                          type="tel"
                          name="PhoneNumber"
                          value={formState.phone}
                          onChange={(event) => updateField("phone", event.target.value)}
                          required
                          disabled={isSubmitting}
                          placeholder="+91 98765 43210"
                          className="mt-2 w-full border-none bg-transparent p-0 text-base text-[var(--ink-900)] outline-none placeholder:text-[var(--ink-500)]"
                        />
                      </label>
                    </FieldShell>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FieldShell icon={ArrowRight}>
                        <label className="block w-full">
                          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-500)]">How soon do you want to start?</span>
                          <select
                            name="StartTime"
                            value={formState.timeline}
                            onChange={(event) => updateField("timeline", event.target.value)}
                            disabled={isSubmitting}
                            className="mt-2 w-full border-none bg-transparent p-0 text-base text-[var(--ink-900)] outline-none"
                          >
                            <option value="">Select timeline</option>
                            {TIMELINE_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </label>
                      </FieldShell>
                    </div>

                    <div className="rounded-[24px] border border-[var(--line)] bg-[rgba(255,255,255,0.84)] p-4 shadow-[0_14px_40px_rgba(47,37,26,0.06)]">
                      <label className="block">
                        <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-500)]">What do you need help with?</span>
                        <textarea
                          name="Help"
                          value={formState.help}
                          onChange={(event) => updateField("help", event.target.value)}
                          required
                          disabled={isSubmitting}
                          rows={3}
                          placeholder="Tell us briefly what you need."
                          className="mt-3 w-full rounded-[18px] border border-[var(--line)] bg-white px-4 py-3 text-base text-[var(--ink-900)] outline-none transition-all placeholder:text-[var(--ink-500)] focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
                        />
                      </label>
                    </div>

                    {submitError ? (
                      <div className="rounded-[18px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {submitError}
                      </div>
                    ) : null}

                    <div className="rounded-[24px] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(248,245,239,0.95))] p-3 shadow-[0_16px_40px_rgba(47,37,26,0.08)]">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--ink-900)] px-6 py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.01] hover:bg-[var(--ink-900)]/90 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <>
                            <LoaderCircle size={16} className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Submit
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}

                <iframe title="form-bridge" name="demo-form-submit" className="hidden" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

export function DemoModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleTriggerClick = (event) => {
      const trigger =
        event.target instanceof Element
          ? event.target.closest(".book-demo-btn, [data-demo-trigger='true']")
          : null;

      if (!trigger) {
        return;
      }

      if (trigger.matches(":disabled, [aria-disabled='true']")) {
        return;
      }

      if (trigger.matches("a")) {
        event.preventDefault();
      }

      setIsOpen(true);
    };

    document.addEventListener("click", handleTriggerClick);

    return () => {
      document.removeEventListener("click", handleTriggerClick);
    };
  }, []);

  return (
    <DemoModalContext.Provider
      value={{
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
      }}
    >
      {children}
      <DemoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </DemoModalContext.Provider>
  );
}

export function useDemoModal() {
  const context = useContext(DemoModalContext);

  if (!context) {
    throw new Error("useDemoModal must be used within a DemoModalProvider.");
  }

  return context;
}
