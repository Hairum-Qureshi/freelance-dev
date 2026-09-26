
import { useEffect, useState, type ReactNode } from "react";
import { LuPanelRightClose } from "react-icons/lu";

type SlidingPanelProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onExited: () => void;
};

export default function SlidingPanel({
  children,
  isOpen,
  onClose,
  onExited,
}: SlidingPanelProps) {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const frame = requestAnimationFrame(() => setHasEntered(true));
      return () => cancelAnimationFrame(frame);
    }

    const timeout = window.setTimeout(onExited, 300);
    return () => window.clearTimeout(timeout);
  }, [isOpen, onExited]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close panel"
        onClick={onClose}
        className={`absolute inset-0 bg-slate-950/30 transition-opacity duration-300 motion-reduce:duration-0 ${isOpen && hasEntered ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        className={`absolute inset-y-0 right-0 w-full max-w-xl overflow-y-auto border-l border-slate-200 bg-white shadow-xl transition-transform duration-300 ease-in-out motion-reduce:transition-none ${isOpen && hasEntered ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-end border-b border-slate-200 px-5 py-3">
          <button
            type="button"
            aria-label="Close panel"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <LuPanelRightClose aria-hidden="true" />
          </button>
        </div>
        {children}
      </aside>
    </div>
  );
}
